import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import RecentSearchesSection from "../../customerDashboard/RecentSearchesSection";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

const baseUrl = import.meta.env.VITE_APP_URL;

const SearchHistory = () => {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to view activities", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    try {
      const token = customerAuth.token;
      const historyRes = await axios.get(
        `${baseUrl}/customer-search-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchHistory(historyRes.data.searchHistory || []);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("customerAuth");
        toast.error("Session expired. Please log in again.", {
          position: "top-left",
        });
        navigate("/customer-sign-in");
      }
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteSearchItem = async (timestamp) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to perform this action", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    try {
      const token = customerAuth.token;
      const response = await axios.delete(
        `${baseUrl}/customer-search-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { timestamp: timestamp },
        }
      );

      if (response.data.success) {
        toast.success("Search item deleted successfully!", { position: "top-right" });
        setSearchHistory(response.data.searchHistory);
      }
    } catch (error) {
      console.error("Error deleting search item:", error);
      toast.error(error.response?.data?.message || "Failed to delete search item.", {
        position: "top-right",
      });
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("customerAuth");
        navigate("/customer-sign-in");
      }
    }
  };

  const handleClearAllHistory = async () => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to perform this action", {
        position: "top-left",
      });
      navigate("/customer-sign-in");
      return;
    }

    // SweetAlert2 Confirmation Dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to clear all your search history. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b639f",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, keep it"
    });

    if (result.isConfirmed) {
      try {
        const token = customerAuth.token;
        const response = await axios.delete(
          `${baseUrl}/customer-search-history/clear-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          Swal.fire({ // Use Swal.fire for success message
            title: "Cleared!",
            text: "Your search history has been cleared.",
            icon: "success",
            showConfirmButton: false, // Don't show a confirm button
            timer: 1500 // Auto-close after 1.5 seconds
          });
          setSearchHistory([]); // Clear local state directly
        }
      } catch (error) {
        console.error("Error clearing all search history:", error);
        Swal.fire({ // Use Swal.fire for error message
          title: "Error!",
          text: error.response?.data?.message || "Failed to clear search history.",
          icon: "error"
        });
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          navigate("/customer-sign-in");
        }
      }
    }
    // If result.isConfirmed is false, the user clicked "Cancel" or dismissed the dialog,
    // so no action is taken.
  };

  return (
    <>
      <CustomerNavbar />
     <div className="flex flex-col lg:flex-row flex-1"> 
        <CustomerSidebar />
        <main className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Search History</h2>
            {searchHistory.length > 0 && (
              <button
                onClick={handleClearAllHistory}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
              >
                <FaTrashAlt /> Clear All History
              </button>
            )}
          </header>
          <section className="bg-white shadow rounded p-6 my-8">
            {loading ? (
              <p className="text-gray-600">Loading search history...</p>
            ) : (
              <RecentSearchesSection
                searchHistory={searchHistory}
                onDeleteSearchItem={handleDeleteSearchItem}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default SearchHistory;