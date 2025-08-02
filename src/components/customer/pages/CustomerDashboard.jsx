import   { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import PreferencesSection from "../../customerDashboard/PreferencesSection";
import NotificationSection from "../../customerDashboard/NotificationSection";

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    propertyType: "",
    minBudget: 0,
    maxBudget: 0,
    location: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to access the dashboard");
      navigate("/customer-sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch profile
        const profileRes = await axios.get(`${baseUrl}/customer-profile`, config);
        setUser(profileRes.data.user);
        setPreferences(profileRes.data.user.preferences || preferences);

        // Fetch notifications
        const notificationsRes = await axios.get(`${baseUrl}/customer-notifications`, config);
        setNotifications(notificationsRes.data.notifications || []);

        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          navigate("/customer-sign-in");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth || !customerAuth.token) return;
      const config = {
        headers: { Authorization: `Bearer ${customerAuth.token}` },
      };
      const res = await axios.get(`${baseUrl}/customer-notifications`, config);
      setNotifications(res.data.notifications || []);
    } catch (error) {
      toast.error("Failed to refresh notifications", { position: "top-left" });
    }
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth || !customerAuth.token) {
        toast.error("Please log in to update preferences", {
          position: "top-left",
        });
        navigate("/customer-sign-in");
        return;
      }

      if (preferences.minBudget < 0 || preferences.maxBudget < 0) {
        toast.error("Budgets must be positive numbers", {
          position: "top-left",
        });
        return;
      }
      if (
        preferences.minBudget > preferences.maxBudget &&
        preferences.maxBudget !== 0
      ) {
        toast.error("Minimum budget must be less than maximum budget", {
          position: "top-left",
        });
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${customerAuth.token}` },
      };
      const res = await axios.put(
        `${baseUrl}/customer-update-preferences`,
        preferences,
        config
      );
      toast.success(res.data.message, {
        position: "top-left",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update preferences",
        {
          position: "top-left",
        }
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerAuth");
    toast.success("Logged out successfully");
    navigate("/customer-sign-in");
  };

  return (
    <>
      <CustomerNavbar />
      <div className="flex flex-col lg:flex-row flex-1"> 
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-4 lg:mt-12"> {/* Adjusted margin-top for mobile */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0"> {/* Adjusted header for stacking on small screens */}
            <h2 className="text-2xl sm:text-3xl font-bold">Customer Dashboard</h2> {/* Adjusted font size */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto" // Full width on mobile
            >
              Logout
            </button>
          </header>
          <NotificationSection
            notifications={notifications}
            setNotifications={setNotifications}
            token={JSON.parse(localStorage.getItem("customerAuth"))?.token}
            fetchNotifications={fetchNotifications}
          />
          <PreferencesSection
            preferences={preferences}
            setPreferences={setPreferences}
            handlePreferencesUpdate={handlePreferencesUpdate}
          />
        </div>
      </div> 
    </>
  );
};

export default CustomerDashboard;