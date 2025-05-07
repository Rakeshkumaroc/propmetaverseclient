import React, { useState } from "react";

const Description = ({ description }) => {
  const [itemOepn, setItemOepn] = useState(true);

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">Description</h3>

      <p className=" text-gray-700 leading-relaxed text-sm md:text-base">
        {description.length > 500 && itemOepn
          ? description.slice(0, 500) + "..."
          : description}
      </p>
      {description.length > 500 ? (
        <button
          onClick={() => {
            setItemOepn(!itemOepn);
          }}
          className="mt-3 cursor-pointer text-logoColor font-medium hover:underline transition duration-200"
        >
          {itemOepn ? "Read More" : "Read Less"}
        </button>
      ) : null}
    </div>
  );
};

export default Description;
