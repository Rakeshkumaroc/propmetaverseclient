import React, { useState } from "react";

const Pricing = ({ product }) => {
  const [itemOpen, setItemOpen] = useState(true);

  // Calculate the price range dynamically based on the product data
  const priceRange =
    Array.isArray(product) && product.length > 1 // Only calculate range for multiple items
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
    if (!price || isNaN(price)) return "Price on Request";

    const crore = 10000000;
    const lakh = 100000;
    const thousand = 1000;

    if (price >= crore) {
      const crValue = price / crore;
      return `₹${crValue % 1 === 0 ? crValue : crValue.toFixed(1)} Cr`;
    } else if (price >= lakh) {
      const lakhValue = price / lakh;
      return `₹${lakhValue % 1 === 0 ? lakhValue : lakhValue.toFixed(1)} Lakh`;
    } else if (price >= thousand) {
      const thousandValue = price / thousand;
      return `₹${thousandValue % 1 === 0 ? thousandValue : thousandValue.toFixed(1)}k`;
    } else {
      return `₹${price.toLocaleString("en-IN")}`;
    }
  };

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

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">Price</h3>
      <div className="flex flex-wrap-reverse gap-1 items-center justify-between">
        {Array.isArray(product) &&
        product.length > 0 &&
        product.some((item) => item.price && item.price !== 0) ? (
          <div>
            <p className="text-sm md:text-base font-semibold text-gray-800">
              {product.length === 1
                ? formatPrice(product[0].price) // Show single price if only one item
                : `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}` // Show range for multiple items
              }
              <span className="text-sm text-gray-700"> Negotiable</span>
            </p>
            <p className="text-sm text-gray-700">
              {product.length === 1 ? "Price" : "Price Range"}
            </p>
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
                  (typeof carpetArea === "string" || typeof carpetArea === "number") &&
                  (typeof carpetArea === "string" ? carpetArea.includes("sq. ft.") : true);
                const carpetAreaSqFt = isValidCarpetArea
                  ? typeof carpetArea === "number"
                    ? carpetArea
                    : parseFloat(carpetArea.replace(" sq. ft.", ""))
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
                          {formatPrice(price)}
                          <span className="text-sm text-gray-700"> Negotiable</span>
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
  );
};

export default Pricing;