import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_APP_URL;

const AdminLogin = ({ setIsAdmin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // State for API error message

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };
    if (name === "email" && !validateEmail(value)) {
      newErrors.email = "Invalid email format";
    } else if (name === "email") {
      delete newErrors.email;
    }

    setErrors(newErrors);
    setApiError(""); // Clear API error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(1);

    try {
      const result = await fetch(baseUrl + "/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        setIsAdmin(true);
        const data = await result.json();
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(0);
        navigate("/admin");

        setFormData({
          email: "",
          password: "",
        });
      } else {
        setLoading(0);
        setApiError("Invalid email or password"); // Set API error
      }
    } catch (error) {
      setLoading(0);
      setApiError("An error occurred. Please try again."); // Handle network errors
    }
  };

  return (
    <div className="cursor-pointer min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="login-child-div w-full max-w-md p-6 z-10 bg-white rounded-2xl relative shadow-2xl transform transition-all duration-300 ease-in-out">
        <h2 className="text-lg font-semibold leading-[27px] text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3  md:min-h-[3.75rem] min-h-[3.5rem] py-2 md:py-3  border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="email@example.com"
              required
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3  md:min-h-[3.75rem] min-h-[3.5rem] py-2 md:py-3  border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black border-gray-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Display API Error */}
          {apiError && (
            <p className="text-sm text-red-600 text-center">{apiError}</p>
          )}


         




          <button
           type="submit"
           disabled={loading || Object.keys(errors).length > 0}
           className="relative z-[2] text-white   overflow-hidden text-base leading-[1.1] font-bold font-secondary tracking-wide uppercase [transition:all_0.3s_linear] inline-flex items-center justify-center gap-3 md:min-h-[3.75rem] min-h-[3.5rem] py-2 md:py-3 px-6 md:px-7  transition-colors ease-in-out ring-offset-logoColor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-logoColor after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-black/[.15] after:-z-1 after:[transition:all_.3s_ease-in-out] hover:text-white hover:after:w-full hover:after:left-0 rounded-[5px] w-full"
        
        >
        {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span className="ml-2 z-10 relative">Loading...</span>
              </div>
            ) : (
              <span className="z-10 relative">Sign In</span>
            )}
        </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
