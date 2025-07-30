import { Link } from "react-router-dom";

 

const Rera = ({ reraImg }) => {
  return ( 
    <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/3 flex flex-col mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[135px] text-start bg-white">
 
      <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[32px] font-semibold mb-4 sm:mb-5 2xl:mb-6 text-gray-800 text-start">
        RERA Approved
      </h3> 
      <p className="text-sm sm:text-base md:text-lg 2xl:text-[20px] text-gray-600 mb-4 sm:mb-5 2xl:mb-6 max-w-full md:max-w-xl 2xl:max-w-2xl">
        The project is registered with MahaRERA available at website{" "}
        <Link
          className="text-blue-500 underline hover:text-blue-700 transition-colors duration-200"
          to="https://maharera.mahaonline.gov.in"
          target="_blank"
          rel="noopener noreferrer"  
        >
          maharera.mahaonline.gov.in
        </Link>
      </p>
 
      {reraImg.map(({ img, no }, index) => (
        <div key={index} className="flex flex-col w-fit mt-8 sm:mt-12 md:mt-16 lg:mt-20 2xl:mt-[73px] mx-auto md:mx-0"> {/* Responsive top margin and center alignment on small screens */}
          {img && (
            <img
              src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCf805gmp1HbJe0bMFd37wJ5CTpk2IexqLQ&s'} // Using the provided placeholder image
              alt="QR Code" 
              className="size-48 sm:size-64 md:size-80 2xl:size-[352px] mb-1 sm:mb-2 rounded-lg shadow-md" // Added rounded-lg and shadow-md
              loading="lazy"
            />
          )}
          {no && ( 
            <span className="text-gray-500 text-base sm:text-lg 2xl:text-[20px] mx-auto">
              {no}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rera;
