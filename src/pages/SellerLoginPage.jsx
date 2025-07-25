import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/global/GoogleButton";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/global/Navbar";
import customerSignupImg from "../assets/customerSignup.png";

const baseUrl = import.meta.env.VITE_APP_URL;

const SellerLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.email || !formData.password) {
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all required fields",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    const signInData = {
      identifier: formData.email,
      password: formData.password,
    };

    try {
      const result = await axios.post(`${baseUrl}/sign-in-seller`, signInData);
      localStorage.setItem("sellerId", result.data.sellerData.sellerId);
      localStorage.setItem("sellerFullName", result.data.sellerData.sellerFullName);
      localStorage.setItem("token", result.data.sellerData.token);
      localStorage.setItem("createdAt", result.data.sellerData.createdAt);
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });

      if (
        result.data.sellerData.sellerIsEmailVerify &&
        result.data.sellerData.sellerIsNumberVerify
      ) {
        navigate("/seller");
      } else {
        navigate("/seller-complete-profile");
      }
    } catch (err) {
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Login failed",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      console.error("Sign-in error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 mt-10 md:pl-20 mx-auto sm:mt-24 md:mt-[150px] xl:mt-[150px] 2xl:mt-[200px]">
        <div className="w-full max-w-[1920px] grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 items-start">
          {/* Left Form Section */}
          <div className="w-full col-span-1 md:col-span-2 max-w-md mx-auto md:max-w-none">
            <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-logoBlue mb-6 sm:mb-8">
              Partner Login
            </h1>

            <form className="space-y-4 sm:space-y-5" onSubmit={submitHandler}>
              {/* Email Field */}
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base"
                  name="email"
                  value={formData.email}
                  onChange={inputHandler}
                  aria-label="Email address"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base"
                    name="password"
                    value={formData.password}
                    onChange={inputHandler}
                    aria-label="Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500" size={20} />
                    ) : (
                      <AiOutlineEye className="text-gray-500" size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-sm text-right">
                <Link
                  to="/forgot-password"
                  className="text-logoBlue font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-logoBlue text-white py-2 sm:py-3 rounded-md font-medium hover:bg-opacity-90 transition text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* OR separator */}
              <div className="flex items-center my-4 sm:my-5">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-3 sm:mx-4 text-gray-500 text-xs sm:text-sm">
                  Or
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Sign In with Google */}
              <div className="flex gap-3 sm:gap-4">
                <GoogleButton
                  endpoint="/google-auth-sign-in"
                  buttonName="Sign In With Google"
                  navigatePathSuccess="/seller-complete-profile"
                  navigatePathError="/seller-sign-up"
                />
              </div>

              {/* Sign-Up Link */}
              <p className="text-center text-xs sm:text-sm text-gray-700 mt-4 sm:mt-6">
                Don’t have an account?{" "}
                <Link
                  to="/seller-sign-up"
                  className="text-logoBlue font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Right Image Section */}
          <img
            src={customerSignupImg}
            alt="Modern House"
            className="md:w-full h-auto w-[70%] mx-auto md:col-span-3 md:row-auto row-start-1"
          />
        </div>
      </div>
    </>
  );
};

export default SellerLoginPage;