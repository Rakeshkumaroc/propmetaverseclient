import { useEffect, useState } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const EnquiryPopup = ({ isOpen, setIsOpen, propertyId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    customer_id: "",
    property_id: propertyId || "",
    seller_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-fill form with customer data
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (customerAuth && customerAuth.token) {
      const fetchCustomerData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          };
          const res = await axios.get(`${baseUrl}/customer-profile`, config);
          const user = res.data.user;

          setFormData((prev) => ({
            ...prev,
            name: user.fullName || "",
            email: user.email || "",
            phone: user.number || "",
            customer_id: user._id || "",
            property_id: propertyId,
          }));
        } catch (error) {
          toast.error("Failed to fetch customer details", {
            position: "top-left",
          });
          console.log("Failed to fetch customer details");
        }
      };
      fetchCustomerData();
    } else {
      setFormData((prev) => ({
        ...prev,
        property_id: propertyId,
      }));
    }
  }, [propertyId]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "phone":
        return !/^\d{10}$/.test(value)
          ? "Please enter a valid 10-digit phone number"
          : "";
      case "name":
        return value.length < 2
          ? "Name must be at least 2 characters long"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.warn("Please log in to submit an enquiry", {
        position: "top-left",
      });
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/customer-sign-in");
      setLoading(false);
      return;
    }

    const newErrors = {};
    ["name", "email", "phone"].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the form errors", { position: "top-left" });
      setLoading(false);
      return;
    }

    try {
      if (!formData.property_id) {
        throw new Error("Invalid property ID");
      }

      const propertyId = formData.property_id;
      const propertyRes = await axios.get(
        `${baseUrl}/single-property/${propertyId}`
      );

      if (!propertyRes.data || !propertyRes.data.seller_id) {
        throw new Error("Seller information not found for this property");
      }
      const sellerId = propertyRes.data.seller_id;

      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        customer_id: formData.customer_id,
        property_id: formData.property_id,
        seller_id: sellerId,
        status: "pending",
      };

      const config = {
        headers: {
          Authorization: `Bearer ${customerAuth.token}`,
          "Content-Type": "application/json",
        },
      };
      const result = await axios.post(`${baseUrl}/add-leads`, leadData, config);

      if (result.status === 201) {
        toast.success("Enquiry submitted successfully", {
          position: "top-left",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          customer_id: "",
          property_id: "",
          seller_id: "",
        });
        setIsOpen(false);
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data, error.message);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit enquiry",
        { position: "top-left" }
      );
    } finally {
      setLoading(false);
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 transition-opacity duration-300">
      <div
        className="bg-white rounded shadow-2xl p-8 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 hover:scale-[1.02] border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-125 hover:rotate-90"
          aria-label="Close modal"
        >
          <FaTimes size={22} />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans">
          Get in Touch
        </h3>
        <p className="text-sm text-gray-500 mb-6 font-sans">
          Schedule a tour or ask about this property
        </p>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border border-gray-200 bg-gray-50 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-400 ${
                errors.name ? "border-red-500" : "hover:border-blue-400"
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center font-sans">
                <FaExclamationCircle className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border border-gray-200 bg-gray-50 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-400 ${
                errors.phone ? "border-red-500" : "hover:border-blue-400"
              }`}
              required
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center font-sans">
                <FaExclamationCircle className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border border-gray-200 bg-gray-50 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-400 ${
                errors.email ? "border-red-500" : "hover:border-blue-400"
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center font-sans">
                <FaExclamationCircle className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded border border-gray-200 bg-gray-50 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-blue-400"
              placeholder="Your Message"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
          className="bg-logoColor flex items-center justify-center gap-1 text-white px-[30px] py-[13px] rounded w-full text-[15px] font-semibold leading-[26px]"

            disabled={loading}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? "Submitting..." : "Submit Enquiry"}
              {!loading && <GoArrowUpRight className="text-xl" />}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup;