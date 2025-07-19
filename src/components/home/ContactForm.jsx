import { useState } from "react";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const ContactForm = () => {
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
    <section className="w-full md:py-50 px-4 sm:px-6 md:px-75 mx-auto max-w-[1920px] mb-[49px]">
      <div>
        <h2 className="text-[28px] md:text-[48px] font-semibold text-logoBlue mb-5 leading-tight">
          Let's Contact
        </h2>
        <p className="mb-10 text-[18px] md:text[24px]">
          We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Propmetaverse. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.
        </p>
      </div>

      <form
        className="bg-white border-1 border-[#262626] rounded-2xl px-6 md:px-18 py-8 md:py-28"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <input
              type="text"
              name="name"
              placeholder="FULL NAME"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-sm md:text-base py-2 focus:outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <input
            type="text"
            name="city"
            placeholder="CITY"
            value={formData.city}
            onChange={handleChange}
            className="w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-sm md:text-base py-2 focus:outline-none"
          />

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone No."
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-sm md:text-base py-2 focus:outline-none ${
                errors.phone ? "border-red-500" : ""
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <input
            type="email"
            name="email"
            placeholder="E-MAIL"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-black placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-sm md:text-base py-2 focus:outline-none"
          />

          <textarea
            name="message"
            placeholder="Enter Your Message...."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="md:col-span-2 w-full border border-[#091F5B] rounded-[10px] p-3 placeholder:uppercase placeholder:text-[#091F5B] placeholder:font-semibold text-sm md:text-base focus:outline-none resize-none bg-[#BAD6EB]"
          />
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="md:h-5 md:w-5"
              required
            />
            <span className="md:text-[20px] text-[14px] text-black">
              I agree with Terms of Use and Privacy Policy
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#65b137] text-white text-sm md:text-base font-medium rounded-lg py-3 px-6 tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!checked || loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
