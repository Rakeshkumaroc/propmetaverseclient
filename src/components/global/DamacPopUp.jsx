import React, { useState, useContext } from "react";
import { MdClose, MdArrowDownward } from "react-icons/md"; // Import the down arrow icon
import { MyContext } from "../../App";
const baseUrl = import.meta.env.VITE_APP_URL;

const DamacPopUp = () => {
  const { setDamacIsPopUpOpen } = useContext(MyContext);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    country: "",
    interestedIn: "",
    interestType: "",
    plannedWindow: "",
    budget: "",
	source: "", // Added new field for "Got to know about the event"
    acceptUpdates: false,
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetch(baseUrl + "/add-damac-enquiry", {
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
        gender: "",
        city: "",
        country: "",
        interestedIn: "",
        interestType: "",
        plannedWindow: "",
        budget: "",
        acceptUpdates: false,
      });
      setIsSubmitted(true);
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 1000);
  };

  // Function to scroll the form container down
  const scrollDown = () => {
    const formContainer = document.querySelector(".form-container");
    if (formContainer) {
      formContainer.scrollBy({
        top: 200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed flex items-center justify-center z-[52] top-0 bottom-0 left-0 right-0 backdrop-blur-xs bg-black/50 md:bg-black/30">
      <div className="md:py-16 px-6 md:px-16 md:w-[80vw] w-[100vw] text-center">
        <h2 className="text-lg md:text-2xl font-semibold text-logoColor uppercase border-b-2 border-gray-300 pb-2 inline-block">
          DAMAC Property Event
        </h2>

        <div className="max-w-4xl mx-auto mt-2 md:mt-4 relative bg-white text-gray-800 md:px-8 px-3 py-3 md:py-8 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-6">Registration Form</p>

          {/* Form */}
          <form onSubmit={handleSubmit} >
            <div className="form-container p-1 relative grid grid-cols-1  md:grid-cols-2 gap-3  md:h-auto max-h-[50vh] md:overflow-auto overflow-scroll">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              {/* Phone Number */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              {/* Gender */}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.gender ? "text-gray-800" : "text-gray-400"
                }`}
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {/* City */}
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* Country */}
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* new code  */}

              {/* Interested In */}
              <select
                name="interestedIn"
                value={formData.interestedIn}
                onChange={(e) =>
                  setFormData({ ...formData, interestedIn: e.target.value })
                }
                className={`md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.interestedIn ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>
                  Interested In
                </option>
                {["Residential", "Office", "Commercial"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Interest Type */}
              <select
                name="interestType"
                value={formData.interestType}
                onChange={(e) =>
                  setFormData({ ...formData, interestType: e.target.value })
                }
                className={`md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.interestType ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>
                  Interest Type
                </option>
                {["Investor", "Self Use", "Knowledge"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Planned Window */}
              <select
                name="plannedWindow"
                value={formData.plannedWindow}
                onChange={(e) =>
                  setFormData({ ...formData, plannedWindow: e.target.value })
                }
                className={`md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.plannedWindow ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>
                  Planned Window
                </option>
                {[
                  "within 30 days",
                  "within 30-60 days",
                  "within 60-90 days",
                  "beyond 90 days",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Budget (INR) */}
              <select
                name="budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className={`md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.budget ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>
                  Select Budget Range
                </option>
                {[
                  
                  "1.5cr to 2.5cr",
                  "2.5cr to 3.5cr",
                  "3.5cr and above",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>


	    {/* Updated "Got to know about the event" Select Box */}
              <select
                name="source"
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                className={`md:p-3 p-2 md:col-span-2 md:text-base text-sm rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 ${
                  formData.source ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>
                   How did you hear about the event?
                </option>
                {[
                  "Facebook Ad",
                  "Google Ad",
                  "Instagram Ad",
                  "Mohan - Home Enterprises",
                  "Naresh Bhai",
                  "Prop Metaverse Ad",
                  "Others",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>


              {/* Scroll Down Button (Visible only in mobile view) */}
            <div className="md:hidden flex justify-center mt-4 absolute bottom-0 right-1/2 translate-x-1/2">
              <button
                type="button"
                onClick={scrollDown}
                className="p-2 bg-logoColor text-white animate-bounce rounded-full shadow-lg hover:bg-logoColor/90 transition-all"
              >
                <MdArrowDownward className="text-2xl" />
              </button>
            </div>
            </div>

            

            <div className=" mt-5">
              <label className="flex items-start md:items-center text-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptUpdates}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptUpdates: e.target.checked,
                    })
                  }
                  className="mr-2 mt-2"
                />
                <span className="text-gray-700  ">
                  We would like to send product updates and promotions once
                  every 15 days *
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="relative w-full mt-5 bg-logoColor hover:bg-logoColor/90 cursor-pointer transition-all py-2 md:py-3 rounded-lg"
              >
                <div
                  className={`text-logoColor absolute text-nowrap  right-[50%] translate-x-[50%] transition-all duration-500   -top-8  text-lg font-bold ${
                    isSubmitted ? "black" : "hidden"
                  }`}
                >
                  Enquiry Submitted Successfully!
                </div>
                <span className="font-semibold text-white">Submit</span>
              </button>
            </div>
          </form>

          {/* Close Button */}
          <MdClose
            onClick={() => setDamacIsPopUpOpen(false)}
            className="text-2xl absolute cursor-pointer right-2 top-2 text-black border-2 border-black rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DamacPopUp;
