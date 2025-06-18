import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar"; 
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
         

        // Fetch search history
        const historyRes = await axios.get(`${baseUrl}/customer-search-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setSearchHistory(historyRes.data.searchHistory || []);

        // Fetch enquiries
        const enquiriesRes = await axios.get(`${baseUrl}/customer-enquiries`);
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

 

  return (
   <>
      <CustomerNavbar />
      <div className="flex flex-1 min-h-screen">
        <CustomerSidebar />
        <main className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Activities</h1>
            
          </header>
          <section className="bg-white shadow rounded p-6 my-8">
            <RecentSearchesSection searchHistory={searchHistory} />
          </section>
          <section className="bg-white shadow rounded p-6 my-8">
            <EnquiryStatusSection enquiries={enquiries} />
          </section>
        </main>
      </div>
    </>
  );
};

export default Activities;