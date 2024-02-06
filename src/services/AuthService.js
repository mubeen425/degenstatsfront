import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "axios";
import { ethers } from "ethers/lib";
import swal from "sweetalert";
import {
  loginConfirmedAction,
  Logout,
  saveSigner,
} from "../store/actions/AuthActions";

export function signUp(email, password) {
  //axios call
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function savedetails(isLoggedInFromMobile) {
  localStorage.setItem("isloggedinfrommobile", isLoggedInFromMobile);
  //   console.log("usercredentials", );
}

export function runLogoutTimer(dispatch, timer, navigate) {
  setTimeout(() => {
    //dispatch(Logout(history));
    dispatch(Logout(navigate));
  }, timer);
}

export async function GetProviderAndSignerForLaptop() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addresses = await provider.send("eth_requestAccounts", []);
  const address = addresses[0];
  return { signer, address, provider };
}

export async function GetProviderAndSignerForMobile() {
  try {
    const RPC_URLS = {
      1: "https://bsc-dataseed1.binance.org/",
    };
    const provider = new WalletConnectProvider({
      rpc: {
        1: RPC_URLS[1],
      },
      qrcode: true,
    });
    const accounts = await provider.enable();
    const accountAddres = accounts[0];

    const library = new Web3Provider(provider, "any");
    const signerAddress = library.getSigner();
    return { signerAddress, accountAddres, provider };
  } catch (error) {
    console.log("error", error);
  }
}

export async function checkAutoLogin(dispatch, navigate) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  const usercredentialsString = localStorage.getItem("isloggedinfrommobile");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(Logout(navigate));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  //console.log("signer in check autologin", usercredentialsString);
  var obj = {};
  if (usercredentialsString === "mobile") {
    obj = await GetProviderAndSignerForMobile();
  } else if (usercredentialsString === "laptop") {
    obj = await GetProviderAndSignerForLaptop();
  }
  //console.log("obj", obj);

  let expireDate = new Date(tokenDetails.expiresIn);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(Logout(navigate));
    return;
  }

  dispatch(
    loginConfirmedAction(
      tokenDetails.walletaddress,
      tokenDetails.token,
      tokenDetails.isAdmin
    )
  );
  dispatch(
    saveSigner(obj.signer, obj.account, obj.provider, usercredentialsString)
  );

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, navigate);
}
