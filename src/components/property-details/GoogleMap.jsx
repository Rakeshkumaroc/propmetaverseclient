const GoogleMap = ({ googleMap }) => {
  return ( 
    <div className="w-full   mb-16 sm:mb-20 md:mb-24 lg:mb-28 2xl:mb-[135px]"> 
      <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[32px] font-semibold mb-4 sm:mb-5 2xl:mb-6 text-gray-800">
        Location
      </h3> 
      {googleMap ? (
        <div className="w-full flex justify-center mt-4 sm:mt-5">  
          <iframe
            src={
              googleMap ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281513.599027056!2d72.11033709507379!3d20.757347828695593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1753674028423!5m2!1sen!2sin"
            } 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] 2xl:h-[614px] border-0 rounded-lg shadow-md" // Added rounded-lg and shadow-md for consistency
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ) : ( 
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] 2xl:h-[814px] flex items-center justify-center bg-gray-100 border border-gray-200 transition-colors duration-300 hover:bg-gray-200 rounded-lg shadow-md">
          <p className="text-gray-500 text-lg font-medium">
            No Map Available
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
