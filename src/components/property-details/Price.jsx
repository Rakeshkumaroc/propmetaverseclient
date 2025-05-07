import React, {  useState } from "react";
import { IoMdDownload } from "react-icons/io";

const Price = ({ product }) => {
  const [itemOpen, setItemOpen] = useState(true);

  // Calculate the price range dynamically based on the product data
  const priceRange =
    Array.isArray(product) &&
    product.length > 0 &&
    product.some(
      (item) =>
        item.price &&
        !isNaN(parseInt(item.price.toString().replace(/[^0-9]/g, "")))
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
            product.map((item) => item.type.match(/\d+(\.\d+)?/g)).flat()
          ),
        ].join(", ") || "N/A"
      : "N/A";

  const formatPrice = (price) => {
    const cleanPrice = price.toString().replace(/[^0-9.]/g, "");
    const num = parseFloat(cleanPrice);

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
      <div className="rounded-xl bg-white p-6 shadow-[0_10px_40px_rgba(24,26,32,.05)]">
        <h4 className="text-[17px] font-semibold mb-6 leading-[25.5px]">
          Price
        </h4>
        <div className="flex flex-wrap-reverse gap-1 items-center justify-between">
          {Array.isArray(product) &&
          product.length > 0 &&
          product[0].price != 0 ? (
            <div>
              <p className="font-semibold">
                ₹ {formatPrice(priceRange.min.toLocaleString())} - ₹{" "}
                {formatPrice(priceRange.max.toLocaleString())}
                <span className="text-sm text-logoBlue font-normal">
                  {" "}
                  Negotiable
                </span>
              </p>
              <p className="text-sm text-gray-600">Price Range</p>
            </div>
          ) : (
            <button className="text-logoBlue border flex items-center gap-1 border-logoBlue py-2 px-3 rounded-lg">
              Price Request
            </button>
          )}

          <button className="text-logoBlue border flex items-center gap-1 border-logoBlue py-2 px-3 rounded-lg">
            <IoMdDownload /> Download Brochure
          </button>
        </div>
        <div>
          <p className="text-[14px] leading-[25.9px]">
            {apartmentTypes} BHK Apartment
          </p>
          {Array.isArray(product) && product.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 w-full mt-2">
              {product
                .slice(0, itemOpen ? 6 : product.length)
                .map(({ type, carpetArea, price }, index) => {
                  const carpetAreaSqFt = parseFloat(
                    carpetArea.toString().replace(" sq. ft.", "")
                  );
                  const carpetAreaSqM = (carpetAreaSqFt * 0.092903).toFixed(2);

                  return (
                    <div key={index} className="rounded-lg shadow-sm border">
                      <p className="text-[14px] font-semibold rounded-t-lg bg-logoBlue/10 p-3">
                        {type} <span className="font-normal">Apartment</span>
                      </p>
                      <div className="p-3 space-y-2">
                        <div>
                          <p className="text-[11px]">Carpet Area</p>
                          <p className="text-[12px]">
                            {parseInt(carpetArea)} sq. ft.
                            <span className="ml-3 text-gray-600">
                              ({carpetAreaSqM} sq.m.)
                            </span>
                          </p>
                        </div>
                        {price != 0 ? (
                          <p className="text-[14px] font-semibold">
                            ₹ {formatPrice(price)}
                            <span className="text-sm text-logoColor font-normal">
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
            <p>No floor plans available</p>
          )}
          {Array.isArray(product) && product.length > 6 ? (
            <p
              onClick={() => {
                setItemOpen(!itemOpen);
              }}
              className="text-logoBlue mt-5 cursor-pointer font-semibold text-[15px]"
            >
              {itemOpen ? "Read More" : "Read Less"}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Price;
