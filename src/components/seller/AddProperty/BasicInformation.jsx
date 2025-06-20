import React, { useContext, useCallback } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../../App";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";

const BasicInformation = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);
  const MAX_IMAGES = 5; // Maximum allowed images for reraImg
  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  // Handle file, no, and other field changes
  const handleChange = useCallback(
    (e, index, field, changeType) => {
      if (changeType === "file") {
        const file = e.target.files[0];
        if (!file) {
          console.warn(`No file selected for ${field} index ${index}`);
          return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          toast.error("File size exceeds 500KB limit");
          e.target.value = "";
          return;
        }

        // Validate file type
        const allowedTypes = /\.(jpeg|jpg|png|gif)$/i;
        if (!allowedTypes.test(file.name)) {
          toast.error("Only JPEG, JPG, PNG, or GIF files are allowed");
          e.target.value = "";
          return;
        }

        const fileURL = URL.createObjectURL(file);
        setFormData((prevData) => {
          const newImages = [...(prevData[field] || [])];
          newImages[index] = { ...newImages[index], file, preview: fileURL };
          return { ...prevData, [field]: newImages };
        });
      } else if (changeType === "no") {
        const value = e.target.value;
        const reraRegex = /[^a-zA-Z0-9]/; // Allow alphanumeric only for RERA number
        if (value && reraRegex.test(value)) {
          toast.error("RERA number can only contain alphanumeric characters");
          return;
        }
        setFormData((prevData) => {
          const newImages = [...(prevData[field] || [])];
          newImages[index] = { ...newImages[index], [changeType]: value };
          return { ...prevData, [field]: newImages };
        });
      } else {
        const { id, value } = e.target;
        const reraRegex = /[^a-zA-Z0-9]/; // For RERA number field

        // Handle numeric fields
        if (["constructionYear"].includes(id)) {
          setFormData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
          return;
        }

        // Handle RERA number validation
        if (id === "reraNumber") {
          if (value && reraRegex.test(value)) {
            toast.error("RERA number can only contain alphanumeric characters");
            return;
          }
          setFormData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
          return;
        }

        // Default case: update the state
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      }
    },
    [setFormData]
  );

  // Add new RERA image field with limit check
  const addImage = useCallback(() => {
    if ((formData.reraImg?.length || 0) >= MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} RERA images allowed`);
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      reraImg: [
        ...(prevData.reraImg || []),
        { file: null, preview: "", no: "" },
      ],
    }));
  }, [formData, setFormData]);

  // Remove RERA image and clean up URL
  const removeImage = useCallback(
    (index) => {
      setFormData((prevData) => {
        const newImages = [...prevData.reraImg];
        const removedItem = newImages.splice(index, 1)[0];
        if (removedItem.preview && removedItem.file) {
          URL.revokeObjectURL(removedItem.preview); // Clean up memory
        }
        return { ...prevData, reraImg: newImages };
      });
    },
    [setFormData]
  );

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    if (name === "propertyType") {
      const validStatuses =
        value === "Plot or Land"
          ? ["Pre-launch", "Developed", "Under construction"]
          : ["Pre-launch", "Under construction", "Ready Possession"];
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        status: validStatuses.includes(prevData.status) ? prevData.status : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const statusOptions =
    formData.propertyType === "Plot or Land"
      ? ["Pre-launch", "Developed", "Under construction"]
      : ["Pre-launch", "Under construction", "Ready Possession"];

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
            onChange={(e) => handleChange(e)}
            placeholder="Property Title"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
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
            onChange={(e) => handleChange(e)}
            placeholder="Description"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-[26px]">
            Property Type
          </p>
          <ul className="items-center w-full text-sm text-gray-700 border border-gray-200 rounded-lg sm:flex">
            {["Residential", "Commercial", "Plot or Land"].map((type, index) => (
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
                    required={index === 0}
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
            {statusOptions.map((status, index) => (
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
                    required={index === 0}
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
            {["Rent", "Sell"].map((purpose, index) => (
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
                    required={index === 0}
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
            onChange={(e) => handleChange(e)}
            placeholder="Developer or builder name"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            placeholder="Construction Year"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-3">
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
            onChange={(e) => handleChange(e)}
            placeholder="Property discount"
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
          <label className="text-[14px] font-semibold leading-[26px]">
            RERA Images & Numbers
          </label>
          {formData.reraImg?.length > 0 ? (
            formData.reraImg.map((item, index) => {
              const isObject = typeof item === "object" && item !== null;
              const imageUrl = isObject ? item.preview || item.img : item;

              return (
                <div
                  key={`reraImg-${index}`}
                  className="mt-5 flex flex-col gap-3 animate-fadeIn"
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`reraImg${index}`}
                      className="text-[14px] font-semibold"
                    >
                      RERA Image {index + 1}
                    </label>
                    <button
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="relative space-y-3">
                    <input
                      type="file"
                      id={`reraImg${index}`}
                      onChange={(e) =>
                        handleChange(e, index, "reraImg", "file")
                      }
                      accept=".jpeg,.jpg,.png,.gif"
                      className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      id={`reraImgNo${index}`}
                      value={isObject ? item.no || "" : ""}
                      onChange={(e) => handleChange(e, index, "reraImg", "no")}
                      placeholder="Enter RERA number (e.g., RERA123)"
                      className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />

                    {imageUrl && (
                      <div className="mt-3 flex justify-end">
                        <img
                          src={imageUrl}
                          alt={`RERA ${index + 1}`}
                          className="w-24 h-24 rounded-md object-cover shadow-sm hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              No RERA images added yet. Click the plus icon to start!
            </div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <IoIosAddCircle
              onClick={() => addImage()}
              className="text-black w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              title="Add RERA image"
            />
          </div>
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