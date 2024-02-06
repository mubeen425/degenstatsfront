import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import { Tab } from "react-bootstrap";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
//import ServerStatusBar from './Dashboard/ServerStatusBar';

import axiosInstance, {
  getDataForAdminDashboard,
} from "../../../services/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import AdminDashboardCard from "./Dashboard/AdminDashboardCard";
import { use } from "i18next";

const AdminHome = () => {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);
  const [data, setData] = useState([]);
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(requests.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  // use effect
  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setData(document.querySelectorAll("#future_wrapper tbody tr"));
      setLoader(false);
    }, 500);
  }, [test]);

  useEffect(() => {
    setTimeout(() => {
      setData(document.querySelectorAll("#future_wrapper tbody tr"));
      setLoader(false);
    }, 1000);
  }, [requests]);

  const [totalBxg, settotalBxg] = useState(0);
  const [totalUsers, settotalUsers] = useState(0);
  const [totalbxgsold, settotalbxgsold] = useState(0);
  const [totalbxgstaked, settotalbxgstaked] = useState(0);
  const [totalbxgclaimed, settotalbxgclaimed] = useState(0);

  const FetchData = async () => {
    setLoader(true);
    try {
      const { data } = await axiosInstance.get("/api/profile/");
      settotalBxg(data.totalBxgAvailable);
      settotalUsers(data.userCount);
      settotalbxgsold(data.totalBxgBought);
      settotalbxgstaked(data.totalBxgStaked);
      settotalbxgclaimed(data.totalClaimReward);
      setRequests(data.allProfilesData);
    } catch (err) {
      toast.error("Network Error Try Again Later", {
        style: { minWidth: 180 },
        position: "top-center",
      });
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
    FetchData();
  }, []);

  return (
    <>
      <div className="row">
        <AdminDashboardCard
          svg={
            <svg
              id="icon-customers"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          }
          col={6}
          translateKey="totalusers"
          bxg={totalUsers}
        />
        <AdminDashboardCard
          svg={
            <svg
              id="icon-revenue"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-dollar-sign">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
          col={6}
          translateKey="totalBxgAvailable"
          bxg={totalBxg}
        />

        <AdminDashboardCard
          svg={
            <svg
              id="icon-revenue"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-dollar-sign">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
          col={4}
          translateKey="totalbxgsold"
          bxg={totalbxgsold}
        />
        <AdminDashboardCard
          svg={
            <svg
              id="icon-revenue"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-dollar-sign">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
          col={4}
          translateKey="totalbxgstaked"
          bxg={totalbxgstaked}
        />
        <AdminDashboardCard
          svg={
            <svg
              id="icon-revenue"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-dollar-sign">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
          col={4}
          translateKey="totalbxgclaimed"
          bxg={totalbxgclaimed}
        />
      </div>
      {
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading">User History</h4>
                </div>
                <div className="card-body pt-0 pb-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="All">
                      <div className="table-responsive dataTabletrade ">
                        <div
                          id="future_wrapper"
                          className="dataTables_wrapper no-footer">
                          <table
                            id="example"
                            className="table display dataTable no-footer"
                            style={{ minWidth: "845px" }}>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>{t("wallet_address")}</th>
                                <th>{t("email")} </th>
                                <th>{t("whatsapp")} </th>
                                {/* <th>Block Hash</th> */}
                                <th>{t("total")} MEME </th>
                              </tr>
                            </thead>
                            <tbody>
                              {}
                              {requests?.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.wallet_address}</td>
                                  <td>{item.email}</td>
                                  <td>{item.whatsapp}</td>
                                  <td>{item.bxg ? item.bxg : "0"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                            {requests.length > 0 ? (
                              <div className="dataTables_info">
                                {t("showing")} {activePag.current * sort + 1}{" "}
                                {t("to")}{" "}
                                {requests.length >
                                (activePag.current + 1) * sort
                                  ? (activePag.current + 1) * sort
                                  : requests.length}{" "}
                                {t("of")} {requests.length} {t("entries")}
                              </div>
                            ) : (
                              <div className="dataTables_info">
                                {t("no_data_available")}
                              </div>
                            )}
                            <div
                              className="dataTables_paginate paging_simple_numbers mb-0"
                              id="application-tbl1_paginate">
                              <Link
                                className="paginate_button previous "
                                to="/admindashboard"
                                onClick={() =>
                                  activePag.current > 0 &&
                                  onClick(activePag.current - 1)
                                }>
                                <i className="fa fa-angle-double-left"></i>
                              </Link>
                              <span>
                                {paggination.map((number, i) => (
                                  <Link
                                    key={i}
                                    to="/admindashboard"
                                    className={`paginate_button  ${
                                      activePag.current === i ? "current" : ""
                                    } `}
                                    onClick={() => onClick(i)}>
                                    {number}
                                  </Link>
                                ))}
                              </span>

                              <Link
                                className="paginate_button next"
                                to="/admindashboard"
                                onClick={() =>
                                  activePag.current + 1 < paggination.length &&
                                  onClick(activePag.current + 1)
                                }>
                                <i className="fa fa-angle-double-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default AdminHome;
