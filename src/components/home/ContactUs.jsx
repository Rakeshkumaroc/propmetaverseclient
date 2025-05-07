import React, { useContext, useState } from "react";
import HeaderText from "../HeaderText";
import { MyContext } from "../../App";
const baseUrl = import.meta.env.VITE_APP_URL;

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
  const { enquiryRef } = useContext(MyContext);
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
    <div ref={enquiryRef} className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white text-center">
      <HeaderText title={"Contact Us"} />

      <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg">
        <p className="text-gray-300 mb-6">
          Fill in your details, and we'll get back to you as soon as possible.
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
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
          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Date of Birth */}
          <div
            className="relative p-3 col-span-1 md:col-span-2 flex gap-5 items-center rounded-lg bg-gray-800 text-white"
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
              required
            />
          </div>

          <textarea
            name="workExperience"
            rows="4"
            value={formData.workExperience}
            onChange={handleChange}
            placeholder="Enquiry Details"
            className="col-span-1 md:col-span-2 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-logoColor"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative col-span-1 md:col-span-2 bg-logoColor hover:bg-logoColor/90 cursor-pointer transition-all py-3 rounded-lg"
          >
            <div
              className={`text-logoColor absolute text-nowrap right-[50%] translate-x-[50%] transition-all duration-500  -top-8  text-lg font-bold ${
                isSubmitted ? "block" : "hidden"
              }`}
            >
              Enquiry Submitted Successfully!
            </div>
            <span className="  font-semibold text-white">Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
