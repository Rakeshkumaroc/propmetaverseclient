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
import { toast } from "react-toastify";

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
  purpose: "",
  developer: "",
  aboutDeveloper: "",
  constructionYear: "",
  discount: "",
  reraNumber: "",
  address: "",
  country: "",
  state: "",
  city: "",
  pinCode: "",
  googleMap: "",
  galleryImg: [],
  floorPlanImg: [],
  reraImg: [],
  floorPlan: [
    {
      type: "",
      carpetArea: "",
      parking: 0,
      price: "",
      sellingArea: "",
      balcony: 0,
    },
  ], // Added balcony
  faqs: [{ question: "", answer: "" }],
  keywords: [{ heading: "", keyword: [] }],
  amenities: [],
};

const Amenities = ({ action }) => {
  const { formData, setFormData } = useContext(MyContext);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();

useEffect(() => {
  const user = localStorage.getItem("sellerId");
  console.log(user);

  if (user) {
    setFormData((prev) => ({
      ...prev,
      seller_id: user,
    }));
  } else {
    const customerAuth = localStorage.getItem("customerAuth");
    if (customerAuth) {
   
      const parsedCustomerAuth = JSON.parse(customerAuth); // Parse the JSON string
      setFormData((prev) => ({
        ...prev,
        seller_id: parsedCustomerAuth.user._id, // Access user after parsing
      }));
    }
  }
}, [setFormData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate required fields
      const requiredFields = [
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
        { key: "propertyType", label: "Property Type" },
        { key: "status", label: "Status" },
        { key: "purpose", label: "Purpose" },
        { key: "developer", label: "Developer" },
        { key: "constructionYear", label: "Construction Year" },
        { key: "address", label: "Address" },
        { key: "country", label: "Country" },
        { key: "state", label: "State" },
        { key: "city", label: "City" },
        { key: "pinCode", label: "Pin Code" },
      ];
      const missingFields = requiredFields.filter(({ key }) => !formData[key]);
      const invalidFloorPlan = formData.floorPlan.some(
        (plan) =>
          !plan.type ||
          !plan.carpetArea ||
          !plan.parking ||
          !plan.price ||
          !plan.sellingArea
      );

      if (missingFields.length > 0) {
        toast.error(
          `Please fill the following required fields: ${missingFields
            .map((f) => f.label)
            .join(", ")}`
        );
        return;
      }
      if (invalidFloorPlan) {
        toast.error(
          "Please fill all required fields in each floor plan: Type, Carpet Area, Parking, Price, Selling Area"
        );
        return;
      }

      const formDataToSend = new FormData();

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
      appendIfValid("purpose", formData.purpose);
      appendIfValid("developer", formData.developer);
      appendIfValid("aboutDeveloper", formData.aboutDeveloper);
      appendIfValid("constructionYear", formData.constructionYear);
      appendIfValid("discount", formData.discount);
      appendIfValid("address", formData.address);
      appendIfValid("country", formData.country);
      appendIfValid("state", formData.state);
      appendIfValid("city", formData.city);
      appendIfValid("pinCode", formData.pinCode);
      appendIfValid("googleMap", formData.googleMap);
     

      formData.galleryImg.forEach((img, index) => {
        if (img?.file) {
          formDataToSend.append("galleryImg", img.file);
        }
      });

      formData.floorPlanImg.forEach((img, index) => {
        if (img?.file) {
          formDataToSend.append("floorPlanImg", img.file);
        }
        if (img?.info) {
          formDataToSend.append(`floorPlanImgInfo[${index}]`, img.info);
        }
      });

      formData.reraImg.forEach((img, index) => {
        if (img?.file) {
          formDataToSend.append("reraImg", img.file);
        }
        if (img?.no) {
          formDataToSend.append(`reraImgNo[${index}]`, img.no);
        }
      });

      formData.floorPlan.forEach((plan, index) => {
        appendIfValid(`floorPlan[${index}][type]`, plan.type);
        appendIfValid(`floorPlan[${index}][carpetArea]`, plan.carpetArea);
        appendIfValid(`floorPlan[${index}][parking]`, plan.parking);
        appendIfValid(`floorPlan[${index}][price]`, plan.price);
        appendIfValid(`floorPlan[${index}][sellingArea]`, plan.sellingArea);
        appendIfValid(`floorPlan[${index}][balcony]`, plan.balcony); // Added balcony
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
          setFormData(initialFormData);
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Failed to ${action === "edit" ? "edit" : "add"} property: ${
              errorData.details || "Unknown error"
            }`,
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Network error: ${error.message}`,
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
