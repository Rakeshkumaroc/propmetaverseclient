import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
import profilePlaceHolder from "../../../assets/image/prifilePlaceHolder.jpg";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";

const SellerProfileFrom = () => {
  // profile state variable start

  const [loading, setLoading] = useState(false);
  const [initialSellerType, setInitialSellerType] = useState("");

  const [data, setData] = useState({
    fullName: "",
    bio: "",
    number: "",
    fullAddress: "",
    pincode: "",
    district: "",
    state: "",
    email: "",
    isGoogleUser: false,
    sellerType: "",
  });
 

  // profile state variable start End

  //password start

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Validate inputs
  const validate = (name, value) => {
    const newErrors = { ...errors };

    if (name === "newPassword") {
      if (!value) newErrors.newPassword = "New password is required.";
      else if (value.length < 8)
        newErrors.newPassword = "Must be at least 8 characters.";
      else delete newErrors.newPassword;
    }

    if (name === "confirmPassword") {
      if (value !== form.newPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  // Handle form submission password
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation check
    if (
      Object.keys(errors).length > 0 ||
      form.newPassword !== form.confirmPassword
    ) {
      Swal.fire("Error", "Please fix the form errors", "error");
      return;
    }

    try {
      const sellerId = localStorage.getItem("sellerId");
      const token = localStorage.getItem("token");

      if (sellerId && token) {
        const res = await fetch(`${baseUrl}/change-password/${sellerId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          Swal.fire("Success", data.message, "success");
          setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
          setErrors({});
        } else {
          const errorData = await res.json();
          Swal.fire(
            "Error",
            errorData.error || "Failed to update password",
            "error"
          );
        }
      }
    } catch (err) {
      console.error("error", err);
      Swal.fire("Error", "Server error. Try again.", "error");
    }
  };
  //password end

  //image start
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload logic here (Cloudinary or server API)
      console.log("Selected File:", file);
    }
  };

  //image end

  //profile  start
  // get data By Id
  const fetchSellerDataById = () => {
    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .get(`${baseUrl}/get-seller-data/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          // console.log(result.data.sellerData);
          setData(result.data.sellerData);
          setInitialSellerType(result.data.sellerData.sellerType || "");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };

  useEffect(() => {
    fetchSellerDataById();
  }, []);
  // console.log("data", data);

  const profileInputHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const sellerUpdateData = {
      fullName: data.fullName,
      sellerType: data.sellerType,
      bio: data.bio,
      number: data.number,
    };

    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .put(`${baseUrl}/update-seller/${sellerId}`, sellerUpdateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully!",
            confirmButtonColor: "#000",
            icon: "success",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
            buttonsStyling: false,
          });
          // console.log(result.data.sellerData);
          // setData(result.data.sellerData);
          fetchSellerDataById();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };
  // profile  end
  return (
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 mt-10">
        {/* User Info Section */}
        <div className="flex items-center justify-between mb-8 px-4">
          {/* Profile Image */}
          <img
            src={data?.profilePic || profilePlaceHolder}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />

          {/* Status Section */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold leading-[26px]">
              Status:
            </span>
            <span
              className={`text-sm font-medium px-3 py-0.5 rounded-full ${
                data?.approveStatus === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {data?.approveStatus }
            </span>
          </div>
        </div>

        {/* Form Start */}
        <form onSubmit={updateProfileHandler}>
          <div className="space-y-5">
            {/* User Type */}
            {/* Seller Type Section */}
            {initialSellerType ? (
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold leading-[26px]">
                  Seller Type
                </span>
                <span
                  className={`text-sm font-medium px-3 py-0.5 rounded-full ${
                    initialSellerType === "subBroker"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {initialSellerType}
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Seller Type
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellerType"
                      value="subBroker"
                      onChange={profileInputHandler}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm">Sub Broker</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellerType"
                      value="individualSeller"
                      onChange={profileInputHandler}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm">Individual Seller</span>
                  </label>
                </div>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={profileInputHandler}
                value={data?.fullName || ""}
                // disabled
                placeholder="Your Name"
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  value={data?.email || ""}
                  disabled
                  placeholder="Your Email"
                  className="w-full border px-2 rounded-lg h-14 border-gray-300 text-sm py-3 pr-24"
                />
                {data.isEmailVerify && (
                  <FiCheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
                )}
              </div>
            </div>

            {/* Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="number"
                  value={data?.number || ""}
                  onChange={profileInputHandler}
                  disabled={data.isNumberVerify}
                  placeholder="Your Number"
                  className="w-full border px-2 rounded-lg h-14 border-gray-300 text-sm py-3 pr-24"
                />
                {data.isNumberVerify && (
                  <FiCheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                onChange={profileInputHandler}
                value={data?.bio || ""}
                // disabled
                placeholder="Your Bio"
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="mt-10 flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Update Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                disabled
                onChange={handleProfileImageChange}
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Approved At Date */}
            <div className="mt-6">
              <label className="text-[14px] font-semibold leading-[26px] block mb-1">
                Approved At
              </label>
              <p className="text-sm text-gray-600">
                {data?.approvedAt
                  ? new Date(data.approvedAt).toLocaleDateString()
                  : "Not approved yet"}
              </p>
            </div>
          </div>
          <div className="flex ">
            <button
              type="submit"
              className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white"
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                </div>
              ) : (
                <span className="flex items-center gap-1">
                  Update Profile <GoArrowUpRight className="text-xl" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      {data && !data.isGoogleUser && (
        <div className="p-8 mt-1">
          <form onSubmit={handleSubmit} className="p-8 mt-10">
            <p className="text-center text-lg font-semibold mb-5">
              Change Password
            </p>
            <div className="space-y-5">
              {[
                { label: "Old Password", name: "oldPassword" },
                { label: "New Password", name: "newPassword" },
                { label: "Confirm New Password", name: "confirmPassword" },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col gap-2">
                  <label htmlFor={name} className="text-sm font-medium">
                    {label}
                  </label>
                  <input
                    type="password"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className="border px-3 py-3 rounded-lg text-sm"
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 mt-6 bg-black text-white px-5 py-3 rounded-lg hover:scale-105 transition"
            >
              Update Password <GoArrowUpRight />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerProfileFrom;
