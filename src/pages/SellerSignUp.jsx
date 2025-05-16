import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaImage,
} from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleButton from "../components/global/GoogleButton";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;
const SellerSignUp = () => {
  // const [sellerType, setSellerType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [profilePic, setProfilePic] = useState("");
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // phone: "",
    password: "",
    // bio: "",
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    // const signUpData = new FormData();
    const signUpData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    // signUpData.append("sellerType", sellerType);
    // signUpData.append("fullName", formData.fullName);
    // signUpData.append("email", formData.email);
    // signUpData.append("phone", formData.phone);
    // signUpData.append("password", formData.password);
    // signUpData.append("bio", formData.bio);
    // if (profilePic) {
    //   signUpData.append("profilePic", profilePic);
    // }
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }

    axios
      .post(`${baseUrl}/sign-up-seller`, signUpData)
      .then((result) => {
        setLoading(false);
        toast(result.data.message, {
          position: "top-left",
          type: "success",
        });
        Navigate("/seller-sign-in");
        console.log(result);
      })
      .catch((err) => {
        setLoading(false);
        toast(err.response.data.message, {
          position: "top-left",
          type: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
          <div className="py-4 px-6">
            <h2 className="text-2xl font-semibold  text-center mb-4">
             Sub-Broker Sign Up
            </h2>
          </div>
          <form className="p-6 space-y-2" onSubmit={submitHandler}>
            {/* User Type */}
            {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign Up As <span className="text-black-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={sellerType === "subBroker"}
                  onChange={() =>
                    setSellerType(sellerType === "subBroker" ? "" : "subBroker")
                  }
                  className="mr-2 h-4 w-4 accent-green-600"
                />
                Sub Broker
              </label>
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={sellerType === "individualSeller"}
                  onChange={() =>
                    setSellerType(
                      sellerType === "individualSeller"
                        ? ""
                        : "individualSeller"
                    )
                  }
                  className="mr-2 h-4 w-4 accent-green-600"
                />
                Individual Seller
              </label>
            </div>
          </div> */}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-black-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor "
                  onChange={inputHandler}
                  name="fullName"
                  value={formData.fullName}
                />
              </div>
            </div>

            {/* Bio */}
            {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows={1}
              placeholder="bio..."
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none resize-none focus:ring-1 focus:ring-logoColor"
              name="bio"
              value={formData.bio}
              onChange={inputHandler}
            ></textarea>
          </div> */}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-black-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor"
                  name="email"
                  value={formData.email}
                  onChange={inputHandler}
                />
              </div>
            </div>

            {/* Phone */}
            {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-black-500">*</span>
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                placeholder="9876543210"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor"
                name="phone"
                value={formData.phone}
                onChange={inputHandler}
              />
            </div>
          </div> */}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-black-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor"
                  name="password"
                  value={formData.password}
                  onChange={inputHandler}
                />
                <div
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-2 file:mr-2 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-logoColor file:text-white file:cursor-pointer focus:ring-1 focus:ring-logoColor"
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
              />
            </div>
          </div> */}

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-logoColor text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            <GoogleButton
              endpoint="/google-auth-sign-up"
              buttonName="Sign Up With Google"
              navigatePathSuccess="/seller-sign-in"
              navigatePathError="/seller-sign-in"
            />

            {/* Sign In Link */}
            <p className="md:col-span-2 text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/seller-sign-in"
                className="text-blue-600 hover:text-[#64AE37] font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerSignUp;
