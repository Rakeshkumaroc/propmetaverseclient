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
import State from "../../../utils/state.json";
import City from "../../../utils/city.json";

const baseUrl = import.meta.env.VITE_APP_URL;

const AddProperty = ({ action }) => {
  const [isActive, setIsActive] = useState(1);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { setFormData } = useContext(MyContext);

  useEffect(() => {
    async function getData() {
      try {
        let result = await fetch(`${baseUrl}/single-property/${id}`);

        if (result.ok) {
          const data = await result.json();
          // Map state and city names to IDs
          const state = State.find((s) => s.name === data.state || s.id === data.state);
          const city = City.find((c) => c.name === data.city || c.id === data.city);

          setFormData({
            ...data,
            state: state ? String(state.id) : "",
            city: city ? String(city.id) : "",
            purpose: data.purpose || "", // Ensure purpose is included
            galleryImg: data.galleryImg?.map((img) => img) || [],
            floorPlanImg:
              data.floorPlanImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/uploads/floor/${item.img}`,
                info: item.info || "",
              })) || [],
            reraImg:
              data.reraImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/uploads/rera/${item.img}`,
                no: item.no || "",
              })) || [],
            floorPlan: data.floorPlan?.map((plan) => ({
              type: plan.type || "",
              carpetArea: plan.carpetArea || "",
              parking: plan.parking || 0, // Include parking
              price: plan.price || "",
              sellingArea: plan.sellingArea || "", // Include sellingArea
            })) || [{ type: "", carpetArea: "", parking: 0, price: "", sellingArea: "" }],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (action === "edit") {
      getData();
    } else {
      setFormData({
        title: "",
        description: "",
        propertyType: "",
        status: "",
        purpose: "", // Add purpose
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
        floorPlan: [{ type: "", carpetArea: "", parking: 0,balcony:0, price: "", sellingArea: "" }], // Include sellingArea and parking
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