import { useContext, useEffect, useState } from "react";
import Media from "../AddProperty/Media";
import Location from "../AddProperty/Location";
import Amenities from "../AddProperty/Amenities";
import Keywords from "../AddProperty/Keywords";
import BasicInformation from "../AddProperty/BasicInformation";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../App";
import Faq from "../AddProperty/Faq";
import Configuration from "../AddProperty/Configuration";

const baseUrl = import.meta.env.VITE_APP_URL;

const AddProperty = ({ action }) => {
  const [isActive, setIsActive] = useState(1);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { setFormData,formData } = useContext(MyContext);

  useEffect(() => {
    async function getData() {
      try {
        let result = await fetch(`${baseUrl}/single-property/${id}`);

        if (result.ok) {
          const data = await result.json();
          console.log("Fetched data:", data.city, data.state, data.country);
          
          setFormData({
            ...data,
            country: data.country || "", // Ensure country is a name
            state: data.state || "", // Keep state as name
            city: data.city || "", // Keep city as name
            purpose: data.purpose || "",
            galleryImg: data.galleryImg?.map((img) => img) || [],
            floorPlanImg:
              data.floorPlanImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/Uploads/floor/${item.img}`,
                info: item.info || "",
              })) || [],
            reraImg:
              data.reraImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/Uploads/rera/${item.img}`,
                no: item.no || "",
              })) || [],
            floorPlan:
              data.floorPlan?.map((plan) => ({
                type: plan.type || "",
                carpetArea: plan.carpetArea || "",
                parking: plan.parking || 0,
                price: plan.price || "",
                sellingArea: plan.sellingArea || "",
              })) || [{ type: "", carpetArea: "", parking: 0, price: "", sellingArea: "" }],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (action === "edit") {
      getData();
      console.log(formData, "Location Form Data");

    } else {
      setFormData({
        title: "",
        description: "",
        propertyType: "",
        status: "",
        purpose: "",
        constructionYear: "",
        price: "",
        discount: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        googleMap: "",
        galleryImg: [],
        floorPlanImg: [],
        reraImg: [],
        floorPlan: [{ type: "", carpetArea: "", parking: 0, balcony: 0, price: "", sellingArea: "" }],
        faqs: [{ question: "", answer: "" }],
        keywords: [{ heading: "", keyword: [] }],
        amenities: [],
      });
    }
  }, [action, setFormData, id]);

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 lg:w-full">
      <div className="flex items-center mb-5 flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            {action === "edit" ? "Edit Property" : "Add New Property"}
          </p>
          <p className="text-sm leading-[25.9px]">
            We are glad to see you again!
          </p>
        </div>
      </div>
      <div className="md:mt-8 w-full rounded-lg bg-white p-8">
        <ul className="flex flex-wrap justify-between md:justify-start gap-5 md:gap-0 text-sm leading-[24px] font-semibold text-gray-500 mb-8 border-b">
          <li
            onClick={() => setIsActive(1)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 1 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            1. Basic
          </li>
          <li
            onClick={() => setIsActive(2)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 2 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            2. Configuration
          </li>
          <li
            onClick={() => setIsActive(3)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 3 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            3. Location
          </li>
          <li
            onClick={() => setIsActive(4)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 4 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            4. Media
          </li>
          <li
            onClick={() => setIsActive(5)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 5 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            5. Keywords
          </li>
          <li
            onClick={() => setIsActive(6)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 6 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            6. Faq
          </li>
          <li
            onClick={() => setIsActive(7)}
            className={`border-b-2 cursor-pointer px-5 py-2 ${isActive === 7 ? "border-black text-black" : "border-gray-300"} hover:border-black`}
          >
            7. Amenities
          </li>
        </ul>

        {isActive === 1 && <BasicInformation setIsActive={setIsActive} />}
        {isActive === 2 && <Configuration setIsActive={setIsActive} />}
        {isActive === 3 && <Location setIsActive={setIsActive} />}
        {isActive === 4 && <Media setIsActive={setIsActive} />}
        {isActive === 5 && <Keywords setIsActive={setIsActive} />}
        {isActive === 6 && <Faq setIsActive={setIsActive} />}
        {isActive === 7 && <Amenities action={action} setIsActive={setIsActive} />}
      </div>
    </div>
  );
};

export default AddProperty;