import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderText from "../HeaderText";
import { MyContext } from "../../App";
const baseUrl = import.meta.env.VITE_APP_URL;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const { enquiryRef } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    pincode: "",
    dob: "",
    message: "", // Renamed from workExperience for clarity
  });

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
    if (!formData.name.trim()) return "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!phoneRegex.test(formData.phone)) return "Invalid phone number (10-15 digits)";
    if (!formData.gender) return "Gender is required";
    if (!formData.city.trim()) return "City is required";
    if (!pincodeRegex.test(formData.pincode)) return "Invalid pincode (5-6 digits)";
    if (!formData.dob) return "Date of birth is required";
    if (!formData.message.trim()) return "Enquiry details are required";
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
    <div ref={enquiryRef} className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white text-center">
      <HeaderText title="Contact Us" />
      <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg">
        <p className="text-gray-300 mb-6">
          Fill in your details, and we'll get back to you as soon as possible.
        </p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          />
          <div className="col-span-1 md:col-span-2">
            <input
              id="dob-input"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
              required
            />
          </div>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enquiry Details"
            className="col-span-1 md:col-span-2 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`col-span-1 md:col-span-2 bg-logoColor hover:bg-logoColor/90 cursor-pointer transition-all py-3 rounded-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="font-semibold text-white">
              {isSubmitting ? "Submitting..." : "Submit"}
            </span>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;