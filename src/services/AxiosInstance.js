import axios from "axios";
import { store } from "../store/store";
import { ethers } from "ethers";
import bitxGoldSwap from "../../src/contractAbis/BitXGoldSwap.json";
import tokenSale from "../../src/contractAbis/TokenSale.json";
import Web3 from 'web3'

const axiosInstance = axios.create({
  baseURL: `https://cryptojugend-bd0c060f0a83.herokuapp.com`,
  //baseURL: `https://ill-veil-colt.cyclic.app`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();

  const token = state.auth.auth.idToken;
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});
export async function postBuyHistory (data){
  const { data: response } = await axiosInstance.post("/api/bxg", data);
  return response;
}
export async function getDetailsforDashboard(wallet_address) {
  const { data } = await axiosInstance.get("/api/bxg/" + wallet_address);
  const data1 = await axiosInstance.get("/api/stake/" + wallet_address);
  const data6 = await axiosInstance.get(
    "/api/stakerefreward/" + wallet_address
  );
  // const data13 = await axiosInstance.get("/api/tasks/addtask" + wallet_address);
  const data7 = await axiosInstance.get(
    "/api/bonusrefreward/" + wallet_address
  );
  const data8 = await axiosInstance.get(
    "/api/rewardbxg/" + wallet_address )

  var referalbonus = 0;
  var stakingreferbonus = 0;
  data6.data
    .filter(
      (item) =>
        item.refer_code?.toLowerCase() === wallet_address &&
        item.type === "claimed"
    )
    .map((item) => {
      stakingreferbonus = stakingreferbonus + item.reward;
    });

  data7.data
    .filter((item) => item.refer_code?.toLowerCase() === wallet_address)
    .map((item) => {
      referalbonus = referalbonus + item.reward;
    });

  return {
    availableBXG: data.bxg,
    bxgStaked: data1.data.bxg,
    totalEarning: data1.data.total_claim_reward,
    referalBonus: referalbonus,
    stakingReferralBonus: stakingreferbonus,
    rewardBonus: data8.data.reward,
  };
}
export const addReward =async (data) =>{
  const { data: response } = await axiosInstance.post("/api/rewardbxg", {wallet_address:data , bxg:20});
  return response;

}
export const getChangedValue = async () => {
  // const provider = new ethers.getDefaultProvider(
  //   "https://bsc-dataseed1.binance.org/"
  // );

  const provider = new ethers.getDefaultProvider(
    "https://bsc-dataseed4.binance.org/"
  );

  const bitXSwap = new ethers.Contract(
    bitxGoldSwap.address,
    bitxGoldSwap.abi,
    provider
  );

  const ratio = await bitXSwap.getRatio();

  return ethers.utils.formatUnits(ratio);
};

/// In your API module (api.js or apiRequests.js):

export async function createTask(taskData) {
  try {
    const response = await axiosInstance.post("/api/tasks", taskData);

    // Handle the response here
    console.log(response.data);

    return response.data; // You can return the data to the caller if needed
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw error; // You can rethrow the error or handle it as needed
  }
}


export const getPolygonValue = async (poolAdresses) => {

  const web3 = new Web3("https://polygon-rpc.com")

  const contract = new web3.eth.Contract(tokenSale.abi, tokenSale.address)

  let resp = await contract.methods.getBuyPrice(poolAdresses).call()
  resp = web3.utils.fromWei(resp[0])
  console.log(resp)

  return resp
}

export const GetValuesForStakePage = async (walletAddress) => {
  //const {data} = await axiosInstance.get('/api/bxg/'+requestBody.wallet_address);
  const data1 = await axiosInstance.get("/api/stake/" + walletAddress);
  const data = await axiosInstance.get("/api/stakehistory/" + walletAddress);

  let stakedData = data?.data
    ?.filter((item) => item.type === "Stake")
    .reverse();

  //filter data.data and add all the bxg values and set it to totalamountclaimed
  var amountclaimed = filterArrayAndReturnTotal(data.data, "claim");
  var amountstaked = filterArrayAndReturnTotal(data.data, "Stake");
  amountstaked = amountstaked + filterArrayAndReturnTotal(data.data, "Staked");

  return {
    stakedData,
    amountclaimed,
    amountstaked,
    amountAlreadyStaked: data1.data.bxg,
  };
};

//filter array by type and return amount
export const filterArrayAndReturnTotal = (array, type) => {
  var amount = 0;
  array.filter((item) => {
    if (item.type === type) {
      amount = amount + item.bxg;
    }
  });
  return amount;
};

export const GetValuesForReferPage = async (walletAddress) => {
  var level1count = 0;
  var level2count = 0;
  var level3count = 0;
  const response = await axiosInstance
    .get("/api/refer/getall")
    .then((response) => {
      //console.log(response.data);
      const { level1, level2, level3 } = CountLevels(
        response.data,
        walletAddress
      );
      level1count = level1;
      level2count = level2;
      level3count = level3;
    });

  const { data } = await axiosInstance.get(
    "/api/stakerefreward/" + walletAddress
  );

  return {
    level1count,
    level2count,
    level3count,
    referalData: data.filter((item) => item.type === "claimed"),
  };
};

export const CountLevels = (data, walletAddress) => {
  var level1 = 0;
  var level2 = 0;
  var level3 = 0;

  data.map((item) => {
    if (item?.refer1?.toLowerCase() === walletAddress) {
      level1 = level1 + 1;
    }
    if (item?.refer2?.toLowerCase() === walletAddress) {
      level2 = level2 + 1;
    }
    if (item?.refer3?.toLowerCase() === walletAddress) {
      level3 = level3 + 1;
    }
  });

  return {
    level1,
    level2,
    level3,
  };
};

export const GetValuesForBonusPage = async (walletAddress) => {
  var referCode = "0x0000000000000000000000";
  const { data } = await axiosInstance.get(
    "/api/bonusrefreward/" + walletAddress
  );
  const isreferedData = await axiosInstance.get(
    "/api/bonusrefer/" + walletAddress
  ); 
  if (isreferedData.data.isRefered) {
    referCode = isreferedData.data.refer_code;
  }
  return {
    referCode,
    referalData: data,
  };
};



export default axiosInstance;
