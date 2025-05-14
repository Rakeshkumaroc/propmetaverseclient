import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import RedirectPage from "../pages/RedirectPage";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../components/admin/pages/Dashboard";
import WeEnquiry from "../components/admin/pages/WeEnquiry";
import MyProfile from "../components/admin/pages/MyProfile";
import NotFound from "../pages/NotFound";
import DamacEnquiry from "../components/admin/pages/DamacEnquiry";
import AddProperty from "../components/seller/pages/AddProperty.jsx";
import Property from "../components/seller/pages/Property.jsx";
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
import CompleteSellerProfile from "../components/seller/pages/CompleteSellerProfile";
import CustomerSignUp from "../pages/CustomerSignUp";
import CustomerLogin from "../pages/CustomerLogin";
import CustomerDashboard from "../components/customer/pages/CustomerDashboard";
import CustomerForgetPassword from "../pages/CustomerForgetPassword";
import CustomerResetPassword from "../pages/CustomerResetPassword";
import Favorites from "../pages/Favorites";
import ManageSeller from "../components/admin/pages/ManageSeller";
import SellerDetails from "../components/admin/manageSeller/SellerDetails";
import CustomerDetails from "../components/admin/customer/CustomerDetails";
import ViewCustomer from "../components/admin/pages/ViewCustomer";
import ManageTrainingMaterials from "../components/admin/pages/ManageTrainingMaterials";
import SupportTickets from "../components/admin/pages/SupportTickets.jsx";
import LeadManagement from "../components/admin/pages/LeadManagement";
import CommissionManagement from "../components/admin/pages/CommissionManagement";
import ListingManagement from "../components/admin/pages/ListingManagement";
import ThankYou from "../pages/ThankYou";
import SellerLeadManagement from "../components/seller/pages/SellerLeadManagement.jsx";
import CustomerDashboardd from "../pages/CustomerDashboardd.jsx";
import ManageAnnouncements from "../components/admin/pages/ManageAnnouncements.jsx";
import ProfileSectionPage from "../components/customer/pages/ProfileSectionPage.jsx";
import SavedPropertiesPage from "../components/customer/pages/SavedPropertiesPage.jsx";
import Activities from "../components/customer/pages/Activities.jsx";

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
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/test" element={<CustomerDashboardd />} />
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
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/profile" element={<ProfileSectionPage />} />
        <Route
          path="/customer/saved-properties"
          element={<SavedPropertiesPage />}
        />
        <Route path="/customer/activities" element={<Activities />} />
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
          <Route path="announcements" element={<ManageAnnouncements />} />
          {/* User Management */}
          <Route path="manage-sellers" element={<ManageSeller />} />
          <Route path="seller-details/:id" element={<SellerDetails />} />
          <Route path="customer-details/:id" element={<CustomerDetails />} />
          <Route path="view-customers" element={<ViewCustomer />} />
          <Route
            path="training-materials"
            element={<ManageTrainingMaterials />}
          />
          <Route path="support-tickets" element={<SupportTickets />} />
          {/* lead-management */}
          <Route path="lead-management" element={<LeadManagement />} />
          {/* commission-management */}
          <Route
            path="commission-management"
            element={<CommissionManagement />}
          />
          <Route path="listing-management" element={<ListingManagement />} />

          <Route path="hero" element={<Hero />} />
          <Route path="add-hero" element={<AddHero />} />
          <Route path="hero/:id" element={<AddHero action={"edit"} />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* seller dashboard */}
        <Route
          path="/seller-complete-profile"
          element={<CompleteSellerProfile />}
        />
        <Route path="/seller" element={<Seller />}>
          <Route path="seller-dashboard" element={<SellerDashboard />} />
          <Route path="seller-profile" element={<SellerProfile />} />
          <Route path="property" element={<Property />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route
            path="property/:id"
            element={<AddProperty action={"edit"} />}
          />
          <Route path="seller-leads" element={<SellerLeadManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
