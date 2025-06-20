import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Verified } from "lucide-react";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";

const baseUrl = import.meta.env.VITE_APP_URL;

const ProfileSectionPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    number: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to access your profile", {
        position: "top-left",
      });
      navigate("/customer-sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch profile
        const profileRes = await axios.get(
          `${baseUrl}/customer-profile`,
          config
        );
        console.log("profileRes", profileRes);

        setUser(profileRes.data.user);
        setProfileForm({
          fullName: profileRes.data.user.fullName || "",
          email: profileRes.data.user.email || "",
          number: profileRes.data.user.number || "",
          profilePic: null,
        });

        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          toast.error("Session expired. Please log in again.", {
            position: "top-left",
          });
          navigate("/customer-sign-in");
        }
        toast.error("Failed to fetch profile data", { position: "top-left" });
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth || !customerAuth.token) {
        toast.error("Please log in to update profile", {
          position: "top-left",
        });
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
      toast.success(res.data.message, { position: "top-left" });

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
      toast.error(error.response?.data?.message || "Failed to update profile", {
        position: "top-left",
      });
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

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <>
      <CustomerNavbar />
     <div className="flex flex-col lg:flex-row flex-1"> 
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-12">
          <section className="my-8 bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            {user && (
              <>
                <div className="flex items-center mb-6">
                  <img
                    src={
                      user.profilePic ||
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-4 object-cover" // Added object-cover for better image fitting
                  />
                  <div>
                    <p className="text-lg font-medium">{user.fullName}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">
                      {user.number || "No phone number"}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileForm.fullName}
                      onChange={handleProfileChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter email"
                        disabled={user.isGoogleUser}
                      />
                      {user.isGoogleUser && (
                        <Verified className="text-logoColor absolute top-1/2 right-2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={profileForm.number}
                      onChange={handleProfileChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleProfileChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 rounded w-full md:w-auto"
                  >
                    Update Profile
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileSectionPage;
