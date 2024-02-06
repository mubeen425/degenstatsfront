import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WalletConnectModal from "../components/Crypto/WalletConnectModal";
import {
  connectToMetaMask,
  saveD,
  saveSigner,
} from "../../store/actions/AuthActions";
import logo from "../../images/logo/logo-full.png";
import bg6 from "../../images/background/bg6.jpg";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axiosInstance from "../../services/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
function Login(props) {
  const [showModal, setShowModal] = useState(false);

  function handleConnectClick() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [data, setdata] = useState({
    address: "", // Stores address
    Balance: null, // Stores balance
  });

  const [token, setToken] = useState("");
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const handleSubmit = () => {
    handleWalletConnect();
  };

  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  async function handleWalletConnect() {
    //console.log("handleWalletConnect");
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

      //console.log("accountAddres", accountAddres);
      const library = new Web3Provider(provider, "any");
      const signerAddress = library.getSigner();
      //console.log("signerAddress", signerAddress);
      const { chainId } = await library.getNetwork();
      const balance = await library.getBalance(accountAddres);
      //console.log("balance", balance);
      setAccount(accountAddres);
      setSigner(signerAddress);

      if (chainId === 56) {
        setdata({
          address: accountAddres,
          Balance: balance,
        });
        const signedMessage = await signerAddress.signMessage(
          `Welcome to BITXGOLD  ${Date.now().toString()}`
        );

        //console.log(signedMessage, "signedMessage");
        if (signedMessage) {
          const dt = {
            hash: signedMessage,
            wallet_address: accountAddres,
          };

          const { data } = await axiosInstance.post("/user/login/", dt);

          if (data.status) {
            dispatch(
              saveSigner(signerAddress, accountAddres, provider, "mobile")
            );
            console.log("data", data);
            setToken(data.access);
          }
        }
      }
    } catch (errpr) {
      console.log(errpr);
    }
  }

  const login = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Request account access if needed
      const { chainId } = await provider.getNetwork();
      const addresses = await provider.send("eth_requestAccounts", []);
      const address = addresses[0];
      const balance = await provider.getBalance(address);
      if (chainId !== 56) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(56).toString(16)}` }],
        });
      }
      if (chainId === 56) {
        setdata({
          address: address,
          Balance: balance,
        });
        const signedMessage = await signer.signMessage(
          `Welcome to BITXGOLD  ${Date.now().toString()}`
        );

        //console.log(signedMessage, "signedMessage");
        if (signedMessage) {
          const dt = {
            hash: signedMessage,
            wallet_address: address,
          };

          const { data } = await axiosInstance.post("/user/login/", dt);

          if (data.status) {
            dispatch(saveSigner(signer, address, provider, "laptop"));

            setToken(data.access);
          }
        }
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
  };

  //useeffect for data to redirect it to dashboard
  useEffect(() => {
    getToken();
  }, [token]);
  async function getToken() {
    if (token !== "") {
      // get refel value
      const data3 = await axiosInstance.get("/api/bonusrefer/" + data.address);
      if (data3.data.isRefered === false) {
        dispatch(saveD(data.address, token));
        navigate("/conformation", { data });
      } else {
        dispatch(
          connectToMetaMask(
            navigate,
            data.address,
            token,
            state.auth.adminwalletaddress
          )
        );
      }
    }
  }
  return (
    <div className="page-wraper">
      <Toaster />
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix overflow-hidden "
          style={{
            background: "#fff url(" + bg6 + ")",
            // cover no-repeat center center fixed",
            backgroundSize: "cover",

            //stretch to fit the page
            //take the height equal to the height of the viewport
            minHeight: "100vh",

            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="row gx-0">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white ">
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                style={{ maxHeight: "653px" }}>
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    dir: "ltr",
                  }}>
                  <div className="login-form style-2">
                    <div className="card-body">
                      <div className="logo-header">
                        <Link to={"#"} className="logo">
                          <img
                            src={logo}
                            alt=""
                            className="width-230 mCS_img_loaded"
                          />
                        </Link>
                      </div>
                      <div className="nav nav-tabs border-bottom-0">
                        <div className="tab-content w-100" id="nav-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="nav-personal">
                            {props.errorMessage && (
                              <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                                {props.errorMessage}
                              </div>
                            )}
                            {props.successMessage && (
                              <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                                {props.successMessage}
                              </div>
                            )}

                            <div className="text-center bottom">
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <Button
                                className="btn btn-primary button-md btn-block"
                                onClick={handleConnectClick}>
                                Login
                              </Button>
                              <WalletConnectModal
                                show={showModal}
                                onHide={handleModalClose}
                                handlelogin={login}
                                handlewalletconnect={handleWalletConnect}
                              />

                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);