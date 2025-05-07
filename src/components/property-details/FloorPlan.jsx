import React, { useState } from "react"; 

const FloorPlan = ({ product }) => {
  const [itemOpen, setItemOpen] = useState(true);

  // Calculate the price range dynamically based on the product data
  const priceRange =
    Array.isArray(product) &&
    product.length > 0 &&
    product.some(
      (item) =>
        item.price &&
        !isNaN(parseInt(item.price?.toString().replace(/[^0-9]/g, "")))
    )
      ? {
          min: Math.min(
            ...product
              .filter(
                (item) =>
                  item.price &&
                  !isNaN(parseInt(item.price.toString().replace(/[^0-9]/g, "")))
              )
              .map((item) =>
                parseInt(item.price.toString().replace(/[^0-9]/g, ""))
              )
          ),
          max: Math.max(
            ...product
              .filter(
                (item) =>
                  item.price &&
                  !isNaN(parseInt(item.price.toString().replace(/[^0-9]/g, "")))
              )
              .map((item) =>
                parseInt(item.price.toString().replace(/[^0-9]/g, ""))
              )
          ),
        }
      : { min: 0, max: 0 };

  const apartmentTypes =
    Array.isArray(product) && product.length > 0
      ? [
          ...new Set(
            product
              .map((item) =>
                item.type && typeof item.type === "string"
                  ? item.type.match(/\d+(\.\d+)?/g)
                  : []
              )
              .flat()
              .filter(Boolean)
          ),
        ].join(", ") || "N/A"
      : "N/A";

  const formatPrice = (price) => {
    if (!price) return "N/A";
    const cleanPrice = price.toString().replace(/[^0-9.]/g, "");
    const num = parseFloat(cleanPrice);

    if (isNaN(num)) return "N/A";
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)}Lakh`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    } else {
      return num.toString();
    }
  };

  return (
    <>
      <div className="w-full mt-10 px-4 md:px-8">
        <h3 className="text-2xl font-semibold mb-4">Price</h3>
        <div className="flex flex-wrap-reverse gap-1 items-center justify-between">
          {Array.isArray(product) &&
          product.length > 0 &&
          product.some((item) => item.price && item.price !== 0) ? (
            <div>
              <p className="text-sm md:text-base font-semibold text-gray-800">
                ₹ {formatPrice(priceRange.min)} - ₹ {formatPrice(priceRange.max)}
                <span className="text-sm text-gray-700"> Negotiable</span>
              </p>
              <p className="text-sm text-gray-700">Price Range</p>
            </div>
          ) : (
            <button className="text-logoBlue border flex items-center gap-1 border-logoBlue py-2 px-3 rounded">
              <span className="text-sm md:text-base">Price Request</span>
            </button>
          )}
        </div>
        <div>
          <p className="text-sm md:text-base text-gray-800">
            {apartmentTypes} BHK Apartment
          </p>
          {Array.isArray(product) && product.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 w-full mt-2">
              {product
                .slice(0, itemOpen ? 6 : product.length)
                .map(({ type, carpetArea, price }, index) => {
                  // Validate carpetArea before processing
                  const isValidCarpetArea =
                    carpetArea &&
                    typeof carpetArea === "string" &&
                    carpetArea.includes("sq. ft.");
                  const carpetAreaSqFt = isValidCarpetArea
                    ? parseFloat(carpetArea.replace(" sq. ft.", ""))
                    : 0;
                  const carpetAreaSqM = isValidCarpetArea
                    ? (carpetAreaSqFt * 0.092903).toFixed(2)
                    : "N/A";

                  return (
                    <div key={index} className="rounded shadow-sm border">
                      <p className="text-sm md:text-base font-semibold text-gray-800 rounded-t-lg bg-logoBlue/10 p-3">
                        {type || "N/A"}{" "}
                        <span className="font-normal">Apartment</span>
                      </p>
                      <div className="p-3 space-y-2">
                        <div>
                          <p className="text-sm text-gray-700">Carpet Area</p>
                          <p className="text-sm md:text-base text-gray-800">
                            {isValidCarpetArea
                              ? `${parseInt(carpetAreaSqFt)} sq. ft.`
                              : "N/A"}
                            <span className="ml-3 text-gray-700">
                              {isValidCarpetArea ? `(${carpetAreaSqM} sq.m.)` : ""}
                            </span>
                          </p>
                        </div>
                        {price && price !== 0 ? (
                          <p className="text-sm md:text-base font-semibold text-gray-800">
                            ₹ {formatPrice(price)}
                            <span className="text-sm text-gray-700">
                              {" "}
                              Negotiable
                            </span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm md:text-base text-gray-700">
              No floor plans available
            </p>
          )}
          {Array.isArray(product) && product.length > 6 ? (
            <p
              onClick={() => {
                setItemOpen(!itemOpen);
              }}
              className="text-sm md:text-base font-semibold text-logoBlue mt-5 cursor-pointer"
            >
              {itemOpen ? "Read More" : "Read Less"}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FloorPlan;