import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LogoutPage from "./Logout";

import United from "../../../images/United.png";
import Malay from "../../../images/Malay.png";
import Indonesia from "../../../images/Indonesia.png";
import avatar from "../../../images/avatar/2.jpg";
import profile from "../../../images/profile/pic1.jpg";
import { useSelector } from "react-redux";

const Header = ({ onNote }) => {
  const state = useSelector((state) => state);
  //change the language whenever the user selects a new language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setRightSelect(lng);
  };

  const { t, i18n } = useTranslation();
  const [rightSelect, setRightSelect] = useState("en");
  //For fix header
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  //const [searchBut, setSearchBut] = useState(false);
  var path = window.location.pathname.split("/");
  var firstname = path[1].split("-");

  const getIcon = () => {
    if (rightSelect === "en") {
      return United;
    } else if (rightSelect === "malay") {
      return Malay;
    } else if (rightSelect === "ind") {
      return Indonesia;
    }
  };

  const getfullkey = (firstname) => {
    if (firstname[1] === undefined && firstname[2] === undefined) {
      return firstname[0];
    } else if (firstname[2] === undefined) {
      return firstname[0] + "_" + firstname[1];
    } else {
      return firstname[0] + "_" + firstname[1] + "_" + firstname[2];
    }
  };

  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div className="dashboard_bar">{t(getfullkey(firstname))}</div>
            </div>
            <div className="navbar-nav header-right">
              <div className="nav-item d-flex align-items-center">
                <div className="input-group search-area">
                  <span className="input-group-text">
                    <Link to={"#"}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z"
                          fill="var(--secondary)"
                        />
                      </svg>
                    </Link>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                  />
                </div>
              </div>
              <div className="dz-side-menu">
                <div className="search-coundry d-flex align-items-center">
                  {/*create a perfect rounded small div with white borders for image */}
                  <div
                    className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #fff",
                    }}>
                    <img src={getIcon()} alt="flag" style={{ width: "100%" }} />
                  </div>

                  <Dropdown className="sidebar-dropdown me-2 mt-2">
                    <Dropdown.Toggle
                      as="div"
                      className="i-false sidebar-select">
                      {rightSelect}{" "}
                      <i className="fa-solid fa-angle-down ms-2" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeLanguage("en")}>
                        Eng
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => changeLanguage("malay")}>
                        Malay
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => changeLanguage("ind")}>
                        Ind
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <ul>
                  <Dropdown
                    as="li"
                    className="nav-item dropdown header-profile">
                    <Dropdown.Toggle
                      variant=""
                      as="a"
                      className="nav-link i-false c-pointer">
                      <img src={profile} width={20} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      align="right"
                      className="dropdown-menu dropdown-menu-end">
                      {!state.auth.auth.isAdmin && (
                        <Link to="/profile" className="dropdown-item ai-icon">
                          <svg
                            id="icon-user1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary me-1"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                          <span className="ms-2"> {t("profile")} </span>
                        </Link>
                      )}

                      <LogoutPage />
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
