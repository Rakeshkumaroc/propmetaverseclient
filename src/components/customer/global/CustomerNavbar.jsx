import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiBell, FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to continue", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch profile
        const profileRes = await axios.get(`${baseUrl}/customer-profile`, config);
        setUser(profileRes.data.user);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          toast.error("Session expired. Please log in again.", { position: "top-left" });
          navigate("/customer-sign-in");
        }
        toast.error("Failed to fetch user data", { position: "top-left" });
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://propmetaverse.com/assets/logopng-BXERHkCM.png"
          alt="Logo"
          className="h-10"
        />
      </div>
      <div className="flex-1 mx-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Property / Location"
            className="w-full pl-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoBlue"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-logoBlue">
          <FiBell className="text-2xl" />
        </button>
        <div className="flex items-center space-x-2">
          <CgProfile className="text-2xl" />
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div>
              <span className="font-semibold">{user.fullName || "User"}</span>
              <span className="text-sm text-gray-500 block">Buyer/Seller</span>
            </div>
          ) : (
            <div>
              <span className="font-semibold">Guest</span>
              <span className="text-sm text-gray-500 block">Buyer/Seller</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;