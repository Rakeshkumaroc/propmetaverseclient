import React, { useContext, useEffect, useCallback } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { CiDumbbell } from "react-icons/ci";
import { FaCloudSunRain } from "react-icons/fa6";
import { GiCctvCamera, GiKidSlide, GiRailway } from "react-icons/gi";
import { GrCafeteria, GrGamepad } from "react-icons/gr";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { LuPartyPopper } from "react-icons/lu";
import { MdElderlyWoman, MdOutlineDeck, MdPool } from "react-icons/md";
import { PiSwimmingPool } from "react-icons/pi";
import { TbMichelinStarGreen } from "react-icons/tb";
import { MyContext } from "../../../App";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const amenitiesData = [
  { icon: <PiSwimmingPool />, text: "Swimming pool" },
  { icon: <MdOutlineDeck />, text: "Meditation deck" },
  { icon: <GiRailway />, text: "Multipurpose court" },
  { icon: <GiKidSlide />, text: "Kids' play area" },
  { icon: <LuPartyPopper />, text: "Party hall" },
  { icon: <MdPool />, text: "Kids' pool" },
  { icon: <MdElderlyWoman />, text: "Elderly corner" },
  { icon: <TbMichelinStarGreen />, text: "Green landscaping" },
  { icon: <GiCctvCamera />, text: "CCTV in key areas" },
  { icon: <CiDumbbell />, text: "World class gym" },
  { icon: <GrGamepad />, text: "Indoor games room" },
  { icon: <HiOutlineBuildingLibrary />, text: "Library" },
  { icon: <FaCloudSunRain />, text: "Rainwater harvesting" },
  { icon: <GrCafeteria />, text: "Cafe" },
];

const initialFormData = {
  title: "",
  description: "",
  propertyType: "",
  status: "",
  developer: "",
  aboutDeveloper: "",
  constructionYear: "",
  price: "",
  discount: "",
  galleryImg: [],
  floorPlanImg: [],
  reraImg: [],
  address: "",
  state: "",
  city: "",
  googleMap: "",
  floorPlan: [{ type: "", carpetArea: "", price: "" }],
  faqs: [{ question: "", answer: "" }],
  keywords: [{ heading: "", keyword: [] }],
  amenities: [],
  seller_id: "",
};

