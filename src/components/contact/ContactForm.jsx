import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = import.meta.env.VITE_APP_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    pincode: "",
    dob: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic client-side validation
  const validateForm = () => {
    const phoneRegex = /^\+?\d{10,15}$/;
    const pincodeRegex = /^\d{5,6}$/;
    if (!formData.name.trim()) return "Full name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!phoneRegex.test(formData.phone)) return "Invalid phone number (10-15 digits)";
    if (!formData.gender) return "Gender is required";
    if (!formData.city.trim()) return "City is required";
    if (!pincodeRegex.test(formData.pincode)) return "Invalid pincode (5-6 digits)";
    if (!formData.dob) return "Date of birth is required";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/add-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          city: "",
          pincode: "",
          dob: "",
          message: "",
        });
        toast.success("Enquiry submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(result.error || "Failed to submit enquiry");
      }
    } catch (error) {
      toast.error("Network error, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
        Get in Touch
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Discover luxury and exclusive listings tailored for international clients with our premier real estate services.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoColor"
            required
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="border border-gray-300 p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-logoColor"
          required
        ></textarea>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-logoColor hover:bg-logoColor/90 text-white px-8 py-3 rounded font-medium transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;