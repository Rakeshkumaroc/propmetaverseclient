import { useState } from "react";

const Pricing = ({ product }) => {
  const [itemOpen, setItemOpen] = useState(true);
  const priceRange =
    Array.isArray(product) && product.length > 1
      ? {
          min: Math.min(
            ...product
              .filter((item) => item.price && !isNaN(item.price))
              .map((item) => item.price)
          ),
          max: Math.max(
            ...product
              .filter((item) => item.price && !isNaN(item.price))
              .map((item) => item.price)
          ),
        }
      : { min: 0, max: 0 };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "Price on Request"; // Handle invalid or zero prices

    const crore = 10000000;
    const lakh = 100000;
    const thousand = 1000;

    if (price >= crore) {
      const crValue = price / crore;
      return `Rs. ${crValue % 1 === 0 ? crValue : crValue.toFixed(1)} Cr`;
    } else if (price >= lakh) {
      const lakhValue = price / lakh;
      return `Rs. ${
        lakhValue % 1 === 0 ? lakhValue : lakhValue.toFixed(1)
      } Lakh`;
    } else if (price >= thousand) {
      const thousandValue = price / thousand;
      return `Rs. ${
        thousandValue % 1 === 0 ? thousandValue : thousandValue.toFixed(1)
      }k`;
    } else {
      return `Rs. ${price.toLocaleString("en-IN")}`; // Default for smaller numbers
    }
  };

  // Determine the apartment types available (e.g., "2, 3" for 2BHK, 3BHK).
  const apartmentTypes =
    Array.isArray(product) && product.length > 0
      ? [
          ...new Set(
            product
              .map((item) =>
                item.type && typeof item.type === "string"
                  ? item.type.match(/\d+(\.\d+)?/g) // Extract numbers from strings like "2BHK"
                  : []
              )
              .flat() // Flatten array of arrays
              .filter(Boolean) // Remove null/undefined matches
          ),
        ].join(", ") || "N/A"
      : "N/A";

  // Check if any product has a valid price
  const hasValidPrice =
    Array.isArray(product) &&
    product.length > 0 &&
    product.some((item) => item.price && item.price !== 0);

  return (
    <div className="w-full mt-8 sm:mt-10 md:mt-12 2xl:mt-[20px] mb-16 sm:mb-24 2xl:mb-[135px]  ">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 w-full sm:p-6 md:p-8 2xl:p-[40px] border border-gray-300 2xl:border-black shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-logoBlue mb-6 sm:mb-8 2xl:mb-[40px]">
          Pricing Details
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 2xl:gap-3 items-start sm:items-center justify-between mb-6 sm:mb-8 2xl:mb-[40px]">
          {hasValidPrice ? (
            // Display price range if valid prices exist
            <div>
              <p className="text-lg sm:text-xl 2xl:text-[20px] font-semibold text-logoBlue">
                {product.length === 1
                  ? formatPrice(product[0].price)
                  : `${formatPrice(priceRange.min)} - ${formatPrice(
                      priceRange.max
                    )}`}
                <span className="text-xs sm:text-sm text-gray-700 ml-2">
                  Negotiable
                </span>
              </p>
              <p className="text-sm text-gray-700">
                {product.length === 1 ? "Price" : "Price Range"}
              </p>
            </div>
          ) : (
            // Display "Price Request" button if no valid prices
            <button className="flex items-center gap-2 border border-logoBlue text-logoBlue py-2 px-3 rounded-md hover:bg-logoBlue hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14ZM11 5V10H9V5H11Z"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium">
                Price Request
              </span>
            </button>
          )}
          {/* Apartment Types */}
          <p className="text-lg sm:text-xl 2xl:text-[20px] text-gray-800 mt-2 sm:mt-0">
            {apartmentTypes} BHK Apartment
          </p>
        </div>

        {/* Individual Product/Floor Plan Cards */}
        {Array.isArray(product) && product.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-[30px]">
            {product
              .slice(0, itemOpen ? 6 : product.length) // Show limited or all based on state
              .map(({ type, carpetArea, price }, index) => {
                // Validate and parse carpet area
                const isValidCarpetArea =
                  carpetArea &&
                  (typeof carpetArea === "string" ||
                    typeof carpetArea === "number") &&
                  (typeof carpetArea === "string"
                    ? carpetArea.includes("sq. ft.") ||
                      !isNaN(parseFloat(carpetArea))
                    : true);

                const carpetAreaSqFt = isValidCarpetArea
                  ? typeof carpetArea === "number"
                    ? carpetArea
                    : parseFloat(carpetArea.replace(" sq. ft.", ""))
                  : 0;
                const carpetAreaSqM = isValidCarpetArea
                  ? (carpetAreaSqFt * 0.092903).toFixed(2)
                  : "N/A";

                return (
                  <div
                    key={index}
                    className="bg-[#BAD6EB]/10 rounded-lg border border-[#1865A4] p-3 sm:p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                  >
                    <p className="text-lg sm:text-xl 2xl:text-[20px] font-semibold text-logoBlue">
                      {type || "N/A"}{" "}
                      <span className="font-normal text-gray-700">
                        Apartment
                      </span>
                    </p>
                    <div className="mt-3 space-y-2">
                      {/* Carpet Area Details */}
                      <div>
                        <p className="text-sm text-gray-700">Carpet Area</p>
                        <p className="text-base sm:text-lg 2xl:text-[20px] text-gray-800">
                          {isValidCarpetArea
                            ? `${parseInt(carpetAreaSqFt)} sq. ft.`
                            : "N/A"}
                          <span className="ml-2 text-gray-600 text-xs sm:text-sm">
                            {isValidCarpetArea
                              ? `(${carpetAreaSqM} sq.m.)`
                              : ""}
                          </span>
                        </p>
                      </div>
                      {/* Price Details (only if price is valid) */}
                      {price && price !== 0 ? (
                        <div>
                          <p className="text-sm text-gray-700">Price</p>
                          <p className="text-base sm:text-lg 2xl:text-[20px] font-semibold text-logoBlue">
                            {formatPrice(price)}
                            <span className="text-xs sm:text-sm text-gray-700 ml-2">
                              Negotiable
                            </span>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          // Message if no floor plans are available
          <p className="text-base sm:text-lg 2xl:text-[20px] text-gray-700 text-center py-8">
            No floor plans available
          </p>
        )}

        {Array.isArray(product) && product.length > 6 && (
          <button
            onClick={() => setItemOpen(!itemOpen)}
            className="mt-6 sm:mt-8 2xl:mt-[40px] text-logoBlue font-semibold text-base sm:text-lg hover:underline transition duration-200 block mx-auto px-6 py-2 rounded-md border border-logoBlue hover:bg-logoBlue hover:text-white"
          >
            {itemOpen ? "Read More" : "Read Less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Pricing;
