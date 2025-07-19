import { useState } from "react";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
const ContactForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    message: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (name === "phone" && value.trim()) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "" };

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Phone validation (required and must be digits only, 7-15 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 7-15 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // API call
        const response = await fetch(`${baseUrl}/add-enquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Show success SweetAlert
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your enquiry has been submitted successfully.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1865a4",
          });

          // Reset form
          setFormData({
            name: "",
            city: "",
            phone: "",
            email: "",
            message: "",
          });
          setErrors({ name: "", phone: "" });
        } else {
          // Show error SweetAlert
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to submit the form. Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1865a4",
          });
        }
      } catch (error) {
        // Handle network or other errors
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "API error:" || error,
          confirmButtonText: "OK",
          confirmButtonColor: "#1865a4",
        }); 
      }
    } else {
      // Show validation error SweetAlert
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
    <section className="w-full md:py-12 px-4 sm:px-6 overflow-hidden md:px-20 mx-auto max-w-[1920px] mb-[93px]">
      <h2 className="text-2xl sm:text-3xl md:text-[38px] text-logoBlue mb-[65px]">
        Contact Us
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-[109px] md:grid-cols-2 sm:gap-[50px] gap-[40px] md:gap-[60px] lg:gap-[75px]">
          <div>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              className={`border-b-[1px] border-black uppercase placeholder:text-[#091F5B] placeholder:font-[600] w-full focus:outline-none focus:ring-2 focus:ring-transparent ${
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
            className="border-b-[1px] border-black uppercase placeholder:text-[#091F5B] placeholder:font-[600] w-full focus:outline-none focus:ring-2 focus:ring-transparent"
          />

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone No."
              value={formData.phone}
              onChange={handleChange}
              className={`border-b-[1px] border-black uppercase placeholder:text-[#091F5B] placeholder:font-[600] w-full focus:outline-none focus:ring-2 focus:ring-transparent ${
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
            className="border-b-[1px] row-start-3 border-black uppercase placeholder:text-[#091F5B] placeholder:font-[600] w-full focus:outline-none focus:ring-2 focus:ring-transparent"
          />

          <textarea
            name="message"
            placeholder="Enquiry details..."
            value={formData.message}
            onChange={handleChange}
            className="border-[#091F5B] border-[1px] rounded-[10px] p-3 uppercase placeholder:text-[#091F5B] placeholder:font-[600] row-span-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-[101px] gap-4">
          <button
            type="submit"
            className="bg-logoColor w-full hover:bg-logoColor/90 text-white px-8 py-3 rounded-[8px] font-medium transition-colors"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
