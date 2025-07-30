import  { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
const PropertyGallery = ({ galleryImg, title, price, address }) => {
  const [mainIndex, setMainIndex] = useState(0);

  const handlePrev = () => {
    setMainIndex((prev) => (prev - 1 + galleryImg.length) % galleryImg.length);
  };

  const handleNext = () => {
    setMainIndex((prev) => (prev + 1) % galleryImg.length);
  };

  // Skeleton component for when galleryImg is not available
  const SkeletonGallery = () => (
    <div className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-[40px] 2xl:p-[40px] bg-[#BAD6EB]">
      {/* Skeleton Thumbnails */}
      <div className="flex overflow-x-auto gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 bg-white p-1 sm:p-2 md:p-3 lg:p-3 xl:p-3 2xl:p-[10px] mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 rounded-[8px] sm:rounded-[10px] md:rounded-[12px] lg:rounded-[12px] xl:rounded-[12px] 2xl:rounded-[12px]">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-12 sm:h-16 md:h-[74px] lg:h-[74px] xl:h-[74px] 2xl:h-[74px] w-16 sm:w-20 md:w-24 lg:w-24 xl:w-24 2xl:w-24 bg-gray-300 animate-pulse rounded-lg"
          />
        ))}
      </div>

      {/* Skeleton Main Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-[30px] mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
        <div className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[450px] 2xl:h-[507px] bg-gray-300 animate-pulse rounded-lg" />
        <div className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[450px] 2xl:h-[507px] bg-gray-300 animate-pulse rounded-lg hidden md:block" />
      </div>

      {/* Skeleton Navigation Arrows */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 2xl:mt-4">
        <div className="bg-gray-300 shadow-md rounded-full p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 w-8 sm:w-10 md:w-10 lg:w-10 xl:w-10 2xl:w-10 h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 2xl:h-10 animate-pulse" />
        <div className="w-8 sm:w-12 md:w-16 lg:w-16 xl:w-16 2xl:w-16 h-1 bg-gray-300 rounded-full animate-pulse" />
        <div className="bg-gray-300 shadow-md rounded-full p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 w-8 sm:w-10 md:w-10 lg:w-10 xl:w-10 2xl:w-10 h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 2xl:h-10 animate-pulse" />
      </div>
    </div>
  );

  // Render skeleton if galleryImg is not available or empty
  if (!galleryImg || galleryImg.length === 0) {
    return (
      <div className="w-full relative mt-16 sm:mt-20 md:mt-24 lg:mt-[120px] xl:mt-[150px] 2xl:mt-[210px] mb-4 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-[20px]">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 bg-white max-w-[1920px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[40px] font-bold line-clamp-2">
              {title || <div className="h-6 sm:h-8 md:h-8 lg:h-10 xl:h-10 2xl:h-10 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-64 bg-gray-300 animate-pulse rounded" />}
            </h2>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 border border-[#262626] text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-sm p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="w-3 sm:w-4 md:w-4 lg:w-5 xl:w-5 2xl:w-5 h-3 sm:h-4 md:h-4 lg:h-5 xl:h-5 2xl:h-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.61646 18.6259C9.64163 18.6405 9.66141 18.6517 9.67542 18.6596L9.69869 18.6726C9.88441 18.7745 10.1148 18.7738 10.3007 18.6729L10.3246 18.6596C10.3386 18.6517 10.3584 18.6405 10.3835 18.6259C10.4339 18.5967 10.5058 18.5542 10.5963 18.4985C10.7771 18.3872 11.0323 18.223 11.3372 18.0076C11.9459 17.5776 12.7581 16.9395 13.5721 16.1061C15.1922 14.4474 16.875 11.9551 16.875 8.75C16.875 4.95304 13.797 1.875 10 1.875C6.20304 1.875 3.125 4.95304 3.125 8.75C3.125 11.9551 4.80777 14.4474 6.42788 16.1061C7.24188 16.9395 8.05409 17.5776 8.66282 18.0076C8.96771 18.223 9.22295 18.3872 9.40375 18.4985C9.49419 18.5542 9.56612 18.5967 9.61646 18.6259ZM10 11.25C11.3807 11.25 12.5 10.1307 12.5 8.75C12.5 7.36929 11.3807 6.25 10 6.25C8.61929 6.25 7.5 7.36929 7.5 8.75C7.5 10.1307 8.61929 11.25 10 11.25Z"
                  fill="#1865A4"
                />
              </svg>
              <span className="text-logoBlue text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[20px] line-clamp-1">
                {address || <div className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-6 2xl:h-6 w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-40 bg-gray-300 animate-pulse rounded" />}
              </span>
            </div>
            <div className="w-full sm:w-auto sm:ml-auto">
              <p className="font-medium text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[20px]">
                Price
              </p>
              <p className="text-logoBlue font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[24px]">
                {price ? `Rs. ${price}/-` : <div className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-6 2xl:h-6 w-20 sm:w-24 md:w-24 lg:w-24 xl:w-24 2xl:w-24 bg-gray-300 animate-pulse rounded" />}
              </p>
            </div>
          </div>
          <SkeletonGallery />
        </div>
      </div>
    );
  }

  // Original UI when galleryImg is available
  return (
    <div className="w-full relative mt-16 sm:mt-20 md:mt-24 lg:mt-[120px] xl:mt-[150px] 2xl:mt-[210px] mb-4 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-[20px]">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 bg-white max-w-[1920px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[40px] font-bold line-clamp-2">
            {title || <div className="h-6 sm:h-8 md:h-8 lg:h-10 xl:h-10 2xl:h-10 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-64 bg-gray-300 animate-pulse rounded" />}
          </h2>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 border border-[#262626] text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-sm p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="w-3 sm:w-4 md:w-4 lg:w-5 xl:w-5 2xl:w-5 h-3 sm:h-4 md:h-4 lg:h-5 xl:h-5 2xl:h-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.61646 18.6259C9.64163 18.6405 9.66141 18.6517 9.67542 18.6596L9.69869 18.6726C9.88441 18.7745 10.1148 18.7738 10.3007 18.6729L10.3246 18.6596C10.3386 18.6517 10.3584 18.6405 10.3835 18.6259C10.4339 18.5967 10.5058 18.5542 10.5963 18.4985C10.7771 18.3872 11.0323 18.223 11.3372 18.0076C11.9459 17.5776 12.7581 16.9395 13.5721 16.1061C15.1922 14.4474 16.875 11.9551 16.875 8.75C16.875 4.95304 13.797 1.875 10 1.875C6.20304 1.875 3.125 4.95304 3.125 8.75C3.125 11.9551 4.80777 14.4474 6.42788 16.1061C7.24188 16.9395 8.05409 17.5776 8.66282 18.0076C8.96771 18.223 9.22295 18.3872 9.40375 18.4985C9.49419 18.5542 9.56612 18.5967 9.61646 18.6259ZM10 11.25C11.3807 11.25 12.5 10.1307 12.5 8.75C12.5 7.36929 11.3807 6.25 10 6.25C8.61929 6.25 7.5 7.36929 7.5 8.75C7.5 10.1307 8.61929 11.25 10 11.25Z"
                fill="#1865A4"
              />
            </svg>
            <span className="text-logoBlue text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[20px] line-clamp-1">
              {address || <div className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-6 2xl:h-6 w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-40 bg-gray-300 animate-pulse rounded" />}
            </span>
          </div>
          <div className="w-full sm:w-auto sm:ml-auto">
            <p className="font-medium text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[20px]">
              Price
            </p>
            <p className="text-logoBlue font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[24px]">
              {price ? `Rs. ${price}/-` : <div className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-6 2xl:h-6 w-20 sm:w-24 md:w-24 lg:w-24 xl:w-24 2xl:w-24 bg-gray-300 animate-pulse rounded" />}
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-[40px] 2xl:p-[40px] bg-[#BAD6EB]">
          {/* Thumbnails */}
          <div className="flex overflow-x-auto gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 bg-white p-1 sm:p-2 md:p-3 lg:p-3 xl:p-3 2xl:p-[10px] mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 rounded-[8px] sm:rounded-[10px] md:rounded-[12px] lg:rounded-[12px] xl:rounded-[12px] 2xl:rounded-[12px]">
            {galleryImg.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setMainIndex(index)}
                className={`h-12 sm:h-16 md:h-[74px] lg:h-[74px] xl:h-[64px] 2xl:h-[74px] w-16 sm:w-20 md:w-24 lg:w-24 xl:w-24 2xl:w-24 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ease-in-out ${
                  mainIndex === index
                    ? "border-logoBlue"
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Main Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-[30px] mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
            <img
              src={galleryImg[mainIndex]}
              alt="Main"
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[330px] xl:h-[340px] 2xl:h-[507px] object-cover rounded-lg"
            />
            <img
              src={galleryImg[(mainIndex + 1) % galleryImg.length]}
              alt="Secondary"
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[330px] xl:h-[340px] 2xl:h-[507px] object-cover rounded-lg hidden md:block"
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 2xl:mt-4">
            <button
              onClick={handlePrev}
              className="bg-white shadow-md rounded-full p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 hover:bg-blue-100 transition-all duration-300 ease-in-out"
              aria-label="Previous image"
            >
              <FaArrowLeft className="text-logoBlue text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg" />
            </button>
            <div className="w-8 sm:w-12 md:w-16 lg:w-16 xl:w-16 2xl:w-16 h-1 bg-blue-400 rounded-full" />
            <button
              onClick={handleNext}
              className="bg-logoBlue text-white shadow-md rounded-full p-1 sm:p-2 md:p-2 lg:p-2 xl:p-2 2xl:p-2 hover:bg-logoBlue/90 transition-all duration-300 ease-in-out"
              aria-label="Next image"
            >
              <FaArrowRight className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;