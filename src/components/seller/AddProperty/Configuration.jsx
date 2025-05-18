import { useContext, useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { MyContext } from "../../../App";
import { toast } from "react-toastify";

const Configuration = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const [floorPlan, setFloorPlan] = useState(
    formData.floorPlan || [
      {
        type: "",
        carpetArea: "",
        price: "",
        parking: "",
        balcony: "",
        sellingArea: "",
        brochure: { file: null, preview: "" },
      },
    ]
  );

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      floorPlan,
    }));
  }, [floorPlan, setFormData]);

  const handleProductChange = (index, field, value) => {
    const updatedFloorPlan = [...floorPlan];
    if (field === "brochure") {
      const file = value;
      if (!file) {
        console.warn(`No file selected for brochure at index ${index}`);
        updatedFloorPlan[index][field] = { file: null, preview: "" };
        setFloorPlan(updatedFloorPlan);
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Brochure file size exceeds 5MB limit");
        return;
      }

      // Validate file type
      if (!file.type.includes("pdf")) {
        toast.error("Only PDF files are allowed for brochure");
        return;
      }

      const fileURL = URL.createObjectURL(file);
      updatedFloorPlan[index][field] = { file, preview: fileURL };
    } else {
      updatedFloorPlan[index][field] = value;
    }
    setFloorPlan(updatedFloorPlan);
  };

  // Remove specific Pricing entry
  const removeFloorPlan = (index) => {
    if (floorPlan.length > 1) {
      const updatedFloorPlan = floorPlan.filter((_, i) => i !== index);
      // Clean up object URLs for removed brochure
      const removedItem = floorPlan[index];
      if (removedItem.brochure?.preview) {
        URL.revokeObjectURL(removedItem.brochure.preview);
      }
      setFloorPlan(updatedFloorPlan);
    }
  };

  return (
    <form className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">
        Configuration
      </p>

      {/* Pricing Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {floorPlan.length} Plan(s)
          </span>
        </div>

        {floorPlan.map((plan, index) => (
          <div key={index} className="mt-5 animate-fadeIn">
            <div className="grid md:grid-cols-6 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`type-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  Configuration
                </label>
                <input
                  type="text"
                  placeholder="type"
                  id={`type-${index}`}
                  value={plan.type || ""}
                  onChange={(e) =>
                    handleProductChange(index, "type", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`carpetArea-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  Carpet area (ft²)
                </label>
                <input
                  type="number"
                  placeholder="area"
                  id={`carpetArea-${index}`}
                  value={plan.carpetArea || ""}
                  onChange={(e) =>
                    handleProductChange(index, "carpetArea", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`sellingArea-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  Selling Area (ft²)
                </label>
                <input
                  type="number"
                  placeholder="selling area"
                  id={`sellingArea-${index}`}
                  value={plan.sellingArea || ""}
                  onChange={(e) =>
                    handleProductChange(index, "sellingArea", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`parking-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  No. of Parking
                </label>
                <input
                  type="number"
                  placeholder="parking"
                  id={`parking-${index}`}
                  value={plan.parking || ""}
                  onChange={(e) =>
                    handleProductChange(index, "parking", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`balcony-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  No. of Balcony
                </label>
                <input
                  type="number"
                  placeholder="balcony"
                  id={`balcony-${index}`}
                  value={plan.balcony || ""}
                  onChange={(e) =>
                    handleProductChange(index, "balcony", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`price-${index}`}
                    className="text-[14px] font-semibold leading-[26px]"
                  >
                    Price
                  </label>
                  {floorPlan.length > 1 && (
                    <button
                      onClick={() => removeFloorPlan(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  placeholder="price"
                  id={`price-${index}`}
                  value={plan.price || ""}
                  onChange={(e) =>
                    handleProductChange(index, "price", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label
                htmlFor={`brochure-${index}`}
                className="text-[14px] font-semibold leading-[26px]"
              >
                Brochure (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                id={`brochure-${index}`}
                onChange={(e) =>
                  handleProductChange(index, "brochure", e.target.files[0])
                }
                className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
              />
              {plan.brochure?.preview && (
                <a
                  href={plan.brochure.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  View Brochure
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="mt-2 gap-3 flex justify-end">
          <IoIosAddCircle
            onClick={() =>
              setFloorPlan([
                ...floorPlan,
                {
                  type: "",
                  carpetArea: "",
                  price: "",
                  parking: "",
                  balcony: "",
                  sellingArea: "",
                  brochure: { file: null, preview: "" },
                },
              ])
            }
            className="text-black rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => {
            setIsActive(3);
          }}
          type="submit"
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Configuration;
