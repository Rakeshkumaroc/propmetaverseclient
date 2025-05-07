import React, { useState } from "react";

const AboutDeveloper = ({ aboutDeveloper, developer }) => {
  const [itemOepn, setItemOepn] = useState(true);

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">About Developer</h3>
      <h3 className="text-logoBlue font-semibold text-base md:text-lg ">{developer}</h3>

      <p className=" text-gray-700 leading-relaxed text-sm md:text-base">
        {aboutDeveloper.length > 500 && itemOepn
          ? aboutDeveloper.slice(0, 500) + "..."
          : aboutDeveloper}
      </p>
      {aboutDeveloper.length > 500 ? (
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

export default AboutDeveloper;

