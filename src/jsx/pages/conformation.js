import React, { useContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import { Button, Dropdown, Form, Modal, Nav, Tab } from "react-bootstrap";
import { ethers } from "ethers";
import bitXSwap from "../../contractAbis/BitXGoldSwap.json";
import axiosInstance from "../../services/AxiosInstance";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { connectToMetaMask } from "../../store/actions/AuthActions";
const Conformation = (props) => {
  const [isreferred, setisreferred] = useState(false);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [referalAddress, setreferalAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [hasBonusCalled, setHasBonusCalled] = useState(false)
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const state = useSelector((state) => state);
   async function profileSave() {
    try {

   const mesg = await axiosInstance.post("/api/profile/", {
        wallet_address: props.tokenData.address.toLowerCase(),
        email: "demo@gmail.com",
        whatsapp: "123456",
      });
      if (mesg) {
        toast.success("Profile Added successfully ", {
          style: { minWidth: 180 },
          position: "top-center",
        });
      } else {
        toast.error("some thing went wrong", {
          style: { minWidth: 180 },
          position: "top-center",
        });
        setLoader(false);
      }
    } catch (err) {
      toast.error("Network Error Try Again Later", {
        style: { minWidth: 180 },
        position: "top-center",
      });
      setLoader(false);
    }
  }
  async function getRef() {
    const requestBody = {
      wallet_address: props.tokenData.address.toLowerCase(),
      refer_code: referalAddress.toLowerCase(),
    };

    const { data } = await axiosInstance
      .post("/api/refer/check", requestBody)
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
        setLoader(false);
      });
    if (!data) {
      toast.error(data.message, {
        position: "top-center",
      });
      setLoader(false);
      return;
    }

    if (!data?.status) {
      toast.error(data.message, {
        position: "top-center",
      });
      setLoader(false);
      // return;
    }

    const referalAddressarray = [
      data.data.refer1
        ? data.data.refer1
        : "0x0000000000000000000000000000000000000000",
      data.data.refer2
        ? data.data.refer2
        : "0x0000000000000000000000000000000000000000",
      data.data.refer3
        ? data.data.refer3
        : "0x0000000000000000000000000000000000000000",
    ];
    return referalAddressarray;
  }
  async function checkDB() {
    const requestBody = {
      wallet_address: referalAddress.toLowerCase(),
    };
    const { data } = await axiosInstance
      .post("/api/bonusrefer/check", requestBody)
      .catch((err) => {
        toast.error("not in chain", {
          position: "top-center",
        });
        return false;
      });
    if (data) {
      return data.status;
    }
  }
  async function saveRef() {
    const requestBody = {
      wallet_address: props.tokenData.address.toLowerCase(),
      refer_code: referalAddress.toLowerCase(),
    };


    const { data } = await axiosInstance
      .post("/api/refer/", requestBody)
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
        setLoader(false);
      });

      console.log("=====> Save Ref Data: ", data)

    if (!data.status) {
      toast.error(data.message, {
        position: "top-center",
      });
      setLoader(false);
      return;
    }

    const referalAddressarray = [
      data.data.refer1
        ? data.data.refer1
        : "0x0000000000000000000000000000000000000000",
      data.data.refer2
        ? data.data.refer2
        : "0x0000000000000000000000000000000000000000",
      data.data.refer3
        ? data.data.refer3
        : "0x0000000000000000000000000000000000000000",
    ];
    return referalAddressarray;
  }
  async function save() {
    // let address = "";
    // let signer = {};
    // if (state.auth.isLoggedInFromMobile === "mobile") {
    //   const RPC_URLS = {
    //     1: "https://bsc-dataseed1.binance.org/",
    //   };
    //   const provider = new WalletConnectProvider({
    //     rpc: {
    //       1: RPC_URLS[1],
    //     },
    //     qrcode: true,
    //   });
    //   const accounts = await provider.enable();
    //   const library = new Web3Provider(provider, "any");
    //   signer = library.getSigner();
    //   address = accounts[0];
    // } else {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   signer = provider.getSigner();
    //   const addresses = await provider.send("eth_requestAccounts", []);
    //   address = addresses[0];
    // }



    setLoader(false)

    // const referalAddressarray = await getRef();
    let getBonuValue = await getBonus()
    if (getBonuValue) {
      setLoader(false)
    }

    // try {
    //   const swap = new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer);
    //   //db array
    //   const referalAddressarray = await getRef();
    //   const value = await swap.Referral(state.auth.account);
    //   if (value === "0x0000000000000000000000000000000000000000") {
    //     const tx = await (
    //       await swap.addReferral(referalAddressarray, referalAddress)
    //     ).wait();
    //     if (tx.events) {
    //       toast.success("Referal Confirmed! Logged in Successfully", {
    //         duration: 4000,
    //       });
    //       getBonus();
    //     }
    //   } else {
    //     toast.error("Already Referred");
    //   }
    // } catch (error) {
    //   const swap = new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer);
    //   const value = await swap.Referral(props.state.tokenData.address);
    //   if (value !== "0x0000000000000000000000000000000000000000") {
    //     if (referalAddress === value) {
    //       toast.success("You have successfully used this referral code", {
    //         duration: 4000,
    //       });
    //       getBonus();
    //     } else {
    //       toast.error("Please use this referral " + value, {
    //         position: "top-center",
    //         style: { minWidth: 180 },
    //       });
    //       setLoader(false);
    //     }
    //   } else {
    //     console.log(error);
    //     toast.error("Transaction Failed", {
    //       position: "top-center",
    //       style: { minWidth: 180 },
    //     });
    //     setLoader(false);
    //   }
    // }
  }

  useEffect(() => {
    
    let ref_address = localStorage.getItem("ref_address");

    if(ref_address && !hasBonusCalled){
      setShow(false)
      setreferalAddress(ref_address.toLowerCase());
      getBonus()
    }


  }, [])
  

  const getReferalBonus = async () => {
    if (referalAddress === "") {
      toast.error("Please Enter Referal Code", {
        style: { minWidth: 180 },
        position: "top-center",
      });
    } else {

      await getBonus()
      // if (
      //   referalAddress.toLowerCase() === state.auth.defultReffer.toLowerCase()
      // ) {
      //   console.log("state.auth.defultReffer.toLowerCase():", state.auth.defultReffer.toLowerCase())
      //   save();
      // } else {
      //   console.log("state.auth.defultReffer.toLowerCase():", state.auth.defultReffer.toLowerCase())
      //   checkDB().then((res) => {
      //     if (res) {
      //       save();
      //     }
      //   });
      // }
    }
  };
  const getBonus = async () => {
    try {
      let refer_code = localStorage.getItem("ref_address");
      const requestBody = {
        wallet_address: props.state.tokenData.address.toLowerCase(),
        refer_code: refer_code ? refer_code.toLowerCase() : referalAddress.toLowerCase(),
      };
      const { data } = await axiosInstance
        .post("/api/bonusrefer/", requestBody)
        .catch((err) => {
          if (err.response.data.message === "Already Refered.") {
            setisreferred(true);
            profileSave();
            saveRef();
            dispatch(
              connectToMetaMask(
                navigate,
                props.tokenData.address,
                props.tokenData.token,
                props.state.adminwalletaddress
              )
            );
            handleClose();
          } else {
            toast.error(err.response.data.message, {
              position: "top-center",
            });
            setLoader(false);
          }
        });

      if (data === "Refere Added Successfully.") {
        setHasBonusCalled(true)
        toast.success("Refered Successfully");
        setisreferred(true);
        profileSave();
        saveRef();
        handleClose();
        setLoader(false);
        dispatch(
          connectToMetaMask(
            navigate,
            props.tokenData.address,
            props.tokenData.token,
            props.state.adminwalletaddress
          )
        );
      } else {
        toast.error(data.message);
        setLoader(false);
      }
      handleClose();
    } catch (error) {
      setLoader(false);
    }
  };
  return (
    <>
      <Toaster />

      {loader === true ? (
        <Loader />
      ) : (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Referal Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    Please Enter Referral Address. <br />
                    If you don't have any refferal address please use this :
                    {state.auth.defultReffer}
                  </Form.Label>
                  <input
                    className="form-control form-control-lg mb-3"
                    value={referalAddress}
                    type="text"
                    placeholder="0x00000000000000000000"
                    autoFocus
                    onChange={(e) => setreferalAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={getReferalBonus}>
                Get Referral Bonus
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    tokenData: state.auth.tokenData,
    state: state.auth,
  };
};
export default connect(mapStateToProps)(Conformation);
