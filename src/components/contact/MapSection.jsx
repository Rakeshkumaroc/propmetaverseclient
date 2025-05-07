import React from "react";

const MapSection = () => {
  return (
    <div className="mt-12">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=55.268%2C25.195%2C55.325%2C25.255"
        className="w-full h-96 rounded-lg shadow-md"
        allowFullScreen=""
        loading="lazy"
        title="Location Map"
      ></iframe>
    </div>
  );
};

export default MapSection;
