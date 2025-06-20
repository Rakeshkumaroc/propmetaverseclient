import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/global/GoogleButton";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;
import axios from "axios";
const SellerLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const [userType, setUserType] = useState({
  //   subBroker: false,
  //   individualSeller: false,
  // });

  // const handleUserTypeChange = (type) => {
  //   setUserType({
  //     subBroker: type === "subBroker",
  //     individualSeller: type === "individualSeller",
  //   });
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const signInData = {
      identifier: formData.email,
      password: formData.password,
    };

    axios
      .post(`${baseUrl}/sign-in-seller`, signInData)
      .then((result) => {
        localStorage.setItem("sellerId", result.data.sellerData.sellerId);
        localStorage.setItem(
          "sellerFullName",
          result.data.sellerData.sellerFullName
        );

        localStorage.setItem("token", result.data.sellerData.token);
        localStorage.setItem("createdAt", result.data.sellerData.createdAt);
        setLoading(false);
        toast(result.data.message, {
          position: "top-left",
          type: "success",
        });

        if (
          result.data.sellerData.sellerIsEmailVerify &&
          result.data.sellerData.sellerIsNumberVerify
        ) {
          Navigate("/seller");
        } else {
          Navigate("/seller-complete-profile");
        }

        console.log(result, "result ffffffffffffffffffffffffffffffff");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold  text-center mb-8">
            {" "}
            Sub-Broker Login
          </h2>
        </div>

        <form className="p-6 space-y-4" onSubmit={submitHandler}>
          {/* User Type Selection */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sign In As <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
            
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subBroker"
                  name="userType"
                  checked={userType.subBroker}
                  onChange={() => handleUserTypeChange("subBroker")}
                  className="h-4 w-4 accent-green-600"
                />
                <label
                  htmlFor="subBroker"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Sub Broker
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="individualSeller"
                  name="userType"
                  checked={userType.individualSeller}
                  onChange={() => handleUserTypeChange("individualSeller")}
                  className="h-4 w-4 accent-green-600"
                />
                <label
                  htmlFor="individualSeller"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Individual Seller
                </label>
              </div>
            </div>
          </div> */}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-1 focus:ring-logoColor outline-none p-2.5"
                placeholder="example@gmail.com"
                required
                value={formData.email}
                onChange={inputHandler}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="pl-10 pr-10 w-full rounded-lg border border-gray-300 focus:ring-1 focus:ring-logoColor outline-none p-2.5"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={inputHandler}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
          {/* Forgot Password Link */}
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-[#64AE37] font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-logoColor text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
              </div>
            ) : (
              " Sign In"
            )}
          </button>
          <GoogleButton
            endpoint="/google-auth-sign-in"
            buttonName="Sign In With Google"
            navigatePathSuccess="/seller-complete-profile"
            navigatePathError="/seller-sign-up"
          />

          {/* Signup Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/seller-sign-up"
              className="text-blue-600 hover:text-[#64AE37] font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerLoginPage;
