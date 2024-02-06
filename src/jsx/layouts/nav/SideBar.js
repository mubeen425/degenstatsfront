/// Menu
import React, { useContext, useReducer, useState } from "react";
//import Metismenu from "metismenujs";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from "react-bootstrap/Collapse";
import { useTranslation } from "react-i18next";

/// Link
import { Link, NavLink } from "react-router-dom";

import { MenuList } from "./Menu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { AdminMenuList } from "./AdminMenu";
import { useSelector } from "react-redux";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  const state = useSelector((state) => state);

  const [statex, setStatex] = useReducer(reducer, initialState);

  // let handleheartBlast = document.querySelector('.heart');
  // function heartBlast(){
  //   return handleheartBlast.classList.toggle("heart-blast");
  // }

  //For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  // Menu dropdown list
  //const [active , setActive] = useState('');
  //const [activeSubmenu , setActiveSubmenu] = useState('');

  const handleMenuActive = (status) => {
    setStatex({ active: status });

    if (statex.active === status) {
      setStatex({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setStatex({ activeSubmenu: status });
    if (statex.activeSubmenu === status) {
      setStatex({ activeSubmenu: "" });
    }
  };
  // Menu dropdown list End

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  const { t } = useTranslation();

  return (
    <div
      className={`deznav  border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}>
      <PerfectScrollbar className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {state.auth.auth.isAdmin === true
            ? AdminMenuList.map((data, index) => {
                let menuClass = data.classsChange;
                if (menuClass === "menu-title") {
                  return (
                    <li className={menuClass} key={index}>
                      {t(data.key)}
                    </li>
                  );
                } else {
                  return (
                    <li
                      className={` ${
                        statex.active === data.title ? "mm-active" : ""
                      }`}
                      key={index}>
                      {data.content && data.content.length > 0 ? (
                        <Link
                          to={"#"}
                          className="has-arrow"
                          onClick={() => {
                            handleMenuActive(data.title);
                          }}>
                          {data.iconStyle}
                          <span className="nav-text">{t(data.key)}</span>
                        </Link>
                      ) : (
                        <NavLink to={data.to}>
                          {data.iconStyle}
                          <span className="nav-text">{t(data.key)}</span>
                        </NavLink>
                      )}
                      <Collapse
                        in={statex.active === data.title ? true : false}>
                        <ul
                          className={`${
                            menuClass === "mm-collapse" ? "mm-show" : ""
                          }`}>
                          {data.content &&
                            data.content.map((data, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`${
                                    statex.activeSubmenu === data.title
                                      ? "mm-active"
                                      : ""
                                  }`}>
                                  {data.content && data.content.length > 0 ? (
                                    <>
                                      <NavLink
                                        to={data.to}
                                        className={
                                          data.hasMenu ? "has-arrow" : ""
                                        }
                                        onClick={() => {
                                          handleSubmenuActive(data.title);
                                        }}>
                                        {t(data.key)}
                                      </NavLink>
                                      <Collapse
                                        in={
                                          statex.activeSubmenu === data.title
                                            ? true
                                            : false
                                        }>
                                        <ul
                                          className={`${
                                            menuClass === "mm-collapse"
                                              ? "mm-show"
                                              : ""
                                          }`}>
                                          {data.content &&
                                            data.content.map((data, index) => {
                                              return (
                                                <>
                                                  <li key={index}>
                                                    <Link
                                                      className={`${
                                                        path === data.to
                                                          ? "mm-active"
                                                          : ""
                                                      }`}
                                                      to={data.to}>
                                                      {t(data.key)}
                                                    </Link>
                                                  </li>
                                                </>
                                              );
                                            })}
                                        </ul>
                                      </Collapse>
                                    </>
                                  ) : (
                                    <Link to={data.to}>{t(data.key)}</Link>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Collapse>
                    </li>
                  );
                }
              })
            : MenuList.map((data, index) => {
                let menuClass = data.classsChange;
                if (menuClass === "menu-title") {
                  return (
                    <li className={menuClass} key={index}>
                      {t(data.key)}
                    </li>
                  );
                } else {
                  return (
                    <li
                      className={` ${
                        statex.active === data.title ? "mm-active" : ""
                      }`}
                      key={index}>
                      {data.content && data.content.length > 0 ? (
                        <>
                          <Link
                            to={"#"}
                            className="has-arrow"
                            onClick={() => {
                              handleMenuActive(data.title);
                            }}>
                            {data.iconStyle}
                            <span className="nav-text">{t(data.key)}</span>
                          </Link>

                          <Collapse
                            in={statex.active === data.title ? true : false}>
                            <ul
                              className={`${
                                menuClass === "mm-collapse" ? "mm-show" : ""
                              }`}>
                              {data.content &&
                                data.content.map((data, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className={`${
                                        statex.activeSubmenu === data.title
                                          ? "mm-active"
                                          : ""
                                      }`}>
                                      {data.content &&
                                      data.content.length > 0 ? (
                                        <>
                                          <NavLink
                                            to={data.to}
                                            className={
                                              data.hasMenu ? "has-arrow" : ""
                                            }
                                            onClick={() => {
                                              handleSubmenuActive(data.title);
                                            }}>
                                            {t(data.key)}
                                          </NavLink>
                                          <Collapse
                                            in={
                                              statex.activeSubmenu ===
                                              data.title
                                                ? true
                                                : false
                                            }>
                                            <ul
                                              className={`${
                                                menuClass === "mm-collapse"
                                                  ? "mm-show"
                                                  : ""
                                              }`}>
                                              {data.content &&
                                                data.content.map(
                                                  (data, index) => {
                                                    return (
                                                      <>
                                                        <li key={index}>
                                                          <Link
                                                            className={`${
                                                              path === data.to
                                                                ? "mm-active"
                                                                : ""
                                                            }`}
                                                            to={data.to}>
                                                            {t(data.key)}
                                                          </Link>
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                )}
                                            </ul>
                                          </Collapse>
                                        </>
                                      ) : (
                                        <Link to={data.to}>{t(data.key)}</Link>
                                      )}
                                    </li>
                                  );
                                })}
                            </ul>
                          </Collapse>
                        </>
                      ) : (
                        <NavLink to={data.to}>
                          {data.iconStyle}
                          <span className="nav-text">{t(data.key)}</span>
                        </NavLink>
                      )}
                    </li>
                  );
                }
              })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
