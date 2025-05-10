import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const Enquiry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    customer_id: "",
    property_id: "",
    seller_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Check login status and auto-fill form
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    const propertyId = location.pathname.split("/").pop();

    if (customerAuth && customerAuth.token) {
      // Fetch customer details
      const fetchCustomerData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          };
          const res = await axios.get(`${baseUrl}/customer-profile`, config);
          const user = res.data.user;
          console.log(user);

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
        }
      };
      fetchCustomerData();
    } else {
      setFormData((prev) => ({
        ...prev,
        property_id: propertyId,
      }));
    }
  }, [location]);

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
      case "date":
        return !value ? "Please select a date" : "";
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

    // Check if customer is logged in
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.warn("Please log in to submit an enquiry", {
        position: "top-left",
      });
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/customer-sign-in");
      setLoading(false);
      return;
    }

    // Validate form
    const newErrors = {};
    ["name", "email", "phone", "date"].forEach((field) => {
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
      // Validate property_id
      if (!formData.property_id) {
        throw new Error("Invalid property ID");
      }

      // Fetch sub-broker details from property
      const propertyId = formData.property_id;
      const propertyRes = await axios.get(
        `${baseUrl}/single-property/${propertyId}`
      );

      // Check if seller_id exists in the response
      if (!propertyRes.data || !propertyRes.data.seller_id) {
        throw new Error("Seller information not found for this property");
      }
      const sellerId = propertyRes.data.seller_id;

      // Prepare lead data
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: new Date(formData.date).toISOString(), // Ensure date is in ISO format
        message: formData.message,
        customer_id: formData.customer_id,
        property_id: formData.property_id,
        seller_id: sellerId,
        status: "pending",
      };

      // Submit lead
      const config = {
        headers: {
          Authorization: `Bearer ${customerAuth.token}`,
          "Content-Type": "application/json",
        },
      };
      console.log("Submitting lead to:", `${baseUrl}/add-leads`, leadData); // Debug log
      const result = await axios.post(`${baseUrl}/add-leads`, leadData, config);

      if (result.status === 201) {
        toast.success("Enquiry submitted successfully", {
          position: "top-left",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          message: "",
          customer_id: "",
          property_id: "",
          seller_id: "",
        });
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data, error.message); // Debug log
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

  return (
    <div className="rounded bg-logoBlue/5 shadow-[0_10px_40px_rgba(24,26,32,.05)] p-6 py-5 w-full h-fit sticky top-[150px]">
      <h3 className="text-[20px] font-semibold leading-[30px]">
        Contact Agency
      </h3>
      <p className="text-[14px] leading-[25.9px]">Choose your preferred day</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-3 rounded mt-4 border text-gray-500 border-gray-300 text-sm py-3 ${
            errors.date ? "border-red-500" : ""
          }`}
          required
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FaExclamationCircle className="mr-1" />
            {errors.date}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 rounded border border-gray-300 text-sm py-3 ${
            errors.name ? "border-red-500" : ""
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FaExclamationCircle className="mr-1" />
            {errors.name}
          </p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-3 rounded border border-gray-300 text-sm py-3 ${
            errors.phone ? "border-red-500" : ""
          }`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FaExclamationCircle className="mr-1" />
            {errors.phone}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 rounded border border-gray-300 text-sm py-3 ${
            errors.email ? "border-red-500" : ""
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FaExclamationCircle className="mr-1" />
            {errors.email}
          </p>
        )}

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 rounded border border-gray-300 text-sm py-3"
          placeholder="Your message"
        ></textarea>

        <button
          type="submit"
          className="bg-logoColor flex items-center justify-center gap-1 text-white px-[30px] py-[13px] rounded w-full text-[15px] font-semibold leading-[26px]"
          disabled={loading}
        >
          <span className="z-10 relative flex items-center justify-center gap-1">
            {loading ? "Submitting..." : "Submit a Tour Request"}
            {!loading && <GoArrowUpRight className="text-xl" />}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Enquiry;
