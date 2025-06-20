import React, { useContext, useCallback } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../../App";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";

// Dummy floor plan data
const floorPlan = [
  { type: "2 BHK", carpetArea: "750 sq.ft", parking: "1 Covered", price: "₹60 Lakh" },
  { type: "3 BHK", carpetArea: "1100 sq.ft", parking: "1 Covered, 1 Open", price: "₹85 Lakh" },
  { type: "4 BHK", carpetArea: "1600 sq.ft", parking: "2 Covered", price: "₹1.25 Cr" },
  { type: "Penthouse", carpetArea: "2200 sq.ft", parking: "3 Covered", price: "₹2 Cr" },
];

const Media = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);
  const MAX_IMAGES = 5; // Maximum allowed images for galleryImg and floorPlanImg
  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  // Handle file, info, and type changes for galleryImg and floorPlanImg
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
      } else if (changeType === "info" || changeType === "type") {
        const value = e.target.value;
        setFormData((prevData) => {
          const newImages = [...(prevData[field] || [])];
          newImages[index] = { ...newImages[index], [changeType]: value };
          return { ...prevData, [field]: newImages };
        });
      }
    },
    [setFormData]
  );

  // Add new image field with limit check
  const addImage = useCallback(
    (field) => {
      if ((formData[field]?.length || 0) >= MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed for ${field}`);
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        [field]: [
          ...(prevData[field] || []),
          field === "galleryImg"
            ? { file: null, preview: "" }
            : { file: null, preview: "", info: "", type: "" },
        ],
      }));
    },
    [formData, setFormData]
  );

  // Remove image and clean up URL
  const removeImage = useCallback(
    (index, field) => {
      setFormData((prevData) => {
        const newImages = [...prevData[field]];
        const removedItem = newImages.splice(index, 1)[0];
        if (removedItem.file && removedItem.preview.startsWith("blob:")) {
          URL.revokeObjectURL(removedItem.preview); // Clean up memory for local file previews
        }
        return { ...prevData, [field]: newImages };
      });
    },
    [setFormData]
  );

  return (
    <div className="space-y-5">
      {/* Gallery Images Section */}
      <div className="flex items-center justify-between">
        <p className="text-[17px] leading-[25.5px] font-semibold text-gray-800">
          Upload photos of your property
        </p>
        <span className="text-sm text-gray-500">
          {formData.galleryImg?.length || 0}/{MAX_IMAGES}
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        {formData.galleryImg?.length > 0 ? (
          formData.galleryImg.map((item, index) => (
            <div key={`galleryImg-${index}`} className="mt-5 flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label htmlFor={`galleryImg${index}`} className="text-[14px] font-semibold">
                  Gallery Image {index + 1}
                </label>
                <button
                  onClick={() => removeImage(index, "galleryImg")}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="relative">
                <input
                  type="file"
                  id={`galleryImg${index}`}
                  onChange={(e) => handleChange(e, index, "galleryImg", "file")}
                  accept=".jpeg,.jpg,.png,.gif"
                  className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />

                {item.preview && (
                  <div className="mt-3 flex justify-end">
                    <img
                      src={item.preview}
                      alt={`Gallery ${index + 1}`}
                      className="w-24 h-24 rounded-md object-cover shadow-sm hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No images added yet. Click the plus icon to start!
          </div>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <IoIosAddCircle
            onClick={() => addImage("galleryImg")}
            className="text-black w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
            title="Add gallery image"
          />
        </div>
      </div>

      {/* Floor Plan Images Section */}
      <div className="flex items-center justify-between">
        <p className="text-[17px] leading-[25.5px] font-semibold text-gray-800">
          Upload floor plan images
        </p>
        <span className="text-sm text-gray-500">
          {formData.floorPlanImg?.length || 0}/{MAX_IMAGES}
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        {formData.floorPlanImg?.length > 0 ? (
          formData.floorPlanImg.map((item, index) => (
            <div key={`floorPlanImg-${index}`} className="mt-5 flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label htmlFor={`floorPlanImg${index}`} className="text-[14px] font-semibold">
                  Floor Plan Image {index + 1}
                </label>
                <button
                  onClick={() => removeImage(index, "floorPlanImg")}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="relative space-y-3">
                <select
                  id={`floorPlanImgType${index}`}
                  value={item.type || ""}
                  onChange={(e) => handleChange(e, index, "floorPlanImg", "type")}
                  className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="" disabled>
                    Select Floor Plan Type
                  </option>
                  {floorPlan.map((plan, idx) => (
                    <option key={`floor-plan-${idx}`} value={plan.type}>
                      {plan.type}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  id={`floorPlanImgInfo${index}`}
                  value={item.info || ""}
                  onChange={(e) => handleChange(e, index, "floorPlanImg", "info")}
                  placeholder="Enter floor plan info (e.g., 2BHK Layout)"
                  className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />

                <input
                  type="file"
                  id={`floorPlanImg${index}`}
                  onChange={(e) => handleChange(e, index, "floorPlanImg", "file")}
                  accept=".jpeg,.jpg,.png,.gif"
                  className="border-[1px] px-3 py-3 rounded-lg h-12 border-gray-300 text-sm w-full focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />

                {item.preview && (
                  <div className="mt-3 flex justify-end">
                    <img
                      src={item.preview}
                      alt={`Floor Plan ${index + 1}`}
                      className="w-24 h-24 rounded-md object-cover shadow-sm hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No floor plan images added yet. Click the plus icon to start!
          </div>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <IoIosAddCircle
            onClick={() => addImage("floorPlanImg")}
            className="text-black w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
            title="Add floor plan image"
          />
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => setIsActive(5)}
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Media;