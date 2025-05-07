import React from "react";

const GoogleMap = ({  googleMap }) => {
  return (
    <div className="w-full mt-10 px-4 md:px-8">
      
      <h3 className="text-2xl font-semibold mb-4">Location</h3>
     
      {googleMap ? (
        <div className="w-full flex justify-center mt-5">
          <iframe
            src={googleMap}
            className="w-full h-96 border-0 rounded"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default GoogleMap;
