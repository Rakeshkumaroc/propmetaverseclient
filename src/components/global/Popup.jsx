import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { MyContext } from "../../App";
const baseUrl = import.meta.env.VITE_APP_URL;

const Popup = () => {
  const { setIsPopUpOpen } = useContext(MyContext);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    pincode: "",
    dob: "",
    workExperience: "",
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
        gender: "",
        city: "",
        pincode: "",
        dob: "",
        workExperience: "",
      });
      setIsSubmitted(true);
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 1000);
  };

  return (
    <div className="fixed flex items-center justify-center z-[51] top-0 bottom-0 left-0 right-0 backdrop-blur-xs bg-black/50 md:bg-black/30">
      <div className="md:py-16 px-6 md:px-16 md:w-[80vw] w-[100vw] text-center">
        <h2 className="text-lg md:text-2xl font-semibold text-logoColor uppercase border-b-2 border-gray-300 pb-2 inline-block">
          Women Empowered @ Prop Metaverse
        </h2>

        <div className="max-w-4xl mx-auto mt-2 md:mt-4 relative bg-white text-gray-800 md:px-8 px-4 py-4 md:py-8 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-6">Registration Form</p>

          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
            onSubmit={handleSubmit}
          >
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
              className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
               
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
            {/* Pincode */}
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
               
            />
            {/* Date of Birth */}
            <div
              className="relative focus:ring-2 focus:ring-logoColor md:p-3 p-2 md:text-base text-sm col-span-1 md:col-span-2 flex gap-5 items-center rounded-lg bg-gray-100 text-gray-800 cursor-pointer"
              onClick={() => document.getElementById("dob-input").showPicker()}
            >
              <label htmlFor="dob-input" className="text-gray-400 text-nowrap">
                Date of Birth
              </label>
              <input
                id="dob-input"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                 
              />
            </div>

            {/* Work Experience */}
            <textarea
              name="workExperience"
              
              placeholder="Work Experience Details"
              value={formData.workExperience}
              onChange={handleChange}
              className="col-span-1 md:col-span-2 h-10 md:h-20 md:p-3 p-2 md:text-base text-sm rounded-lg bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
               
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative col-span-1 md:col-span-2 bg-logoColor hover:bg-logoColor/90 cursor-pointer transition-all py-2 md:py-3 rounded-lg"
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
          </form>

          {/* Close Button */}
          <MdClose
            onClick={() => setIsPopUpOpen(false)}
            className="text-2xl absolute cursor-pointer right-2 top-2 text-black border-2 border-black rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
