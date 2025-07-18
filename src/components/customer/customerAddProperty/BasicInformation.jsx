import React, { useContext } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../../App";

const BasicInformation = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    const reraRegex = /[^a-zA-Z0-9]/; // For RERA number, allow alphanumeric only

    // Handle numeric fields
    if (["price", "discount", "constructionYear"].includes(id)) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, // Keep as string; backend will convert to number
      }));
      return;
    }

    // Handle validation for specific fields
    const fieldsToValidate = ["title", "reraNumber"];
    if (fieldsToValidate.includes(id)) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
        [`${id}Error`]:
          id === "reraNumber"
            ? reraRegex.test(value)
              ? "Special characters are not allowed in RERA number."
              : ""
            : specialCharRegex.test(value)
            ? `Special characters are not allowed in ${id.replace(
                /([A-Z])/g,
                " $1"
              )}.`
            : "",
      }));
      return;
    }

    // Default case: update the state
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    // If propertyType is changed, reset status if it's not valid for the new property type
    if (name === "propertyType") {
      const validStatuses =
        value === "Plot or Land"
          ? ["Pre-launched", "Developed", "Under construction"]
          : ["Pre-launched", "Under construction", "Ready Possession"];
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        status: validStatuses.includes(prevData.status) ? prevData.status : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Define status options based on property type
  const statusOptions =
    formData.propertyType === "Plot or Land"
      ? ["Pre-launched", "Developed", "Under construction"]
      : ["Pre-launched", "Under construction", "Ready Possession"];

  return (
    <div className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">
        Basic Information
      </p>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Title/Project Name
          </label>
          <input
            type="text"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Property Title"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
          {formData.titleError && (
            <p className="text-red-500 text-xs mt-1">{formData.titleError}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-[26px]">
            Property Type
          </p>
          <ul className="items-center w-full text-sm text-gray-700 border border-gray-200 rounded-lg sm:flex">
            {["Residential", "Commercial", "Plot or Land"].map((type) => (
              <li
                key={type}
                className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div className="flex items-center ps-3">
                  <input
                    value={type}
                    id={type}
                    type="radio"
                    name="propertyType"
                    checked={formData.propertyType === type}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <label
                    htmlFor={type}
                    className="w-full py-3 ms-2 text-sm text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="status"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Status
          </label>
          <ul className="items-center w-full text-sm text-gray-700 border border-gray-200 rounded-lg md:flex">
            {statusOptions.map((status) => (
              <li
                key={status}
                className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div className="flex items-center ps-3">
                  <input
                    value={status}
                    id={status}
                    type="radio"
                    name="status"
                    checked={formData.status === status}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <label
                    htmlFor={status}
                    className="w-full py-3 ms-2 text-sm text-gray-700"
                  >
                    {status}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="purpose"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Purpose
          </label>
          <ul className="items-center w-full text-sm text-gray-700 border border-gray-200 rounded-lg md:flex">
            {["Rent", "Sell"].map((purpose) => (
              <li
                key={purpose}
                className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div className="flex items-center ps-3">
                  <input
                    value={purpose}
                    id={purpose}
                    type="radio"
                    name="purpose"
                    checked={formData.purpose === purpose}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <label
                    htmlFor={purpose}
                    className="w-full py-3 ms-2 text-sm text-gray-700"
                  >
                    {purpose}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="developer"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Developer
          </label>
          <input
            type="text"
            id="developer"
            value={formData.developer || ""}
            onChange={handleChange}
            placeholder="Developer or builder name"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="aboutDeveloper"
            className="text-[14px] font-semibold leading-[26px]"
          >
            About Developer
          </label>
          <textarea
            id="aboutDeveloper"
            value={formData.aboutDeveloper || ""}
            onChange={handleChange}
            placeholder="Write about developer.."
            className="border-[1px] px-2 rounded-lg h-28 border-gray-300 text-sm py-3 resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="constructionYear"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Construction/Plotting Year
          </label>
          <input
            type="number"
            id="constructionYear"
            value={formData.constructionYear || ""}
            onChange={handleChange}
            placeholder="Construction Year"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="price"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={formData.price || ""}
            onChange={handleChange}
            placeholder="Property price"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
          {formData.priceError && (
            <p className="text-red-500 text-xs mt-1">{formData.priceError}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="discount"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            value={formData.discount || ""}
            onChange={handleChange}
            placeholder="Property discount"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
          {formData.discountError && (
            <p className="text-red-500 text-xs mt-1">
              {formData.discountError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="reraNumber"
            className="text-[14px] font-semibold leading-[26px]"
          >
            RERA Number
          </label>
          <input
            type="text"
            id="reraNumber"
            value={formData.reraNumber || ""}
            onChange={handleChange}
            placeholder="RERA Number"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
          {formData.reraNumberError && (
            <p className="text-red-500 text-xs mt-1">
              {formData.reraNumberError}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-start">
        <button
          onClick={() => setIsActive(2)}
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;