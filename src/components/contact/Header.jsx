import React from "react";

const Header = ({urlName}) => {
  return (
    <div className="text-center py-20 md:py-28 mt-16 md:mt-20 bg-gray-100">
      <p className="text-sm text-gray-500">
        <span className="text-black font-semibold">Home</span> / {urlName}
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
      {urlName}
      </h1>
    </div>
  );
};

export default Header;
