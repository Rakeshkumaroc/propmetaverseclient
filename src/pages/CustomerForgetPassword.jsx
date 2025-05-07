import { useState } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;
const CustomerForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleForgotPassword = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post(`${baseUrl}/customer-forget-password`, { email })
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast(res.data.message, {
          position: "top-left",
          type: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        toast(err.response.data.message, {
          position: "top-left",
          type: "error",
        });

        if (err.response?.data?.redirect) {
          Navigate(err.response.data.redirect);
        }
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={handleForgotPassword} className="p-6 space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-logoColor text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
              </div>
            ) : (
              " Send Reset Link"
            )}
          </button>

          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/customer-sign-in"
              className="text-blue-600 hover:text-[#64AE37] font-medium"
            >
              Go to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForgetPassword;
