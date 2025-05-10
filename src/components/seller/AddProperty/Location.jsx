import React, { useContext } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../../App";

const Location = ({ setIsActive }) => {
  // State to store form values
  const { formData, setFormData } = useContext(MyContext);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;


    if (id === "googleMap") {
      // Extract src value if iframe string is provided
      const regex = /src=['"]([^'"]+)['"]/; // This regex matches both single and double quotes
      const match = value.match(regex);

      if (match) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: match[1], // Save the extracted src value
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value, // Save the raw input if no match
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }


  
  };

  return (
    <div className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">
        Listing Location
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="address"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Enter address"
          />
          {formData.error && (
            <p className="text-red-500 text-xs mt-1">{formData.error}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="state"
            className="text-[14px] font-semibold leading-[26px]"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            value={formData.state}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Enter State"
          />
          {formData.error && (
            <p className="text-red-500 text-xs mt-1">{formData.error}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="city"
            className="text-[14px] font-semibold leading-[26px]"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Enter City"
          />
          {formData.error && (
            <p className="text-red-500 text-xs mt-1">{formData.error}</p>
          )}
        </div>

        {/* New Google Map input field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="googleMap" className="text-[14px] font-semibold leading-[26px]">
            Google Map 
          </label>
          <input
            type="text"
            id="googleMap"
            value={formData.googleMap}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Paste Google Map Embed URL"
          />
        </div>
      </div>
      <div className="flex justify-start">
        <button
          onClick={() => setIsActive(4)}
          type="submit"
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5   items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Location;
