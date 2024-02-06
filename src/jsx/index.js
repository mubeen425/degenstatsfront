/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";

/// React router dom
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";
/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
//import Main from './layouts/Main';

import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";

//Crypto

import Buy from "./components/Crypto/Buy";
import Sell from "./components/Crypto/Sell";
import EditProfile from "./layouts/EditProfile";
import Stake from "./components/Crypto/Stake";

//admin
import Requests from "./components/Crypto/Requests";
import SellHistory from "./components/Crypto/SellHistory";
import BuyHistory from "./components/Crypto/BuyHistory";
import StakeHistory from "./components/Crypto/StakeHistory";
import AdminBuyHistory from "./components/Crypto/AdminBuyHistory";

//Redux
//import Todo from "./pages/Todo";

// Widget

import BonusReferral from "./components/Crypto/BonusReferral";

/// Pages
//import Registration from "./pages/Registration";
//import Login from "./pages/Login";
//import ForgotPassword from "./pages/ForgotPassword";

import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import AdminHome from "./components/Dashboard/AdminHome";
import StakingReferral from "./components/Crypto/StakingReferral";
import Login from "./pages/Login";
import Template404 from "./pages/Template404";
import Conformation from "./pages/conformation";
import AdminStakeHistory from "./components/Crypto/AdminStakeHistory";
import SettingAdmin from "./layouts/SettingAdmin";
import CompleteTask from "./pages/CompleteTask";
import Reference from "./pages/Reference";
import CreateTask from "./components/tasks/CreateTask";



const allroutesMain = [
  /// Dashboard
  { url: "", component: <Home />, admin: false },
  { url: "ref_address", component: <Reference/>, admin: false },
  { url: "dashboard", component: <Home />, admin: false },

  //Crypto

  { url: "buy", component: <Buy />, admin: false },
  { url: "sell", component: <Sell />, admin: false },
  { url: "stake", component: <Stake />, admin: false },
  { url: "bonus-referral", component: <BonusReferral />, admin: false },
  { url: "staking-referral", component: <StakingReferral />, admin: false },

  { url: "sell-history", component: <SellHistory />, admin: false },
  { url: "buy-history", component: <BuyHistory />, admin: false },
  { url: "stake-history", component: <StakeHistory />, admin: false },
  { url: "complete-task", component: <CompleteTask />, admin: false },
  // { url: "create-task", component: <CreateTask />, admin: false },

  //admin
  { url: "admindashboard", component: <AdminHome />, admin: true },
  { url: "requests", component: <Requests />, admin: true },
  { url: "admin-buy-history", component: <AdminBuyHistory />, admin: true },
  { url: "admin-stake-history", component: <AdminStakeHistory />, admin: true },
  { url: "admin-setting", component: <SettingAdmin />, admin: true },

  { url: "create-task", component: <CreateTask />, admin: true },
  //admin

  { url: "profile", component: <EditProfile />, admin: false },
  { url: "*", component: <Template404 /> },

  /////Demo
  // { url: "sidebar-primary", component: <Theme1 /> },
  // { url: "horizontal-sidebar", component: <Theme2 /> },
  // { url: "nav-header", component: <Theme3 /> },
  // { url: "secondary-header", component: <Theme4 /> },
  // { url: "sidebar-theme", component: <Theme5/> },
  // { url: "primary-theme", component: <Theme6/> },
  // { url: "nav-theme", component: <Theme7/> },
  // { url: "sidebar-mini", component: <Theme8 /> },

  // /// Apps
  //   { url: "app-profile", component: <AppProfile /> },
  //   { url: "edit-profile", component: <EditProfile /> },
  //   { url: "email-compose", component: <Compose /> },
  //   { url: "email-inbox", component: <Inbox /> },
  //   { url: "email-read", component: <Read /> },
  //   { url: "app-calender", component: <Calendar /> },
  //   { url: "post-details", component: <PostDetails /> },

  // /// Shop
  //   { url: "ecom-product-grid", component: <ProductGrid /> },
  //   { url: "ecom-product-list", component: <ProductList /> },
  //   { url: "ecom-product-detail", component: <ProductDetail /> },
  //   { url: "ecom-product-order", component: <ProductOrder /> },
  //   { url: "ecom-checkout", component: <Checkout /> },
  //   { url: "ecom-invoice", component: <Invoice /> },
  //   { url: "ecom-customers", component: <Customers /> },
  //
  // ///// Chart
  // { url: "chart-sparkline", component: <SparklineChart /> },
  // { url: "chart-chartjs", component: <ChartJs /> },
  // { url: "chart-apexchart", component: <ApexChart /> },

  //
  ///// pages
  //{ url: "page-register", component: Registration },
  //{ url: "page-lock-screen", component: <LockScreen /> },
  ////{ url: "page-login", component: Login },
  //{ url: "page-forgot-password", component: <ForgotPassword /> },
  //{ url: "page-error-400", component: <Error400 /> },
  //{ url: "page-error-403", component: <Error403 /> },
  //{ url: "page-error-404", component: <Error404 /> },
  //{ url: "page-error-500", component: <Error500 /> },
  //{ url: "page-error-503", component: <Error503 /> },
];

const Markup = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  console.log('okgggggggg');
  const state = useSelector((state) => state);
  let allroutes = [];
  if (!token){ navigate('/') }
  //let path = window.location.pathname;
  //path = path.split("/");
  //path = path[path.length - 1];

  //let pagePath = path.split("-").includes("page");
  //const { menuToggle } = useContext(ThemeContext);
  const al = () => {
    if (state.auth.auth.isAdmin) {
      allroutes = allroutesMain.filter((item) => item.admin === true);
    } else {
      allroutes = allroutesMain.filter((item) => item.admin === false);
    }
    return allroutes;
  };
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {al().map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { menuToggle } = useContext(ThemeContext);
  const location = useLocation();
  const [pageFound, setpageFound] = useState(false);
  return (
    <div
      id="main-wrapper"
      className={`show ${menuToggle ? "menu-toggle" : ""}`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Markup;
