import React from "react";

const HeaderText = ({ title }) => {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-logoColor">
      {title}
    </h2>
  );
};

export default HeaderText;
