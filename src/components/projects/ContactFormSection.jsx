import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2
const baseUrl = import.meta.env.VITE_APP_URL;
const ContactFormSection = () => {
  // State to track focus and value for each input field
  const [formState, setFormState] = useState({
    firstName: { isFocused: false, value: "" },
    lastName: { isFocused: false, value: "" },
    email: { isFocused: false, value: "" },
    phone: { isFocused: false, value: "" },
    contactPhone: { isFocused: false, value: "" },
    contactEmail: { isFocused: false, value: "" },
    preferredLocation: { value: "" },
    propertyType: { value: "" },
    bathrooms: { value: "" },
    bedrooms: { value: "" },
    budget: { value: "" },
    message: { value: "" },
    agreeTerms: { value: false },
  });

  // Base URL for the API (replace with your actual API endpoint)

  // Handle focus event
  const handleFocus = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], isFocused: true },
    }));
  };

  // Handle blur event
  const handleBlur = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], isFocused: prev[field].value !== "" },
    }));
  };

  // Handle change event for inputs and textarea
  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  // Handle change event for select elements
  const handleSelectChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { value },
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setFormState((prev) => ({
      ...prev,
      agreeTerms: { value: !prev.agreeTerms.value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms are agreed
    if (!formState.agreeTerms.value) {
      await Swal.fire({
        icon: "warning",
        title: "Terms Not Agreed",
        text: "Please agree to the Terms of Use and Privacy Policy.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1865a4",
      });
      return;
    }

    // Prepare form data for API
    const formData = {
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      email: formState.email.value,
      phone: formState.phone.value,
      contactPhone: formState.contactPhone.value,
      contactEmail: formState.contactEmail.value,
      preferredLocation: formState.preferredLocation.value,
      propertyType: formState.propertyType.value,
      bathrooms: formState.bathrooms.value,
      bedrooms: formState.bedrooms.value,
      budget: formState.budget.value,
      message: formState.message.value,
    };

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

        // Reset form after successful submission
        setFormState({
          firstName: { isFocused: false, value: "" },
          lastName: { isFocused: false, value: "" },
          email: { isFocused: false, value: "" },
          phone: { isFocused: false, value: "" },
          contactPhone: { isFocused: false, value: "" },
          contactEmail: { isFocused: false, value: "" },
          preferredLocation: { value: "" },
          propertyType: { value: "" },
          bathrooms: { value: "" },
          bedrooms: { value: "" },
          budget: { value: "" },
          message: { value: "" },
          agreeTerms: { value: false },
        });
      } else {
        // Handle API error
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an issue submitting your enquiry. Please try again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1865a4",
        });
      }
    } catch (error) {
      // Handle network or other errors
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1865a4",
      });
    }
  };

  return (
    <section className="w-full px-2 sm:px-4 md:px-10 lg:px-24 py-8 sm:py-10 md:py-12 bg-white mb-[93px] sm:mb-[60px]">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-[60px]">
        <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-bold text-logoBlue mb-2 sm:mb-4">
          Let’s Make it Happen
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-black font-medium leading-[150%] max-w-3xl">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don’t wait; let’s embark on this exciting journey
          together.
        </p>
      </div>

      {/* Form Box */}
      <div className="border border-black/30 rounded-xl p-3 sm:p-4 md:p-6 lg:p-[40px]">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-[30px]">
          {/* Top 4 Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative">
              <label
                className={`absolute left-0 text-logoBlue font-semibold transition-all duration-200 ease-in-out ${
                  formState.firstName.isFocused || formState.firstName.value
                    ? "top-[-20px] text-xs sm:text-sm md:text-sm"
                    : "top-0 text-xs sm:text-sm md:text-base"
                }`}
              >
                First Name
              </label>
              <input
                type="text"
                placeholder={
                  formState.firstName.isFocused || formState.firstName.value
                    ? ""
                    : ""
                }
                value={formState.firstName.value}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onFocus={() => handleFocus("firstName")}
                onBlur={() => handleBlur("firstName")}
                className="w-full border-b border-black focus:outline-none pb-1 text-xs sm:text-sm md:text-base placeholder:text-[#091F5B] placeholder:font-[600]"
              />
            </div>
            <div className="relative">
              <label
                className={`absolute left-0 text-logoBlue font-semibold transition-all duration-200 ease-in-out ${
                  formState.lastName.isFocused || formState.lastName.value
                    ? "top-[-20px] text-xs sm:text-sm md:text-sm"
                    : "top-0 text-xs sm:text-sm md:text-base"
                }`}
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder={
                  formState.lastName.isFocused || formState.lastName.value
                    ? ""
                    : ""
                }
                value={formState.lastName.value}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onFocus={() => handleFocus("lastName")}
                onBlur={() => handleBlur("lastName")}
                className="w-full border-b border-black focus:outline-none pb-1 text-xs sm:text-sm md:text-base placeholder:text-[#091F5B] placeholder:font-[600]"
              />
            </div>
            <div className="relative">
              <label
                className={`absolute left-0 text-logoBlue font-semibold transition-all duration-200 ease-in-out ${
                  formState.email.isFocused || formState.email.value
                    ? "top-[-20px] text-xs sm:text-sm md:text-sm"
                    : "top-0 text-xs sm:text-sm md:text-base"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder={
                  formState.email.isFocused || formState.email.value ? "" : ""
                }
                value={formState.email.value}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className="w-full border-b border-black focus:outline-none pb-1 text-xs sm:text-sm md:text-base placeholder:text-[#091F5B] placeholder:font-[600]"
              />
            </div>
            <div className="relative">
              <label
                className={`absolute left-0 text-logoBlue font-semibold transition-all duration-200 ease-in-out ${
                  formState.phone.isFocused || formState.phone.value
                    ? "top-[-20px] text-xs sm:text-sm md:text-sm"
                    : "top-0 text-xs sm:text-sm md:text-base"
                }`}
              >
                Phone
              </label>
              <input
                type="tel"
                placeholder={
                  formState.phone.isFocused || formState.phone.value ? "" : ""
                }
                value={formState.phone.value}
                onChange={(e) => handleChange("phone", e.target.value)}
                onFocus={() => handleFocus("phone")}
                onBlur={() => handleBlur("phone")}
                className="w-full border-b border-black focus:outline-none pb-1 text-xs sm:text-sm md:text-base placeholder:text-[#091F5B] placeholder:font-[600]"
              />
            </div>
          </div>

          {/* Dropdowns and Contact Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                Preferred Location
              </label>
              <select
                value={formState.preferredLocation.value}
                onChange={(e) =>
                  handleSelectChange("preferredLocation", e.target.value)
                }
                className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] text-xs sm:text-sm md:text-base"
              >
                <option value="">Select Location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                Property Type
              </label>
              <select
                value={formState.propertyType.value}
                onChange={(e) =>
                  handleSelectChange("propertyType", e.target.value)
                }
                className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] text-xs sm:text-sm md:text-base"
              >
                <option value="">Select Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                No. of Bathrooms
              </label>
              <select
                value={formState.bathrooms.value}
                onChange={(e) =>
                  handleSelectChange("bathrooms", e.target.value)
                }
                className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] text-xs sm:text-sm md:text-base"
              >
                <option value="">Select no. of Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                No. of Bedrooms
              </label>
              <select
                value={formState.bedrooms.value}
                onChange={(e) => handleSelectChange("bedrooms", e.target.value)}
                className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] text-xs sm:text-sm md:text-base"
              >
                <option value="">Select no. of Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                Budget
              </label>
              <select
                value={formState.budget.value}
                onChange={(e) => handleSelectChange("budget", e.target.value)}
                className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] text-xs sm:text-sm md:text-base"
              >
                <option value="">Select Budget</option>
                <option value="100000-200000">$100,000 - $200,000</option>
                <option value="200000-300000">$200,000 - $300,000</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                Preferred Contact Method
              </label>
              <div className="flex items-center bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.75 3.75C1.75 2.36929 2.86929 1.25 4.25 1.25H5.39302C6.11 1.25 6.73498 1.73796 6.90887 2.43354L7.83037 6.11952C7.98284 6.72942 7.75495 7.37129 7.25202 7.74849L6.174 8.557C6.06206 8.64096 6.03772 8.7639 6.06917 8.84974C7.01542 11.4329 9.0671 13.4846 11.6503 14.4308C11.7361 14.4623 11.859 14.4379 11.943 14.326L12.7515 13.248C13.1287 12.7451 13.7706 12.5172 14.3805 12.6696L18.0665 13.5911C18.762 13.765 19.25 14.39 19.25 15.107V16.25C19.25 17.6307 18.1307 18.75 16.75 18.75H14.875C7.62626 18.75 1.75 12.8737 1.75 5.625V3.75Z"
                    fill="black"
                  />
                </svg>
                <input
                  type="tel"
                  placeholder="Enter Your Number"
                  value={formState.contactPhone.value}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                  onFocus={() => handleFocus("contactPhone")}
                  onBlur={() => handleBlur("contactPhone")}
                  className="bg-transparent w-full focus:outline-none text-xs sm:text-sm md:text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
                Preferred Email ID
              </label>
              <div className="flex items-center bg-[#BAD6EB] border border-black/30 rounded-md p-[8px_12px] sm:p-[12px_16px] md:p-[16px_20px] gap-2">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-black" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={formState.contactEmail.value}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  onFocus={() => handleFocus("contactEmail")}
                  onBlur={() => handleBlur("contactEmail")}
                  className="bg-transparent w-full focus:outline-none text-xs sm:text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm md:text-sm font-semibold text-logoBlue mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Enter your Message here.."
              value={formState.message.value}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full bg-[#BAD6EB] border border-black/30 rounded-md p-2 sm:p-3 md:p-3 focus:outline-none text-xs sm:text-sm md:text-base"
            ></textarea>
          </div>

          {/* Terms and Submit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-black">
              <input
                type="checkbox"
                checked={formState.agreeTerms.value}
                onChange={handleCheckboxChange}
                className="mr-2 w-4 h-4 sm:w-4 sm:h-4"
              />
              I agree with{" "}
              <a href="#" className="underline ml-1 text-logoBlue">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline ml-1 text-logoBlue">
                Privacy Policy
              </a>
            </label>
            <button
              type="submit"
              className="bg-logoColor text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-sm md:text-base"
            >
              Send Your Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
