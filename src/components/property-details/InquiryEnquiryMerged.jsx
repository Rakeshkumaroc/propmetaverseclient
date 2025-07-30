
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa"; 
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_APP_URL;


const InquiryEnquiryMerged = () => {
  const navigater= useNavigate(); 
  const {pathname} = useLocation();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    customer_id: "",
    property_id: "",
    seller_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-fill data logic (same as Enquiry)
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    const propertyId = pathname.split("/").pop(); // Extracts property ID from the URL

    if (customerAuth?.token) {
      const fetchCustomerData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          };
          const res = await axios.get(`${baseUrl}/customer-profile`, config);
          const user = res.data.user;

          setFormData((prev) => ({
            ...prev,
            // Assuming 'name' in previous code was meant to be 'firstName' and 'lastName'
            // For auto-fill, if user has a fullName, we can try to split it or just fill firstName
            firstName: user.fullName ? user.fullName.split(" ")[0] : "",
            lastName: user.fullName
              ? user.fullName.split(" ").slice(1).join(" ")
              : "",
            email: user.email || "",
            phone: user.number || "",
            customer_id: user._id || "",
            property_id: propertyId,
          }));
        } catch (error) {
          // Display error using Swal (SweetAlert2)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch customer details",
            confirmButtonColor: "#1b639f",
          });
        }
      };
      fetchCustomerData();
    } else {
      // If not logged in, just set the property ID
      setFormData((prev) => ({
        ...prev,
        property_id: propertyId,
      }));
    }
  }, [pathname]);

  // Validation logic for form fields
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim().length < 2
          ? "First Name must be at least 2 characters long"
          : "";
      case "lastName":
        return value.trim().length < 2
          ? "Last Name must be at least 2 characters long"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "phone":
        return !/^\d{10}$/.test(value)
          ? "Please enter a valid 10-digit phone number"
          : "";
      default:
        return "";
    }
  };

  // Handles input changes and updates form data and errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth?.token) {
      await Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to submit an enquiry",
        confirmButtonColor: "#1b639f",
      });
      localStorage.setItem("redirectAfterLogin", pathname); // Store current path for redirection after login
      navigater("/customer-sign-in"); // Redirect to login page
      setLoading(false);
      return;
    }

    // Validate all required fields before submission
    const newErrors = {};
    ["firstName", "lastName", "email", "phone"].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      await Swal.fire({
        icon: "error",
        title: "Form Error",
        text: "Please fix the form errors",
        confirmButtonColor: "#1b639f",
      });
      setLoading(false);
      return;
    }

    try {
      if (!formData.property_id) throw new Error("Invalid property ID");

      // Fetch property details to get seller_id
      const propertyRes = await axios.get(
        `${baseUrl}/single-property/${formData.property_id}`
      );

      if (!propertyRes.data?.seller_id) {
        throw new Error("Seller information not found for this property");
      }
      const sellerId = propertyRes.data.seller_id;

      // Prepare lead data for submission
      const leadData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
        seller_id: sellerId,
        status: "pending", // Set initial status
      };

      const config = {
        headers: {
          Authorization: `Bearer ${customerAuth.token}`,
          "Content-Type": "application/json",
        },
      };

      // Submit the lead
      const result = await axios.post(`${baseUrl}/add-leads`, leadData, config);

      if (result.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Enquiry submitted successfully",
          confirmButtonColor: "#1b639f",
        });
        // Clear form data after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          customer_id: "",
          property_id: "",
          seller_id: "",
        });
        router.push("/thank-you"); // Redirect to a thank you page
      }
    } catch (error) {
      // Handle API errors
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to submit enquiry",
        confirmButtonColor: "#1b639f",
      });
    } finally {
      setLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-40 w-full">
      {/* LEFT SIDE TEXT */}
      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/3 flex flex-col mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[135px] text-start bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
          Inquire About Seaside Serenity Villa
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-[47px] 2xl:mb-[47px]">
          Interested in this property? Fill out the form below, and our real
          estate experts will get back to you with more details, including
          scheduling a viewing and answering any questions you may have.
        </p>
      </div>

      {/* FORM SIDE */}
      <form
        onSubmit={handleSubmit}
        // Responsive spacing between form elements and padding for the form container
        className="space-y-6 sm:space-y-8 lg:space-y-10 2xl:space-y-[41px] p-4 sm:p-6 md:p-8 2xl:p-[40px_35px] border border-gray-200 rounded-lg shadow-md  flex-1 mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[135px]" // Added border, rounded, and shadow
        noValidate
      >
        {/* First Name & Last Name inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 2xl:gap-16 gap-y-6 sm:gap-y-0">
          {" "}
          {/* Responsive gap and ensures stacking on very small screens */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName} // Use firstName here
              onChange={handleChange}
              // Responsive text size and border styling
              className={`w-full border-b pb-1 text-sm sm:text-base placeholder:text-[#252525] placeholder:font-[500] focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
                errors.firstName ? "border-red-500" : "border-black" // Use firstName for error check
              }`}
              required
            />
            {errors.firstName && ( // Use firstName for error display
              <p className="text-xs sm:text-sm text-red-600 flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName} // Use lastName here
              onChange={handleChange}
              // Responsive text size and border styling
              className={`w-full border-b pb-1 text-sm sm:text-base placeholder:text-[#252525] placeholder:font-[500] focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
                errors.lastName ? "border-red-500" : "border-black" // Use lastName for error check
              }`}
              required
            />
            {errors.lastName && ( // Use lastName for error display
              <p className="text-xs sm:text-sm text-red-600 flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 2xl:gap-16 gap-y-6 sm:gap-y-0">
          {" "}
          {/* Responsive gap and ensures stacking on very small screens */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              // Responsive text size and border styling
              className={`w-full border-b pb-1 text-sm sm:text-base placeholder:text-[#252525] placeholder:font-[500] focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              required
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-600 flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              // Responsive text size and border styling
              className={`w-full border-b pb-1 text-sm sm:text-base placeholder:text-[#252525] placeholder:font-[500] focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
                errors.phone ? "border-red-500" : "border-black"
              }`}
              required
            />
            {errors.phone && (
              <p className="text-xs sm:text-sm text-red-600 flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Message textarea */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          // Responsive padding, height, and rounded corners
          className="w-full px-3 py-2 sm:px-4 sm:py-3 h-24 sm:h-28 md:h-32 2xl:h-[122px] rounded-md border border-gray-300 bg-[#BAD6EB] focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-gray-700 resize-y" // Added resize-y
          placeholder="Your message"
        ></textarea>

        {/* Checkbox and Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-black cursor-pointer">
            <input
              type="checkbox"
              required
              className="mr-2 w-4 h-4 sm:w-4 sm:h-4 accent-logoBlue" // Added accent-logoBlue for checkbox color
            />
            I agree with{" "}
            <a
              href="#"
              className="underline ml-1 text-logoBlue hover:text-blue-700 transition-colors duration-200"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline ml-1 text-logoBlue hover:text-blue-700 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </label>
          <button
            type="submit"
            // Responsive padding and font size for the button
            className="bg-logoColor text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-md text-base sm:text-lg 2xl:text-[20px] transition-colors duration-200 hover:bg-logoColor/90 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Your Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryEnquiryMerged;
