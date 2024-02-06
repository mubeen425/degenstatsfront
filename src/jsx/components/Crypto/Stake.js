import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Nav, Tab } from "react-bootstrap";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
import { useTranslation } from "react-i18next";

//import icon from src/icons/coin.png;

import bitX from "../../../contractAbis/BitX.json";
import bitXStake from "../../../contractAbis/BitXStaking.json";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import axiosInstance, {
  GetValuesForStakePage,
} from "../../../services/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";
import { Logout } from "../../../store/actions/AuthActions";
import moment from "moment";

const Stake = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const [stakeData, setStakeData] = useState([]);
  const [stakedData, setStakedData] = useState([]);

  const state = useSelector((state) => state);
  const [timeDifference, setTimeDifference] = useState(null);
  const [totalAmountStaked, setTotalAmountStaked] = useState(0);
  const [amountAlreadyStaked, setAmountAlreadyStaked] = useState(0);
  const [totalAmountClaimed, setTotalAmountClaimed] = useState(0);
  const [amountToStake, SetAmountToStake] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [staking, setStaking] = useState();

  const checkStake = async () => {
    const data1 = await axiosInstance.get(
      "/api/stake/" + state.auth.auth.walletaddress
    );
    var check = data1.data.bxg ? true : false;
    return check;
  };

  const FetchData = async () => {
    setLoader(true);
    try {
      setStaking(
        new ethers.Contract(bitXStake.address, bitXStake.abi, state.auth.signer)
      );
      const response = await GetValuesForStakePage(
        state.auth.auth.walletaddress
      );
      setStakeData(response.stakedData);
      setTotalAmountStaked(response.amountstaked);
      setTotalAmountClaimed(response.amountclaimed);
      setAmountAlreadyStaked(response.amountAlreadyStaked);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
    setLoader(false);
  };
  useEffect(() => {
    FetchData();
  }, []);

  //handleclaim

  const handleStake = async () => {
    const logout = () => {
      dispatch(Logout(navigate));
    };

    let address = "";
    let signer = {};
    if (state.auth.isLoggedInFromMobile === "mobile") {
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
      const library = new Web3Provider(provider, "any");
      signer = library.getSigner();
      address = accounts[0];
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const addresses = await provider.send("eth_requestAccounts", []);
      address = addresses[0];
    }
    const staking = new ethers.Contract(
      bitXStake.address,
      bitXStake.abi,
      signer
    );
    const bxg = new ethers.Contract(bitX.address, bitX.abi, signer);
    if (address !== state.auth.auth.walletaddress) {
      toast.error("Wrong account is selected, Logging Out", {
        position: "top-center",
        style: { minWidth: 180 },
      });
      setTimeout(logout, 1000);
      return;
    }

    setLoader(true);
    if (amountToStake <= 0) {
      toast.error("Please enter amount to stake", {
        position: "top-center",
        style: { minWidth: 180 },
      });
    } else {
      //check if the user has staked once or not
      //if staked once then call stake function else call stakeAndClaim function

      // var check = await checkStake();
      // if (!check) {
      //   if (amountToStake < 10) {
      //     setLoader(false);
      //     toast.error("Minimum amount to stake is 10 BXG", {
      //       position: "top-center",
      //       style: { minWidth: 180 },
      //     });
      //     return;
      //   }
      // }
      try {
        const amount = ethers.utils.parseEther(amountToStake);
        const amountApprove = ethers.utils.parseEther(
          "100000000000000000000000000000000000000000"
        );
        const value = await bxg.allowance(
          state.auth.auth.walletaddress,
          staking.address
        );
        if (value < amount) {
          await (await bxg.approve(staking.address, amountApprove)).wait();
        }
        const tx = await (await staking.stake(amount)).wait();
        const stakedId = tx.events[2].args.stakedId;
        if (tx.events) {
          toast.success(tx.blockHash, {
            position: "top-center",
            style: { minWidth: 180 },
          });
          const requestBody = {
            wallet_address: state.auth.auth.walletaddress,
            bxg: amountToStake,
            blockhash: tx.blockHash,
            stake_id: stakedId.toString(),
          };

          const { data } = await axiosInstance
            .post("/api/stake/", requestBody)
            .catch((err) => {
              toast.error(err.response.data, {
                position: "top-center",
                style: { minWidth: 180 },
              });
            });
          if (data.stake_time) {
            setTotalAmountStaked(data.bxg);
            toast.success("Staked Successfully", {
              position: "top-center",
              style: { minWidth: 180 },
            });
            FetchData();
          } else {
            toast.error(data.message, {
              position: "top-center",
              style: { minWidth: 180 },
            });
          }
        } else {
          //console.log("Transaction Failed");
          toast.error("Transaction Failed", {
            position: "top-center",
            style: { minWidth: 180 },
          });
        }
      } catch (error) {
        //console.log(error, "Transaction Failed");
        toast.error("Transaction Failed", {
          position: "top-center",
          style: { minWidth: 180 },
        });
      }
    }
    setLoader(false);
  };

  const handleClaim = async (id, bxgvalue1, stakingID) => {
    console.log(id, bxgvalue1, stakingID);
    setLoader(true);
    const logout = () => {
      dispatch(Logout(navigate));
    };
    const addresses = await state.auth.provider.send("eth_requestAccounts", []);
    const address = addresses[0];
    console.log(state.auth.auth.walletaddress, address);
    if (address !== state.auth.auth.walletaddress) {
      toast.error("Wrong account is selected, Logging Out", {
        position: "top-center",
        style: { minWidth: 180 },
      });
      setTimeout(logout, 1000);
      return;
    }

    if (bxgvalue1 <= 0) {
      toast.error("Amount less then Zero", {
        position: "top-center",
        style: { minWidth: 180 },
      });
    } else {
      try {
        // const amount = await ethers.utils.parseEther(bxgvalue1.toString());
        // const stakingId = await ethers.utils.parseEther(stakingID.toString());
        const tx = await (await staking.claim(stakingID)).wait(); //  replace this value
        if (tx.events) {
          toast.success(tx.blockHash, {
            position: "top-center",
            style: { minWidth: 180 },
          });
          const requestBody = {
            wallet_address: state.auth.auth.walletaddress.toLowerCase(),
            bxg: bxgvalue1,
            stake_id: stakingID.toString(),
            blockhash: tx.blockHash,
            type: "claim",
          };

          console.log(requestBody, "requestBody");
          const { data } = await axiosInstance
            .put("/api/stake/" + id, requestBody)
            .catch((err) => {
              toast.error(err.response.data, {
                position: "top-center",
                style: { minWidth: 180 },
              });
            });

          console.log(data, "response");
          if (data.stake_time) {
            //setstartTime(new Date());
            setTotalAmountStaked(data.bxg);
            toast.success("Claimed Successfully", {
              position: "top-center",
              style: { minWidth: 180 },
            });
            FetchData();
          }
        } else {
          toast.error("Transaction Failed", {
            position: "top-center",
            style: { minWidth: 180 },
          });
        }
      } catch (error) {
        toast.error(error.reason, {
          position: "top-center",
          style: { minWidth: 180 },
        });
      }
    }
    setLoader(false);
  };

  const timer = (StartTime) => {
    const startTimeObject = new Date(StartTime);

    let string1 = "";
    const currentTime = new Date();
    const difference = currentTime - startTimeObject;
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    string1 = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s `;

    return string1;
  };

  const getType = (StartTime) => {
    const startTimeObject = new Date(StartTime);

    let string1 = "";
    const currentTime = new Date();
    const difference = currentTime - startTimeObject;
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    if (months >= 0 || days >= 0) {
      string1 = "Claim";
    } else {
      string1 = "UnStake";
    }
    return string1;
  };

  const getDate = (date) => {
    //get formatted date by auto detecting timezone
    const formattedDate = moment(date).format("DD MMM YYYY hh:mm A");
    return formattedDate;
  };

  const interval = setInterval(() => {
    setStakedData(stakeData);
  }, 1000);

  return (
    <>
      <Toaster />

      {loader === true ? (
        <Loader />
      ) : (
        <>
          <div
            className="row "
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}>
            <div
              className="col-sm-12 col-12 col-xl-7"
              style={{ height: "100%" }}>
              <div className="col-xl-12 col-sm-12">
                <div className="card h-auto">
                  <div className="card-body px-0 pt-1">
                    <Tab.Container defaultActiveKey="Navbuy">
                      <div className="">
                        <div className="buy-sell">
                          <Nav
                            className="nav nav-tabs"
                            eventKey="nav-tab2"
                            role="tablist">
                            <Nav.Link
                              as="button"
                              className="nav-link"
                              eventKey="Navbuy"
                              type="button">
                              {t("stake_header")}
                            </Nav.Link>
                            <Nav.Link
                              as="button"
                              className="nav-link"
                              eventKey="Navsell"
                              type="button">
                              {timeDifference?.months > 0
                                ? t("claim_header")
                                : t("claim_header")}
                            </Nav.Link>
                          </Nav>
                        </div>
                        <Tab.Content>
                          <Tab.Pane eventKey="Navbuy">
                            <Tab.Container defaultActiveKey="Navbuymarket">
                              <Tab.Content id="nav-tabContent1">
                                <Tab.Pane eventKey="Navbuymarket"></Tab.Pane>
                                <Tab.Pane eventKey="Navbuylimit"></Tab.Pane>
                              </Tab.Content>
                              <div className="sell-element">
                                <div className="col-xl-12">
                                  <form className="flex-direction-row justify-content-center">
                                    <div className="sell-blance">
                                      <br></br>
                                      <label className="form-label text-primary">
                                        Amount
                                      </label>

                                      <div className="form-label blance">
                                        <span>
                                          {t("amount_already_staked")}:
                                        </span>
                                        <p>{amountAlreadyStaked} BXG</p>
                                      </div>
                                      <br></br>
                                      <div className="input-group">
                                        <input
                                          value={amountToStake}
                                          onChange={(e) => {
                                            SetAmountToStake(e.target.value);
                                          }}
                                          type="text"
                                          className="form-control"
                                          placeholder="0.00"
                                        />
                                        <span className="input-group-text">
                                          MEME
                                        </span>
                                      </div>
                                    </div>
                                    <br></br>
                                  </form>
                                </div>

                                <div className="text-center">
                                  <Button
                                    onClick={() => {
                                      handleStake();
                                    }}
                                    //to={"/exchange"}
                                    className="btn btn-success w-75"
                                    // disabled={amountToStake < 20}
                                  >
                                    {t("stake_header")}
                                  </Button>
                                </div>
                              </div>
                            </Tab.Container>
                          </Tab.Pane>
                          <Tab.Pane eventKey="Navsell">
                            <Tab.Container defaultActiveKey="Navsellmarket">
                              <Tab.Content id="nav-tabContent2">
                                <Tab.Pane id="Navsellmarket"></Tab.Pane>
                                <Tab.Pane id="Navselllimit"></Tab.Pane>
                              </Tab.Content>
                              <div className="card">
                                <div className="card-header border-0 pb-0">
                                  <h4 className="heading mb-0">
                                    {" "}
                                    {t("claim_header")}
                                  </h4>
                                </div>
                                <div className="text-center card-body pt-2 pb-0 table-responsive">
                                  <table className="table shadow-hover orderbookTable">
                                    <thead>
                                      <tr>
                                        <th>ID</th>
                                        <th>Value(MEME)</th>
                                        <th>Staked Date</th>
                                        <th>Timer</th>
                                        <th>Claim</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {stakeData.map((data, index) => (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <span
                                              className={`${
                                                getType(data.stake_time) ===
                                                "Claim"
                                                  ? "text-success"
                                                  : "text-danger"
                                              }`}>
                                              {data.bxg}MEME
                                            </span>
                                          </td>
                                          <td>{getDate(data.stake_time)}</td>
                                          <td>{timer(data.stake_time)}</td>

                                          <td>
                                            {getType(data.stake_time) ===
                                              "Claim" && (
                                              <Link
                                                disabled
                                                onClick={() => {
                                                  getType(data.stake_time) ===
                                                  "Claim"
                                                    ? handleClaim(
                                                        data.id,
                                                        data.bxg,
                                                        data.stake_id
                                                      )
                                                    : handleClaim(
                                                        data.id,
                                                        data.bxg,
                                                        data.stake_id
                                                      );
                                                }}
                                                className="btn btn-warning mr-0 ">
                                                {getType(data.stake_time)}
                                              </Link>
                                            )}
                                            {getType(data.stake_time) ===
                                              "UnStake" && (
                                              <Link
                                                disabled
                                                style={{
                                                  background: "#dddddd",
                                                }}
                                                className="btn btn-warning mr-0 ">
                                                Claim
                                              </Link>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Tab.Container>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-12 col-xl-4">
              <div className="col-xl-12" style={{ height: "100%" }}>
                <div className="card">
                  <div className="card-wiget-info"></div>
                  <div className="card-body pb-2">
                    <div className="card-wiget-info">
                      <br></br>
                      <h4 className="count-num">{totalAmountStaked} MEME</h4>
                      <p>{t("total_amount_staked")}</p>
                      <div></div>
                    </div>
                    <br></br>
                    <hr></hr>

                    <div className="card-wiget-info">
                      <br></br>
                      <h4 className="count-num">{totalAmountClaimed} MEME</h4>
                      <p>{t("total_amount_claimed")}</p>
                      <div></div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Stake;
