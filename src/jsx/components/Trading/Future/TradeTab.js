import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TradeTab = ({ rejectedData, to, handleConnectClick }) => {
  const state = useSelector((state) => state);
  const { t } = useTranslation();
  const [data, setData] = useState(
    document.querySelectorAll("#futuretrade_wrapper tbody tr")
  );
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  const getFormattedDate = (date) => {
    //get only day and month in english
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${day} ${month} ${year}`;
  };
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
  // use effect
  useEffect(() => {
    setTimeout(() => {
      setData(document.querySelectorAll("#futuretrade_wrapper tbody tr"));
    }, 500);
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(rejectedData.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  return (
    <>
      <div className="table-responsive dataTabletrade ">
        <div id="futuretrade_wrapper" className="dataTables_wrapper no-footer">
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
                <th className="text-end">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {rejectedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {state.auth.auth.isAdmin ? (
                      <Link
                        onClick={() => {
                          handleConnectClick(item.wallet_address);
                        }}>
                        {item.wallet_address}
                      </Link>
                    ) : (
                      item.wallet_address
                    )}
                  </td>
                  {/* <td>{item.blockhash}</td> */}
                  <td>{item.bxg}</td>
                  <td>{item.usdt}</td>
                  <td>{getFormattedDate(item.updatedAt)}</td>
                  <td className="text-end">
                    <div className="bootstrap-badge">
                      <Badge pill bg="danger">
                        {t("rejected")}
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
            <div className="dataTables_info">
              {t("showing")} {activePag.current * sort + 1} {t("to")}{" "}
              {rejectedData.length > (activePag.current + 1) * sort
                ? (activePag.current + 1) * sort
                : rejectedData.length}{" "}
              {t("of")} {rejectedData.length} {t("entries")}
            </div>
            <div
              className="dataTables_paginate paging_simple_numbers mb-0"
              id="application-tbl1_paginate">
              <Link
                className="paginate_button previous "
                to={to}
                onClick={() =>
                  activePag.current > 0 && onClick(activePag.current - 1)
                }>
                <i className="fa fa-angle-double-left"></i>
              </Link>
              <span>
                {paggination.map((number, i) => (
                  <Link
                    key={i}
                    to={to}
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
                to={to}
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
    </>
  );
};
export default TradeTab;
