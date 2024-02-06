import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Button, Dropdown, Form, Modal, Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import USDT from "../../../contractAbis/USDT.json";
//import ServerStatusBar from './Dashboard/ServerStatusBar';

import OrderTab from "../Trading/Future/OrderTab";
import TradeTab from "../Trading/Future/TradeTab";
//images

import axiosInstance from "../../../services/AxiosInstance";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import UserProfileModal from "./UserProfileModal";
import { getUserProfile } from "../../../services/ProfileService";

const Requests = () => {
  const [date, setdate] = useState("");
  const [dataMain, setdataMain] = useState([]);
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [data, setData] = useState([]);
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  const [showModal, setShowModal] = useState(false);
  function handleModalClose() {
    setShowModal(false);
  }

  const handleConnectClick = async (walletaddress) => {
    const { data } = await axiosInstance
      .get(`/api/profile/${walletaddress}`)
      .catch((err) => {
        console.log(err);
      });

    console.log(data, "data");
    setEmail(data.email);
    setWhatsapp(data.whatsapp);

    setShowModal(true);
  };

  var today = new Date();
  today.setDate(today.getDate() + 1);
  // variable for month back date
  var monthBack = new Date();
  monthBack.setDate(monthBack.getDate() - 30);

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
  let paggination = Array(
    Math.ceil(requests.filter((item) => item.type === "pending").length / sort)
  )
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
    FetchData();
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setData(document.querySelectorAll("#future_wrapper tbody tr"));
      setLoader(false);
    }, 1000);
  }, [requests]);

  const [modalShow, setModalShow] = useState(false);

  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const FetchData = async () => {
    setLoader(true);
    try {
      const { data } = await axiosInstance.get("/api/bxghistory/getall");

      let temp = filterArray(
        data,
        moment(monthBack).format("YYYY-MM-DD") +
          " - " +
          moment(today).format("YYYY-MM-DD")
      );
      setRequests(temp.reverse());
      setdataMain(data);

      if (data.message) {
        toast.error(data.message, {
          style: { minWidth: 180 },
          position: "top-center",
        });
      } else {
        //setActiveData(pendingrequests);
      }
    } catch (err) {
      toast.error("Network Error Try Again Later", {
        style: { minWidth: 180 },
        position: "top-center",
      });
    }

    setLoader(false);
  };

  function handleCallback(start, end, label) {
    setdate(start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD"));

    setRequests(
      filterArray(
        dataMain,
        start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD")
      ).reverse()
    );
    onClick(0);
  }

  function filterArray(array, dateRange) {
    const [start, end] = dateRange.split(" - ");
    return array.filter((item) => {
      const itemDate = new Date(item.updatedAt);
      //console.log(itemDate, "itemDate");
      //console.log(new Date(start), "start");
      //console.log(new Date(end), "end");

      //set end date to next day of end date

      const endDate = new Date(end);
      //endDate.setDate(endDate.getDate() + 1);
      //console.log(itemDate >= new Date(start) && itemDate <= new Date(end));
      return itemDate >= new Date(start) && itemDate <= new Date(endDate);
    });
  }

  const AcceptRequest = async (id, walletaddress, amnt) => {
    try {
      // const signer = await provider.getSigner();
      // const usdt = new ethers.Contract(USDT.address, USDT.abi, signer);
      // const amount = await ethers.utils.parseEther(amnt); // replace amount to be sent to the user
      // const tx = await (await USDT.transfer(walletaddress, amount)).wait(); // replace address with users wallet address

      const requestBody = {
        blockhash: "blockhash",
        type: "sell_accepted",
      };

      // if (tx.events) {

      setLoader(true);
      const { data } = await axiosInstance
        .put("/api/bxg/" + id, requestBody)
        .catch((error) => {
          //console.log(error);
        });

      if (data) {
        toast.success(data);
        setLoader(false);
        FetchData();
      }
      // } else {
      //   toast.error("Transaction Failed", {
      //     style: { minWidth: 180 },
      //     position: "top-center",
      //   });
      // }
    } catch (error) {
      toast.error("Transaction Failed", {
        style: { minWidth: 180 },
        position: "top-center",
      });
      //console.log(error);
    }
  };

  const RejectRequest = async (id) => {
    setLoader(true);
    try {
      const requestBody = {
        blockhash: "blockhash",
        type: "sell_rejected",
      };
      const response = await axiosInstance
        .put("/api/bxg/" + id, requestBody)
        .catch((error) => {
          //console.log(error);
        });

      if (response) {
        toast.success("Request Rejected Successfully");
        setLoader(false);
        FetchData();
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const [loader, setLoader] = useState(false);

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const getFormattedDate = (date) => {
    //get only day and month in english
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <Toaster />
      <UserProfileModal
        show={showModal}
        onHide={handleModalClose}
        email={email}
        whatsapp={whatsapp}
      />

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <Tab.Container defaultActiveKey="All">
              <div className="card-header border-0 pb-2 flex-wrap">
                <h4 className="heading">{t("sell_requests")}</h4>
                <>
                  <Nav className="order nav nav-tabs">
                    <Nav.Link as="button" eventKey="All" type="button">
                      {t("pending_requests")}
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="Order" type="button">
                      {t("accepted_sell_requests")}
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="Trade" type="button">
                      {t("rejected_requests")}
                    </Nav.Link>
                  </Nav>
                </>

                <DateRangePicker
                  initialSettings={{ startDate: monthBack, endDate: today }}
                  onCallback={handleCallback}>
                  <input type="text" className="form-control" />
                </DateRangePicker>
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
                              {/* <th>Block Hash</th> */}
                              <th>MEME </th>
                              <th>USDT</th>
                              <th>{t("date")}</th>
                              <th className="text-end">{t("approval")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {}
                            {requests
                              ?.filter((item) => item.type === "pending")
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <Link
                                      onClick={() => {
                                        handleConnectClick(item.wallet_address);
                                      }}>
                                      {item.wallet_address}
                                    </Link>
                                  </td>
                                  {/* <td>{item.blockhash}</td> */}
                                  <td>{item.bxg}</td>
                                  <td>{item.usdt}</td>
                                  <td>{getFormattedDate(item.updatedAt)}</td>
                                  <td className="text-end">
                                    <Link
                                      onClick={() => {
                                        AcceptRequest(
                                          item.id,
                                          item.wallet_address,
                                          item.usdt
                                        );
                                      }}
                                      className="btn btn-success mr-0 btn-sm">
                                      {t("accept")}
                                    </Link>

                                    <Link
                                      onClick={() => {
                                        RejectRequest(item.id);
                                      }}
                                      className="btn btn-warning mr-0 mx-2 btn-sm">
                                      {t("reject")}
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                          {requests.filter((item) => item.type === "pending")
                            ?.length > 0 ? (
                            <div className="dataTables_info">
                              {t("showing")} {activePag.current * sort + 1}{" "}
                              {t("to")}{" "}
                              {requests.filter(
                                (item) => item.type === "pending"
                              ).length >
                              (activePag.current + 1) * sort
                                ? (activePag.current + 1) * sort
                                : requests.filter(
                                    (item) => item.type === "pending"
                                  ).length}{" "}
                              {t("of")}{" "}
                              {
                                requests.filter(
                                  (item) => item.type === "pending"
                                ).length
                              }{" "}
                              {t("entries")}
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
                              to="/requests"
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
                                  to="/requests"
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
                              to="/requests"
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
                  <Tab.Pane eventKey="Order">
                    <OrderTab
                      //pass accepted requests data in props
                      to={"/requests"}
                      acceptedData={requests.filter(
                        (item) => item.type === "sell_accepted"
                      )}
                      handleConnectClick={handleConnectClick}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Trade">
                    <TradeTab
                      to={"/requests"}
                      rejectedData={requests.filter(
                        (item) => item.type === "sell_rejected"
                      )}
                      handleConnectClick={handleConnectClick}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    </>
  );
};
export default Requests;
