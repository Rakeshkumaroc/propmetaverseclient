import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../../global/Footer";
import Navbar from "../../global/Navbar";
import { handleDetailChange, toggleEdit } from "../../../utils/utils";
import ProfileSection from "../../customerDashboard/ProfileSection";
import PreferencesSection from "../../customerDashboard/PreferencesSection";
import SavedPropertiesSection from "../../customerDashboard/SavedPropertiesSection";
import RecentSearchesSection from "../../customerDashboard/RecentSearchesSection";
import NotificationSection from "../../customerDashboard/NotificationSection";
import EnquiryStatusSection from "../../customerDashboard/EnquiryStatusSection"; // Added import

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    propertyType: "",
    minBudget: 0,
    maxBudget: 0,
    location: "",
  });
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    number: "",
    profilePic: null,
  });
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
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

        const profileRes = await axios.get(
          `${baseUrl}/customer-profile`,
          config
        );
        setUser(profileRes.data.user);
        setPreferences(profileRes.data.user.preferences || preferences);
        setProfileForm({
          fullName: profileRes.data.user.fullName || "",
          email: profileRes.data.user.email || "",
          number: profileRes.data.user.number || "",
          profilePic: null,
        });

        const savedRes = await axios.get(
          `${baseUrl}/customer-saved-properties`,
          config
        );
        setSavedProperties(savedRes.data.savedProperties || []);
        const favoriteIds = savedRes.data.savedProperties.map((prop) => ({
          id: prop._id,
        }));
        localStorage.setItem("savedProperties", JSON.stringify(favoriteIds));

        const storedDetails =
          JSON.parse(localStorage.getItem("favoriteDetails")) || {};
        setFavoriteDetails(storedDetails);
        console.log("Loaded favoriteDetails:", storedDetails);

        const historyRes = await axios.get(
          `${baseUrl}/customer-search-history`,
          config
        );
        setSearchHistory(historyRes.data.searchHistory || []);

        // Fetch notifications
        const notificationsRes = await axios.get(
          `${baseUrl}/customer-notifications`,
          config
        );
        setNotifications(notificationsRes.data.notifications || []);
        setLoading(false);
      } catch (error) {
        // toast.error(
        //   error.response?.data?.message || "Failed to load dashboard"
        // );
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          localStorage.removeItem("savedProperties");
          navigate("/customer-sign-in");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Function to refetch notifications
  const fetchNotifications = async () => {
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth || !customerAuth.token) return;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
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

      // Validate minBudget and maxBudget
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
      console.error("Error updating preferences:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      toast.error(
        error.response?.data?.message || "Failed to update preferences",
        {
          position: "top-left",
        }
      );
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth || !customerAuth.token) {
        toast.error("Please log in to update profile");
        navigate("/customer-sign-in");
        return;
      }

      const formData = new FormData();
      formData.append("fullName", profileForm.fullName);
      formData.append("email", profileForm.email);
      formData.append("number", profileForm.number);
      if (profileForm.profilePic) {
        formData.append("profilePic", profileForm.profilePic);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${customerAuth.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.put(
        `${baseUrl}/customer-update-profile`,
        formData,
        config
      );
      setUser(res.data.user);
      toast.success(res.data.message);

      setProfileForm({
        fullName: res.data.user.fullName,
        email: res.data.user.email,
        number: res.data.user.number,
        profilePic: null,
      });
      localStorage.setItem(
        "customerAuth",
        JSON.stringify({
          ...customerAuth,
          user: res.data.user,
        })
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setProfileForm({ ...profileForm, profilePic: files[0] });
    } else {
      setProfileForm({ ...profileForm, [name]: value });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerAuth");
    localStorage.removeItem("savedProperties");
    localStorage.removeItem("favoriteDetails");
    toast.success("Logged out successfully");
    navigate("/customer-sign-in");
  };

  const handleRemoveFavorite = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to remove favorites.", {
        position: "top-left",
      });
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/remove-from-saved-properties`,
        { propertyId },
        {
          headers: { Authorization: `Bearer ${customerAuth.token}` },
        }
      );

      setSavedProperties((prev) =>
        prev.filter((prop) => prop._id !== propertyId)
      );

      const stored = JSON.parse(localStorage.getItem("savedProperties")) || [];
      const updatedStored = stored.filter((item) => item.id !== propertyId);
      localStorage.setItem("savedProperties", JSON.stringify(updatedStored));

      setFavoriteDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[propertyId];
        localStorage.setItem("favoriteDetails", JSON.stringify(newDetails));
        return newDetails;
      });

      setEditingPropertyId(null);
      toast.success("Property removed from favorites", {
        position: "top-left",
      });
    } catch (error) {
      console.error(
        "Error removing favorite:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to remove favorite. Please try again.", {
        position: "top-left",
      });
    }
  };

  const handleCardSubmit = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to save preferences.", {
        position: "top-left",
      });
      return;
    }

    const details = favoriteDetails[propertyId];
    if (!details || (!details.numbering && !details.notes)) {
      toast.error("Please enter a rank or notes before submitting.", {
        position: "top-left",
      });
      return;
    }

    const numberings = Object.entries(favoriteDetails)
      .filter(([id]) => id !== propertyId)
      .map(([, detail]) => detail.numbering)
      .filter((num) => num !== "" && num !== undefined);
    if (details.numbering && numberings.includes(details.numbering)) {
      toast.error("This preference rank is already used.", {
        position: "top-left",
      });
      return;
    }

    try {
      localStorage.setItem("favoriteDetails", JSON.stringify(favoriteDetails));
      toast.success(
        `Preferences for ${
          savedProperties.find((p) => p._id === propertyId).title
        } saved!`,
        {
          position: "top-left",
        }
      );
      setEditingPropertyId(null);
    } catch (error) {
      console.error("Error saving card preferences:", error);
      toast.error("Failed to save preferences. Please try again.", {
        position: "top-left",
      });
    }
  };

  // Loading state
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className="px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 mt-42">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
        <ProfileSection
          user={user}
          profileForm={profileForm}
          setUser={setUser}
          setProfileForm={setProfileForm}
          handleProfileUpdate={handleProfileUpdate}
          handleProfileChange={handleProfileChange}
        />
          <EnquiryStatusSection /> {/* Added EnquiryStatusSection */}
        
        <SavedPropertiesSection
          savedProperties={savedProperties}
          favoriteDetails={favoriteDetails}
          editingPropertyId={editingPropertyId}
          setFavoriteDetails={setFavoriteDetails}
          setEditingPropertyId={setEditingPropertyId}
          handleRemoveFavorite={handleRemoveFavorite}
          handleCardSubmit={handleCardSubmit}
          handleDetailChange={handleDetailChange}
          toggleEdit={toggleEdit}
        />
        <RecentSearchesSection searchHistory={searchHistory} />
      </div>
      <Footer />
    </>
  );
};

export default CustomerDashboard;