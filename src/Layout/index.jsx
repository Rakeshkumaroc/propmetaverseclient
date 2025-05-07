import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import RedirectPage from "../pages/RedirectPage";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../components/admin/pages/Dashboard";
import WeEnquiry from "../components/admin/pages/WeEnquiry";
import User from "../components/admin/pages/User";
import MyProfile from "../components/admin/pages/MyProfile";
import AddUser from "../components/admin/pages/AddUser";
import NotFound from "../pages/NotFound";
import DamacEnquiry from "../components/admin/pages/DamacEnquiry";
import AddProperty from "../components/admin/pages/AddProperty";
import Property from "../components/admin/pages/Property";
import Hero from "../components/admin/pages/Hero";
import AddHero from "../components/admin/pages/AddHero";
import Projects from "../pages/Projects";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import Contact from "../pages/Contact";
import ComparisonList from "../pages/ComparisonList"; 
import About from "../pages/About";
import RefundPolicy from "../pages/RefundPolicy";
import PricingPolicy from "../pages/PricingPolicy";
import TermsAndCondition from "../pages/TermsAndCondition";
import Privacy from "../pages/Privacy";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

import Seller from "../pages/Seller";
import SellerLoginPage from "../pages/SellerLoginPage";
import SellerSignUp from "../pages/SellerSignUp";
import SellerProfile from "../components/seller/pages/SellerProfile";
import SellerDashboard from "../components/seller/pages/SellerDashboard";
import CompleteSellerProfile from "../components/seller/pages/CompleteSellerProfile.jsx";


import CustomerSignUp from "../pages/CustomerSignUp";
import CustomerLogin from "../pages/CustomerLogin";
import CustomerDashboard from "../components/customer/pages/CustomerDashboard";
import CustomerForgetPassword from "../pages/CustomerForgetPassword";
import CustomerResetPassword from "../pages/CustomerResetPassword";
import Favorites from "../pages/Favorites";

const Layout = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/return-policy" element={<RefundPolicy />} />
        <Route path="/pricing-policy" element={<PricingPolicy />} />
        <Route path="/projects/:title/:id" element={<PropertyDetailsPage />} />
        <Route path="/compare" element={<ComparisonList />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/seller-sign-up" element={<SellerSignUp />} />
        <Route path="/seller-sign-in" element={<SellerLoginPage />} />
        <Route path="/terms-condition" element={<TermsAndCondition />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/customer-sign-up" element={<CustomerSignUp />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-sign-in" element={<CustomerLogin />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/customer-forgot-password"
          element={<CustomerForgetPassword />}
        />
        <Route
          path="/customer-reset-password/:token"
          element={<CustomerResetPassword />}
        />
        {/* admin  */}
        <Route
          path="/admin-login"
          element={<AdminLogin setIsAdmin={setIsAdmin} />}
        />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Admin />
            ) : (
              <RedirectPage title={"Admin"} router={"/admin-login"} />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="we-enquiry" element={<WeEnquiry />} />
          <Route path="damac-enquiry" element={<DamacEnquiry />} />
          <Route path="user" element={<User />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="user/:id" element={<AddUser action={"edit"} />} />
          <Route path="hero" element={<Hero />} />
          <Route path="add-hero" element={<AddHero />} />
          <Route path="hero/:id" element={<AddHero action={"edit"} />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>{" "}
        {/* seller dashboard */}
        <Route
          path="/seller-complete-profile"
          element={<CompleteSellerProfile />}
        />
        <Route path="/seller" element={<Seller />}>
          <Route index element={<SellerDashboard />} />
          <Route path="seller-profile" element={<SellerProfile />} /> 
          <Route path="property" element={<Property />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route
            path="property/:id"
            element={<AddProperty action={"edit"} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