const Amenities = ({ action }) => {
  const { formData, setFormData } = useContext(MyContext);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const user = (localStorage.getItem("sellerId"));
    if (user ) {
      setFormData((prev) => ({ ...prev, seller_id: user}));
    }
  }, [setFormData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const formDataToSend = new FormData();
  
      // Helper function to append only valid values
      const appendIfValid = (key, value) => {
        if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      };
  
      appendIfValid("title", formData.title);
      appendIfValid("seller_id", formData.seller_id);
      appendIfValid("description", formData.description);
      appendIfValid("propertyType", formData.propertyType);
      appendIfValid("status", formData.status);
      appendIfValid("developer", formData.developer);
      appendIfValid("aboutDeveloper", formData.aboutDeveloper);
      appendIfValid("constructionYear", formData.constructionYear);
      appendIfValid("price", formData.price);
      appendIfValid("discount", formData.discount);
      appendIfValid("address", formData.address);
      appendIfValid("state", formData.state);
      appendIfValid("city", formData.city);
      appendIfValid("googleMap", formData.googleMap);
  
      // Handle galleryImg as file objects with better logging
      console.log("galleryImg before submission:", formData.galleryImg);
      formData.galleryImg.forEach((img, index) => {
        if (img?.file) {
          console.log(`Appending galleryImg[${index}]:`, img.file);
          formDataToSend.append("galleryImg", img.file);
        } else {
          console.log(`No file at galleryImg[${index}]`);
        }
      });
  
      // Handle floorPlanImg as file objects with logging
      console.log("floorPlanImg before submission:", formData.floorPlanImg);
      formData.floorPlanImg.forEach((img, index) => {
        if (img?.file) {
          console.log(`Appending floorPlanImg[${index}]:`, img.file);
          formDataToSend.append("floorPlanImg", img.file);
        } else {
          console.log(`No file at floorPlanImg[${index}]`);
        }
        // Append floorPlanImgInfo
        if (img?.info) {
          console.log(`Appending floorPlanImgInfo[${index}]:`, img.info);
          formDataToSend.append(`floorPlanImgInfo[${index}]`, img.info);
        }
      });
  
      // Handle reraImg as file objects with logging
      console.log("reraImg before submission:", formData.reraImg);
      formData.reraImg.forEach((img, index) => {
        if (img?.file) {
          console.log(`Appending reraImg[${index}]:`, img.file);
          formDataToSend.append("reraImg", img.file);
        } else {
          console.log(`No file at reraImg[${index}]`);
        }
        // Append reraImgNo
        if (img?.no) {
          console.log(`Appending reraImgNo[${index}]:`, img.no);
          formDataToSend.append(`reraImgNo[${index}]`, img.no);
        }
      });
  
      // Handle floorPlan with validation
      formData.floorPlan.forEach((plan, index) => {
        appendIfValid(`floorPlan[${index}][type]`, plan.type);
        appendIfValid(`floorPlan[${index}][carpetArea]`, plan.carpetArea);
        appendIfValid(`floorPlan[${index}][price]`, plan.price);
      });
  
      formData.faqs.forEach((faq, index) => {
        appendIfValid(`faqs[${index}][question]`, faq.question);
        appendIfValid(`faqs[${index}][answer]`, faq.answer);
      });
  
      formData.keywords.forEach((keyword, index) => {
        appendIfValid(`keywords[${index}][heading]`, keyword.heading);
        keyword.keyword.forEach((kw, kwIndex) => {
          appendIfValid(`keywords[${index}][keyword][${kwIndex}]`, kw);
        });
      });
  
      formData.amenities.forEach((amenity, index) => {
        appendIfValid(`amenities[${index}]`, amenity);
      });
  
      // Log FormData for debugging
      const formDataObj = {};
      for (const [key, value] of formDataToSend.entries()) {
        if (formDataObj[key]) {
          if (Array.isArray(formDataObj[key])) {
            formDataObj[key].push(value);
          } else {
            formDataObj[key] = [formDataObj[key], value];
          }
        } else {
          formDataObj[key] = value;
        }
      }
      console.log("FormData Object:", formDataObj);
  
      const apiUrl =
        action === "edit"
          ? `${baseUrl}/edit-property/${id}`
          : `${baseUrl}/add-property`;
      const method = action === "edit" ? "PUT" : "POST";
  
      try {
        const response = await fetch(apiUrl, {
          method,
          body: formDataToSend,
        });
  
        if (response.ok) {
          const successMessage =
            action === "edit"
              ? "Property edited successfully"
              : "Property added successfully";
          if (action !== "edit") {
            const result = await response.json();
            console.log("Property added successfully:", result);
          }
  
          setFormData(initialFormData); // Reset to initial state
          Swal.fire({
            title: "Success!",
            text: successMessage,
            confirmButtonColor: "#036672",
            icon: "success",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
            buttonsStyling: false,
          });
        } else {
          const errorData = await response.json();
          console.error(
            `Error ${action === "edit" ? "editing" : "adding"} property:`,
            errorData
          );
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Failed to ${action === "edit" ? "edit" : "add"} property`,
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
          });
        }
      } catch (error) {
        console.error("Network error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to ${action === "edit" ? "edit" : "add"} property`,
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
        });
      }
    },
    [action, formData, id, setFormData]
  );

  const handleSelectAllToggle = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      amenities:
        prevData.amenities.length === amenitiesData.length
          ? []
          : amenitiesData.map((amenity) => amenity.text),
    }));
  }, [setFormData]);

  const handleChange = useCallback(
    (e) => {
      const { id, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        amenities: checked
          ? [...prevData.amenities, id]
          : prevData.amenities.filter((amenity) => amenity !== id),
      }));
    },
    [setFormData]
  );

  const isAllSelected = formData.amenities.length === amenitiesData.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[17px] leading-[25.5px] font-semibold">
          Select Amenities
        </p>
        <div className="flex items-center gap-2">
          <input
            onChange={handleSelectAllToggle}
            type="checkbox"
            id="select-all"
            className="w-4 cursor-pointer rounded h-4"
            checked={isAllSelected}
            aria-label="Select all amenities"
          />
          <label htmlFor="select-all" className="cursor-pointer">
            Select All
          </label>
        </div>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
          {amenitiesData.map(({ icon, text }, index) => (
            <div key={text} className="flex gap-1 items-start">
              <input
                id={text}
                type="checkbox"
                checked={formData.amenities.includes(text)}
                onChange={handleChange}
                className="w-4 h-4 bg-black cursor-pointer border-black rounded focus:ring-0 checked:bg-black"
              />
              <label
                htmlFor={text}
                className="text-[15px] flex items-start gap-1 text-gray-700"
              >
                {icon} {text}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-start">
        <button
          type="submit"
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Submit
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Amenities;
