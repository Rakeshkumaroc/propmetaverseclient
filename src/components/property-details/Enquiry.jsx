import { useContext, useState } from "react";
import { FaExclamationCircle} from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App"; 
const baseUrl = import.meta.env.VITE_APP_URL;

const Enquiry = () => {
  const navigate = useNavigate();
  const { siteName } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "", 
    enquiryType: "",
    message: "",
    siteName: "",
    purpose: "Schedule Tour",
  });

 

 
 
  const [errors, setErrors] = useState({});

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
    setFormData((prev) => ({ ...prev, [name]: value, siteName: siteName }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    const result = await fetch(baseUrl + "/add-enquiry", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (result.ok) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "", 
        enquiryType: "",
        message: "",
      });
    
      navigate("/thank-you");
    }
  };

  return (
    <div className="rounded bg-logoBlue/5 shadow-[0_10px_40px_rgba(24,26,32,.05)] p-6 py-5  w-full h-fit sticky top-[150px]  ">
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
          className="w-full px-3 rounded mt-4 border text-gray-500 border-gray-300 text-sm py-3"
          required
        />

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
          className="bg-logoColor  flex items-center justify-center gap-1 text-white px-[30px] py-[13px] rounded w-full text-[15px] font-semibold leading-[26px]  "
        >

          <span className=" z-10 relative flex items-center justify-center gap-1">
            Submit a Tour Request
            <GoArrowUpRight className="text-xl" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Enquiry;
