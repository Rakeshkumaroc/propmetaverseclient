import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import Footer from "../../global/Footer";
import RecentSearchesSection from "../../customerDashboard/RecentSearchesSection";
import EnquiryStatusSection from "../../customerDashboard/EnquiryStatusSection";

const baseUrl = import.meta.env.VITE_APP_URL;

const Activities = () => {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to view activities", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch search history
        const historyRes = await axios.get(`${baseUrl}/customer-search-history`, config);
        setSearchHistory(historyRes.data.searchHistory || []);

        // Fetch enquiries
        const enquiriesRes = await axios.get(`${baseUrl}/customer-enquiries`, config);
        setEnquiries(enquiriesRes.data.enquiries || []);

        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          toast.error("Session expired. Please log in again.", { position: "top-left" });
          navigate("/customer-sign-in");
        }
         
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <>
      <CustomerNavbar />
      <div className="flex flex-1">
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-12">
          <section className="my-8 bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Activities</h2>
            <RecentSearchesSection searchHistory={searchHistory} />
          </section>
          <section className="my-8 bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Enquiry Status</h2>
            <EnquiryStatusSection enquiries={enquiries} />
          </section>
        </div>
      </div> 
    </>
  );
};

export default Activities;