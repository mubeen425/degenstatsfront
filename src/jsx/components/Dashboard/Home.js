import React, { useContext, useEffect, useState } from "react";
import * as web3 from '@solana/web3.js'; // Ensure web3 is imported
import { Link } from "react-router-dom";
import "swiper/css";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import coin from "./../../../images/coin.png";
import Loader from "../Loader/Loader";
import SwiperSlider from "../Swipers/SwiperSlider";

const Home = () => {
  const [bxgavailable, setbxgavailable] = useState(null);
  const [bxgstacked, setbxgstacked] = useState(null);
  const [totalEarning, settotalEarning] = useState(null);
  const [referralBonus, setreferralBonus] = useState(null);
  const [stakingreferralBonus, setStakingReferralBonus] = useState(null);
  const [rewardBonus, setRewardBonus] = useState(null);
  const [loader, setLoader] = useState(true); // Initially true to show loader while data is fetched

  const { changeBackground } = useContext(ThemeContext);

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });

    const fetchWalletDetails = async () => {
      try {
        const response = await window.solana.connect(); // Connect to Solana wallet
        const address = response.publicKey.toString();
        console.log("Wallet Address:", address);

        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
        const balanceInLamports = await connection.getBalance(response.publicKey);
        const balance = balanceInLamports / web3.LAMPORTS_PER_SOL;
        console.log("Balance in SOL:", balance);

        // Update state with fetched balance
        setbxgavailable(balance);
      } catch (error) {
        console.error('Error fetching wallet details:', error);
        // Optionally, handle errors or set default state values here
      } finally {
        setLoader(false); // Hide loader once data fetching is complete or fails
      }
    };

    fetchWalletDetails();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <SwiperSlider
              bxgavailable={bxgavailable}
              bxgstacked={bxgstacked}
              totalEarning={totalEarning}
              // Pass other props as needed
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
