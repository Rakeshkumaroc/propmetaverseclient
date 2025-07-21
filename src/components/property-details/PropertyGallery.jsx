import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const images = [
  "/images/villa1.jpg",
  "/images/villa2.jpg",
  "/images/villa3.jpg",
  "/images/living1.jpg",
  "/images/living2.jpg",
  "/images/living3.jpg",
  "/images/living4.jpg",
  "/images/living5.jpg",
];

const PropertyGallery = ({ galleryImg }) => {
  const [mainIndex, setMainIndex] = useState(0);

  const handlePrev = () => {
    setMainIndex((prev) => (prev - 1 + galleryImg.length) % galleryImg.length);
  };

  const handleNext = () => {
    setMainIndex((prev) => (prev + 1) % galleryImg.length);
  };

  return (
    <div className="w-full relative mb-[93px] sm:mb-[60px] mt-[120px] md:mt-[150px] xl:mt-[150px] 2xl:mt-[200px]">
      <div className="w-full px-2 sm:px-4 md:px-10 lg:px-24 py-8 sm:py-10 md:py-12 bg-white mb-[93px] sm:mb-[60px]">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h2 className="text-[40px]">Seaside Serenity Villa</h2>
          <div className="flex items-center gap-2 border border-[#262626] text-sm p-[8px]  rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.61646 18.6259C9.64163 18.6405 9.66141 18.6517 9.67542 18.6596L9.69869 18.6726C9.88441 18.7745 10.1148 18.7738 10.3007 18.6729L10.3246 18.6596C10.3386 18.6517 10.3584 18.6405 10.3835 18.6259C10.4339 18.5967 10.5058 18.5542 10.5963 18.4985C10.7771 18.3872 11.0323 18.223 11.3372 18.0076C11.9459 17.5776 12.7581 16.9395 13.5721 16.1061C15.1922 14.4474 16.875 11.9551 16.875 8.75C16.875 4.95304 13.797 1.875 10 1.875C6.20304 1.875 3.125 4.95304 3.125 8.75C3.125 11.9551 4.80777 14.4474 6.42788 16.1061C7.24188 16.9395 8.05409 17.5776 8.66282 18.0076C8.96771 18.223 9.22295 18.3872 9.40375 18.4985C9.49419 18.5542 9.56612 18.5967 9.61646 18.6259ZM10 11.25C11.3807 11.25 12.5 10.1307 12.5 8.75C12.5 7.36929 11.3807 6.25 10 6.25C8.61929 6.25 7.5 7.36929 7.5 8.75C7.5 10.1307 8.61929 11.25 10 11.25Z"
                fill="#1865A4"
              />
            </svg>
            <span className=" text-logoBlue text-[20px]">
              Malibu, California
            </span>
          </div>
          <div className="ml-auto ">
            <p className="font-[500] text-[20px]">Price</p>
            <p className="text-logoBlue font-[600] text-[24px]">Rs. 360000/-</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="rounded-xl p-[40px] bg-[#BAD6EB]">
          {/* Thumbnails */}
          <div className="flex overflow-x-auto gap-2 bg-white p-[10px] mb-4 rounded-[12px]">
            {galleryImg.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setMainIndex(index)}
                className={`h-[74px] w-24 object-cover rounded-lg cursor-pointer border-2 ${
                  mainIndex === index
                    ? "border-logoBlue"
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Main galleryImg */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-4">
            <img
              src={galleryImg[mainIndex]}
              alt="Main"
              className="w-full h-[507px] object-cover rounded-lg"
            />
            <img
              src={galleryImg[(mainIndex + 1) % galleryImg.length]}
              alt="Secondary"
              className="w-full h-[507px] object-cover rounded-lg"
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <div
              onClick={handlePrev}
              className="bg-white shadow-md rounded-full p-2 hover:bg-blue-200 transition"
            >
              <FaArrowLeft className="text-logoBlue" />
            </div>
            <div className="w-16 h-1 bg-blue-400 rounded-full" />
            <div
              onClick={handleNext}
              className="bg-logoBlue text-white shadow-md rounded-full p-2 hover:bg-blue-900 transition"
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
