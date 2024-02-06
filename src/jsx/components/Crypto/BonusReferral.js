import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { GetValuesForBonusPage } from "../../../services/AxiosInstance";
import { ThemeContext } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import InviteYourContacts from "./InviteYourContacts";
import BonusReferralCard from "./BonusReferralCard";
import BonusReferralTable from "./BonusReferralTable";
const BonusReferral = () => {
  const state = useSelector((state) => state);

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
    FetchData();
  }, []);

  const [loader, setLoader] = useState(false);
  const [referCode, setReferCode] = useState("0x0000000000000000000000");
  const [referralData, setReferralData] = useState([]);

  const FetchData = async () => {
    setLoader(true);
    try {
      const thisPageData = await GetValuesForBonusPage(
        state.auth.auth.walletaddress
      );
      console.log("Referral Data", thisPageData.referalData);
      setReferralData(thisPageData.referalData);
      setReferCode(thisPageData.referCode);
    } catch (err) {
      toast.error("Error Occured", {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
    setLoader(false);
  };

  function myFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText("localhost:3000/" + copyText.value);
    toast.success("Copied Referral Code: " + copyText.value, {
      position: "top-center",
      style: { minWidth: 180 },
    });
  }

  return (
    <>
      <Toaster />

      {loader === true ? (
        <Loader />
      ) : (
        <div
          className="row "
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}>
          <InviteYourContacts
            inviteDescription="invite_description"
            referCodeTitle="refer_code_title"
            copyToClipBoard={myFunction}
          />
          <BonusReferralCard
            walletaddress={state.auth.auth.walletaddress}
            referCode={referCode}
          />
          <BonusReferralTable referralData={referralData} />
        </div>
      )}
    </>
  );
};
export default BonusReferral;
