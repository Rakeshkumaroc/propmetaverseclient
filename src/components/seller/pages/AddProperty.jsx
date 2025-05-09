import React, { useContext, useEffect, useState } from "react";
import Media from "../AddProperty/Media";
import Location from "../AddProperty/Location";
import Amenities from "../AddProperty/Amenities";
import Keywords from "../AddProperty/Keywords";
import Details from "../AddProperty/Details";
import BasicInformation from "../AddProperty/BasicInformation";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../App";
const baseUrl = import.meta.env.VITE_APP_URL;

const AddProperty = ({ action }) => {
  const [isActive, setIsActive] = useState(1);

  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { setFormData } = useContext(MyContext);

  useEffect(() => {
    async function getData() {
      try {
        let result = await fetch(baseUrl + "/single-property/" + id);

        if (result.ok) {
          const data = await result.json();
          setFormData({
            ...data,
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
        // Basic Property Information
        title: "",
        description: "",
        propertyType: "",
        status: "",
        constructionYear: "",
        price: "",
        discount: "",
        // Media
        galleryImg: [],
        floorPlanImg: [],
        reraImg: [],
        // Location Details
        address: "",
        state: "",
        city: "",
        // Details
        floorPlan: [{ type: "", carpetArea: "", price: "" }],
        faqs: [{ question: "", answer: "" }],
        // keyword
        keywords: [{ heading: "", keyword: [] }],
        // amenities
        amenities: [],
      });
    }
  }, [action, setFormData]);

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 lg:w-full ">
      <div className="flex items-center mb-5 flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            {action ? "Edit Property" : "Add New Property"}
          </p>
          <p className="text-sm leading-[25.9px]">
            We are glad to see you again!
          </p>
        </div>
      </div>
      <div className="md:mt-8 w-full rounded-lg  bg-white  p-8">
        <ul className="flex flex-wrap justify-between md:justify-start gap-5 md:gap-0 text-sm leading-[24px] font-semibold text-gray-500 mb-8  border-b  ">
          <li
            onClick={() => {
              setIsActive(1);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 1 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            1. Basic
          </li>
          <li
            onClick={() => {
              setIsActive(2);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 2 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            2. Media
          </li>
          <li
            onClick={() => {
              setIsActive(3);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 3 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            3. Location
          </li>
          <li
            onClick={() => {
              setIsActive(4);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 4 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            4. Detail
          </li>
          <li
            onClick={() => {
              setIsActive(5);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 5 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            5. Keywords
          </li>

          <li
            onClick={() => {
              setIsActive(6);
            }}
            className={`border-b-2 cursor-pointer px-5 py-2
              ${isActive === 6 ? "border-black text-black" : "border-gray-300"}
              hover:border-black`}
          >
            6. Amenities
          </li>
        </ul>

        {isActive === 1 ? <BasicInformation setIsActive={setIsActive} /> : null}
        {isActive === 2 ? <Media setIsActive={setIsActive} /> : null}
        {isActive === 3 ? <Location setIsActive={setIsActive} /> : null}
        {isActive === 4 ? <Details setIsActive={setIsActive} /> : null}
        {isActive === 5 ? <Keywords setIsActive={setIsActive} /> : null}

        {isActive === 6 ? (
          <Amenities action={action} setIsActive={setIsActive} />
        ) : null}
      </div>
    </div>
  );
};

export default AddProperty;
