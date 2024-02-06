import React, { useEffect, useState, useContext } from "react";
import { connect} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import { ThemeContext } from "../../context/ThemeContext";
import * as web3 from '@solana/web3.js';
import { useDispatch, useSelector } from "react-redux";
import {
  connectToMetaMask,
  saveD,
  saveSigner,
} from "../../store/actions/AuthActions";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import logo from "../../images/logo/logo-full.png";
import { toast } from "react-toastify";
import axios from "axios";

function Login(props) {
  const walletsId = localStorage.getItem('token');
  const [fee , setFee] = useState('') 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeBackground } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loader, setLoader] = useState(false);
  const [waletdata, setdata] = useState({
    address: "", // Stores address
    Balance: null, // Stores balance
  });
  const [token, setToken] = useState("");


  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };

  const handleLogin = () => {
    checkConnection();
  };


  const sendTransaction = async () => {
    try {
      const provider = await getProvider();
      console.log(provider);
      if (!provider) throw new Error("Wallet not found");
      console.log(provider.publicKey);
      const connection = new Connection("https://api.devnet.solana.com");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: new PublicKey("9y4Z4C5B3EEEUsGfVoxKaiDom7SSnfHgswgsh3KiydDw"), // Replace with the receiver's wallet address
          lamports: 0.0001 * LAMPORTS_PER_SOL,
        })
      );
        console.log('ok');
      let { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      let signed = await provider.signTransaction(transaction);
      let signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      // Redirect on success
      const userWithToken = await axiosInstance.get(`/api/profile/${fee.wallet_address}`);
      console.error(userWithToken.data.id);
      const updatedUser = await axiosInstance.put(`/api/profile/${userWithToken.data.id}`,{fee:'0.1'});
      updatedUser.data == "updated" && navigate('/dashboard');
    } catch (error) {

      alert('Payment failed, please try again.'); 

    }
  }; 

  const checkConnection = async () => {
    console.log("here");
    try {
      if (!window.solana || !window.solana.isPhantom) {
        console.log("Phantom wallet not found");
        return;
      }
  
      const response = await window.solana.connect();
      const address = response.publicKey.toString();
      console.log(address);
  
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
      const balanceInLamports = await connection.getBalance(response.publicKey);
      const balance = balanceInLamports / web3.LAMPORTS_PER_SOL;
      console.log("Balance in SOL:", balance);
      setdata({...waletdata,address:address,Balance:balance})
      
  
      const message = new TextEncoder().encode(`Welcome to MEMEVERSE ${Date.now().toString()}`);
      const signedMessage = await window.solana.signMessage(message, "utf8");
  
      if (signedMessage) {
        const dt = {
          hash: signedMessage.signature.toString('hex'),
          wallet_address: address.toLowerCase(),
        };
        setFee(dt)
        const { data } = await axiosInstance.post("/user/login/", dt);
        
        if (data.status) {
        console.log(dt);

        if (walletsId) {
          const responseWithToken = await axiosInstance.get(`/api/profile/${dt.wallet_address}`);
          
          responseWithToken.data.fee == null ?
           setShowModal(true) 
           : navigate('/dashboard')
        }
        else{
          const mesg = await axios.post("https://cryptojugend-bd0c060f0a83.herokuapp.com/api/profile/", {
        wallet_address: dt.wallet_address,
        email: "demo@gmail.com",
        whatsapp: "123456",
      });
      console.log('here is a code ',mesg);
      localStorage.setItem('token', dt.wallet_address);
      
      setIsConnected('Connected')
      if (mesg) {
        toast.success("Profile Added successfully ", {
          style: { minWidth: 180 },
          position: "top-center",
        });
        setShowModal(true)
      } else {
        toast.error("some thing went wrong", {
          style: { minWidth: 180 },
          position: "top-center",
        });
        setLoader(false);
      }
        } 
      
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.message, {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
  };

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });

  }, []);

  return (
    <div className="page-wrapper">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="login-form style-1 justify-content-center" style={{ padding: '20px' }}>
          <div className="card flex justify-content center" style={{ padding: '40px' }}>
            <div className="card-body">
              <div className="logo-header text-center">
                {/* <Link to={"#"} className="logo">
                  <img src={logo} alt="" className="width-230 mCS_img_loaded" />
                </Link> */}
                <h1>Welcome to Degenstats</h1>
              </div>
              <div className="text-center bottom">
              <Button
        className="btn btn-primary button-md btn-block"
        onClick={handleLogin}
        disabled={isConnected}
      >
        {isConnected ? "Connected" : "Login with Phantom Wallet"}
      </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are Logged In. Please pay 0.1 SOL to access the dashboard.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={sendTransaction}>
            Pay 0.1 SOL
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
