import React, { useState, useEffect } from "react"; // Added useEffect
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/global/GoogleButton";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // Check for customerAuth on mount and redirect if present
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (customerAuth && customerAuth.token) {
      navigate("/customer");
    }
  }, [navigate]); // Dependency array includes navigate to ensure stability

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const signInData = {
      identifier: formData.identifier,
      password: formData.password,
    };

    try {
      const result = await axios.post(
        `${baseUrl}/sign-in-customer`,
        signInData
      );
      setLoading(false);
      // Log response for debugging
      console.log("Login response:", result.data);
      // Save customerAuth to localStorage
      if (!result.data.token) {
        throw new Error("No token received from server");
      }
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
      // Verify customerAuth is saved
      console.log("customerAuth saved:", localStorage.getItem("customerAuth"));
      navigate("/customer");
    } catch (err) {
      setLoading(false);
      toast(err.message || err.response?.data?.message || "An error occurred", {
        position: "top-left",
        type: "error",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
          <div className="py-4 px-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800  ">
              Customer Login
            </h2>
          </div>

          <form className="p-6 space-y-4" onSubmit={submitHandler}>
            {/* Identifier Field (Email or Phone) */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Email or Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-1 focus:ring-logoColor outline-none p-2.5"
                  placeholder="example@gmail.com or 123-456-7890"
                  required
                  value={formData.identifier}
                  onChange={inputHandler}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-1"
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
                    <AiOutlineEyeInvisible className="text-gray-400" />
                  ) : (
                    <AiOutlineEye className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-sm">
              <Link
                to="/customer-forgot-password"
                className="text-logoColor hover:text-green-700 font-medium"
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
                "Sign In"
              )}
            </button>

            {/* Google Sign-In */}
            <GoogleButton
              endpoint="/google-auth-sign-in-customer"
              buttonName="Sign In With Google"
              navigatePathSuccess="/customer"
              navigatePathError="/customer-sign-up"
            />

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/customer-sign-up"
                className="text-blue-600 hover:text-[#64AE37] font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLogin;
