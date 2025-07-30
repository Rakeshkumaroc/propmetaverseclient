 
import Swal from "sweetalert2";
import { MyContext } from "../../App";
import { useContext, useState } from "react";
const baseUrl = import.meta.env.VITE_APP_URL;

const ContactForm = () => {
 const { enquiryRef } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    message: "",
  });
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (name === "phone" && value.trim()) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const trimmedPhone = formData.phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // start loader

      try {
        const response = await fetch(`${baseUrl}/add-enquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your enquiry has been submitted successfully.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1865a4",
          });

          setFormData({
            name: "",
            city: "",
            phone: "",
            email: "",
            message: "",
          });
          setErrors({ name: "", phone: "" });
          setChecked(false);
        } else {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to submit the form. Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1865a4",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "API error occurred.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1865a4",
        });
      } finally {
        setLoading(false); // stop loader
      }
    } else {
      await Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill out all required fields correctly.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1865a4",
      });
    }
  };

  return (
    // Section container: Adjusted padding and margin for responsiveness
    // 2xl:mb-20 and 2xl:px-75 are preserved for desktop size
    <section
      ref={enquiryRef}
      className="w-full mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-20 2xl:mb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-[75px] mx-auto max-w-[1920px]"
    >
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
          Let's Contact
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-[47px] 2xl:mb-[47px]">
          We're excited to connect with you and learn more about your real
          estate goals. Use the form below to get in touch with Propmetaverse.
          Whether you're a prospective client, partner, or simply curious about
          our services, we're here to answer your questions and provide the
          assistance you need.
        </p>
      </div>

      <form
        // Form container: Adjusted padding and border radius for responsiveness
        // 2xl:px-18 and 2xl:py-28 are preserved for desktop size
        className="bg-white border border-[#262626] rounded-xl sm:rounded-2xl 2xl:rounded-2xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-18 2xl:px-18 py-6 sm:py-10 md:py-16 lg:py-24 xl:py-28 2xl:py-28"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-10 2xl:gap-x-10 gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-8 xl:gap-y-8 2xl:gap-y-8">
          <div>
            <input
              type="text"
              name="name"
              placeholder="FULL NAME"
              value={formData.name}
              onChange={handleChange}
              // Input field styling: Adjusted font size and padding for responsiveness
              // 2xl:text-base and 2xl:py-2 are preserved for desktop size
              className={`w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-xs sm:text-sm py-2 focus:outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <input
            type="text"
            name="city"
            placeholder="CITY"
            value={formData.city}
            onChange={handleChange}
            // Input field styling: Adjusted font size and padding for responsiveness
            // 2xl:text-base and 2xl:py-2 are preserved for desktop size
            className="w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-xs sm:text-sm py-2 focus:outline-none"
          />

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone No."
              value={formData.phone}
              onChange={handleChange}
              // Input field styling: Adjusted font size and padding for responsiveness
              // 2xl:text-base and 2xl:py-2 are preserved for desktop size
              className={`w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-xs sm:text-sm py-2 focus:outline-none ${
                errors.phone ? "border-red-500" : ""
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <input
            type="email"
            name="email"
            placeholder="E-MAIL"
            value={formData.email}
            onChange={handleChange}
            // Input field styling: Adjusted font size and padding for responsiveness
            // 2xl:text-base and 2xl:py-2 are preserved for desktop size
            className="w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-xs sm:text-sm py-2 focus:outline-none"
          />

          <textarea
            name="message"
            placeholder="Enter Your Message...."
            value={formData.message}
            onChange={handleChange}
            rows={3}
            // Textarea styling: Adjusted font size and padding for responsiveness
            // 2xl:text-base and 2xl:p-3 are preserved for desktop size
            className="md:col-span-2 w-full border border-[#091F5B] rounded-md sm:rounded-lg 2xl:rounded-[10px] p-2 sm:p-3 md:p-3 lg:p-3 xl:p-3 2xl:p-3 placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-xs sm:text-sm focus:outline-none resize-none bg-[#BAD6EB]"
          />
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-10 xl:mt-10 2xl:mt-10 flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-4 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-0">
          <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              // Checkbox size: Adjusted for responsiveness
              // 2xl:h-5 and 2xl:w-5 are preserved for desktop size
              className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-5 xl:w-5 2xl:h-5 2xl:w-5"
              required
            />
            {/* Checkbox text: Adjusted font size for responsiveness */}
            {/* 2xl:text-[20px] is preserved for desktop size */}
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] 2xl:text-[20px] text-black">
              I agree with Terms of Use and Privacy Policy
            </span>
          </div>

          <button
            type="submit"
            // Button styling: Adjusted font size and padding for responsiveness
            // 2xl:text-base, 2xl:py-3, 2xl:px-6 are preserved for desktop size
            className="bg-[#65b137] text-white text-xs sm:text-sm font-medium rounded-lg py-2.5 sm:py-2.5 md:py-3 lg:py-3 xl:py-3 2xl:py-3 px-5 sm:px-5 md:px-6 lg:px-6 xl:px-6 2xl:px-6 tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!checked || loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-5 xl:w-5 2xl:h-5 2xl:w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Your Message"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
