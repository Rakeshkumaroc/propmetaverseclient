import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;
const CustomerResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleResetPassword = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .patch(`${baseUrl}/customer-reset-password/${token}`, { password })
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast(res.data.message, {
          position: "top-left",
          type: "success",
        });
        Navigate("/customer-sign-in");
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
  //await
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Reset Password
          </h2>
        </div>

        <form onSubmit={handleResetPassword} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password <span className="text-red-500">*</span>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          <button
            type="submit"
            className="w-full bg-logoColor text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
              </div>
            ) : (
              " Reset Password"
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

export default CustomerResetPassword;
