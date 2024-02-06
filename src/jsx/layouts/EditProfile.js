import React, { useState, useEffect, useContext } from "react";
//import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../services/AxiosInstance";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const EditProfile = (props) => {
  const state = useSelector((state) => state);
  const { t } = useTranslation();

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);
  const [profileData, setprofileData] = useState({
    id: "",
    email: "",
    whatsapp: "",
  });
  const [email, setemail] = useState("");
  const [whatsapp, setwhatsapp] = useState("");

  const getdata = async () => {
    const { data } = await axiosInstance.get(
      "/api/profile/" + props.state.auth.walletaddress
    );
    setprofileData(data);
    setemail(data.email);
    setwhatsapp(data.whatsapp);
  };

  async function update() {
    try {
      if (email === "" || whatsapp === "") {
        toast.error("Please Enter Required Fileds", {
          style: { minWidth: 180 },
          position: "top-center",
        });
      } else {
        const mesg = await axiosInstance.put("/api/profile/" + profileData.id, {
          email: email,
          whatsapp: whatsapp,
        });
        if (mesg.data === "updated") {
          toast.success("updated successfully ", {
            style: { minWidth: 180 },
            position: "top-center",
          });
          getdata();
        } else {
          if (mesg.data.message === "User Not Found With The Given Id.") {
            const response = await axiosInstance.post("/api/profile/", {
              wallet_address: state.auth.auth.walletaddress,
              email: email,
              whatsapp: whatsapp,
            });

            if (response.status === 200) {
              toast.success("updated successfully ", {
                style: { minWidth: 180 },
                position: "top-center",
              });
              getdata();
            } else {
              toast.error("Something Went Wrong", {
                style: { minWidth: 180 },
                position: "top-center",
              });
            }
          }
        }
      }
    } catch (err) {
      toast.error("Network Error Try Again Later", {
        style: { minWidth: 180 },
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Toaster />
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <div className="clearfix">
            <div className="card card-bx profile-card author-profile m-b30">
              <div className="card-body">
                <div className="p-5">
                  <div className="author-profile">
                    <div className="author-info">
                      <h6 className="title">
                        {props.state.auth.walletaddress}
                      </h6>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="info-list">
                  <ul>
                    <li
                      style={{
                        padding: "18px 18px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}>
                      <Link>{t("whatsapp")}</Link>

                      <span>{profileData.whatsapp}</span>
                    </li>
                    <li
                      style={{
                        padding: "18px 18px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}>
                      <Link>{t("email")}</Link>
                      <span>{profileData.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8">
          <div className="card profile-card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">{t("account_setup")}</h6>
            </div>
            <form className="profile-form">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">{t("whatsapp_number")}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={whatsapp}
                      onChange={(e) => setwhatsapp(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">{t("email_address")}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div onClick={update} className="btn btn-primary">
                  {t("update")}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};
export default connect(mapStateToProps)(EditProfile);
