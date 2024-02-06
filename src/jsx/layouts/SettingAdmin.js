import React, { useState, useEffect, useContext } from 'react';
//import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { connect, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from '../../services/AxiosInstance';
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from 'react-i18next';

const SettingAdmin = (props) => {
    const { t } = useTranslation();
    const { changeBackground } = useContext(ThemeContext);
    useEffect(() => {
        changeBackground({ value: "dark", label: "Dark" });
    }, []);
    const [withdrawn, setwithdrawn] = useState("2");
    const [show, setshow] = useState(true);
    // const getdata = async () => {
    //     const { data } = await axiosInstance.get('/api/profile/' + props.state.auth.walletaddress);
    // }

    // async function update() {
    //     try {
    //         debugger;
    //         if (email === "" || whatsapp === "") {
    //             toast.error("Please Enter Required Fileds", {
    //                 style: { minWidth: 180 },
    //                 position: "top-center",
    //             });
    //         }
    //         else {
    //             const mesg = await axiosInstance.put('/api/profile/' + profileData.id, { email: email, whatsapp: whatsapp });
    //             if (mesg.data === "updated") {

    //                 toast.success("updated successfully ", {
    //                     style: { minWidth: 180 },
    //                     position: "top-center",
    //                 });
    //                 getdata();
    //             }
    //             else {
    //                 toast.error("some thing went wrong", {
    //                     style: { minWidth: 180 },
    //                     position: "top-center",
    //                 });

    //             }
    //         }

    //     }
    //     catch (err) {
    //         toast.error("Network Error Try Again Later", {
    //             style: { minWidth: 180 },
    //             position: "top-center",
    //         });

    //     }
    // }
    // useEffect(() => {
    //     // getdata();
    // }, []);

    return (
        <>
            <Toaster />
            <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-xl-9 col-lg-8">
                    <div className="card profile-card card-bx m-b30">
                        <div className="card-header">
                            <h6 className="title">{t('setting')}</h6>
                        </div>
                        <div className="profile-form">
                            <div className="card-body">
                                <div className='row'>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">
                                            {t('set_withdrawal_fee')}
                                        </label>
                                        <div className="input-group">
                                        <input type="text" className="form-control" value={withdrawn} onChange={(e) => setwithdrawn(e.target.value)}
                                        />
                                            <span className="input-group-text">
                                                %
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="card-footer">
                                <div onClick={(e) => setshow(true)} className="btn btn-primary">{t('set')}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        state: state.auth
    };
};
export default connect(mapStateToProps)(SettingAdmin);
