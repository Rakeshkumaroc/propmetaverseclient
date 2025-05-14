import React, { useState, useEffect } from "react"; // Added useEffect
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleButton from "../components/global/GoogleButton";
import { toast } from "react-toastify";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Changed Navigate to navigate
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Check for customerAuth on mount and redirect if present
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (customerAuth && customerAuth.token) {
      navigate("/customer");
    }
  }, [navigate]); // Dependency array includes navigate

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setLoading(false);
      toast("Please fill all required fields", {
        position: "top-left",
        type: "error",
      });
      return;
    }

    const signUpData = {
      fullName: formData.fullName,
      email: formData.email,
      number: formData.phone, // Changed phone to number to match backend schema
      password: formData.password,
    };

    axios
      .post(`${baseUrl}/sign-up-customer`, signUpData)
      .then((result) => {
        setLoading(false);
        // Save customerAuth to localStorage
        localStorage.setItem(
          "customerAuth",
          JSON.stringify({
            token: result.data.token,
            user: result.data.user,
          })
        );
        toast(result.data.message, {
          position: "top-left",
          type: "success",
        });
        navigate("/customer-sign-in");
        console.log("Sign-up response:", result.data);
      })
      .catch((err) => {
        setLoading(false);
        toast(err.response?.data?.message || "An error occurred", {
          position: "top-left",
          type: "error",
        });
        console.error("Sign-up error:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
          <div className="py-4 px-6">
            <h2 className="text-2xl font-semibold text-center ">
              Customer Sign Up
            </h2>
          </div>
          <form className="p-6 space-y-2" onSubmit={submitHandler}>
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
                  className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor"
                  onChange={inputHandler}
                  name="fullName"
                  value={formData.fullName}
                />
              </div>
            </div>

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-black-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  placeholder="123-456-7890"
                  className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-logoColor"
                  name="phone"
                  value={formData.phone}
                  onChange={inputHandler}
                />
              </div>
            </div>

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

            {/* Submit Button */}
            <div>
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

            {/* Google Sign-Up */}
            <GoogleButton
              endpoint="/google-auth-sign-up-customer"
              buttonName="Sign Up With Google"
              navigatePathSuccess="/customer-sign-in"
              navigatePathError="/customer-sign-in"
            />

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/customer-sign-in"
                className="text-blue-600 hover:text-[#64AE37] font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerSignUp;
