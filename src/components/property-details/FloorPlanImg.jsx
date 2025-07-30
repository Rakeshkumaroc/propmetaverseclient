import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FloorPlanImg = ({ floorPlanImg, setIsEnquiryFormOpen }) => {
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 sm:left-3 md:left-4 2xl:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300 hover:scale-110"
      aria-label="Previous image"
    >
      <ChevronLeft size={20} className="text-logoYellow" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 sm:right-3 md:right-4 2xl:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300 hover:scale-110"
      aria-label="Next image"
    >
      <ChevronRight size={20} className="text-logoYellow" />
    </button>
  );

  // Settings for the react-slick carousel
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed
    autoplay: true, // Auto-play slides
    autoplaySpeed: 3000, // Time between slides
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    nextArrow: <NextArrow />, // Custom next arrow component
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="bg-black/20 py-3">
        <ul className="m-0 flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    // Custom rendering for individual dots
    customPaging: (i) => (
      <div
        className="w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-all duration-300 hover:scale-125 cursor-pointer"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <div className="w-full  mb-16 sm:mb-20 md:mb-24 lg:mb-28 2xl:mb-[135px]">
      <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[32px] font-semibold mb-4 sm:mb-5 2xl:mb-6 text-gray-800">
        Floor Plan
      </h3>
      {/* Container for the floor plan images/slider */}
      <div className="relative w-full overflow-hidden bg-gray-50 shadow-md rounded-lg">
        {Array.isArray(floorPlanImg) && floorPlanImg.length > 0 ? (
          // If there's more than one image, use the Slider component
          floorPlanImg.length > 1 ? (
            <Slider {...settings}>
              {/* Map through the floorPlanImg array to render each image */}
              {floorPlanImg.map(({ img, info }, index) => (
                <div
                  key={index}
                  // Responsive padding for the slider item
                  className="flex flex-col w-full justify-center items-center p-2 sm:p-3 md:p-4 2xl:p-4"
                >
                  {img ? (
                    // Image container with hover effects
                    <div className="relative group w-full">
                      <img
                        src={`${img}`}
                        alt={`Floor Plan ${index + 1}`}
                        className="w-[full] h-auto md:h-[881px] transition-transform duration-300 group-hover:brightness-110 cursor-pointer rounded-md" // Added rounded-md
                        loading="lazy"
                        onClick={() => setIsEnquiryFormOpen(true)} // Trigger popup on image click
                      />
                    </div>
                  ) : (
                    // Placeholder if no image is available
                    <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] 2xl:h-[300px] flex items-center justify-center bg-gray-100 border border-gray-200 transition-colors duration-300 hover:bg-gray-200 rounded-md">
                      {" "}
                      {/* Added rounded-md */}
                      <p className="text-gray-500 text-lg font-medium">
                        No Image Available
                      </p>
                    </div>
                  )}
                  {info ? (
                    // Display info text if available
                    <div className="mt-4 text-center w-full">
                      <p className="text-gray-700 text-sm md:text-base font-medium bg-white/90 p-2 sm:p-3 2xl:p-4 transition-all duration-300 hover:bg-white hover:shadow-sm rounded-md">
                        {" "}
                        {/* Added rounded-md and responsive padding */}
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </Slider>
          ) : (
            // If there's only one image, display it directly without the slider
            <div>
              {floorPlanImg.map(({ img, info }, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full justify-center items-center p-2 sm:p-3 md:p-4 2xl:p-4" // Responsive padding
                >
                  {img ? (
                    <div className="relative group w-full">
                      <img
                        src={`${img}`}
                        alt={`Floor Plan ${index + 1}`}
                        className="w-full h-auto0 md:h-[881px] transition-transform duration-300 group-hover:brightness-110 cursor-pointer rounded-md" // Added rounded-md
                        loading="lazy"
                        onClick={() => setIsEnquiryFormOpen(true)} // Trigger popup
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] 2xl:h-[300px] flex items-center justify-center bg-gray-100 border border-gray-200 transition-colors duration-300 hover:bg-gray-200 rounded-md">
                      {" "}
                      {/* Added rounded-md */}
                      <p className="text-gray-500 text-lg font-medium">
                        No Image Available
                      </p>
                    </div>
                  )}
                  {info ? (
                    <div className="mt-4 text-center w-full">
                      <p className="text-gray-700 text-sm md:text-base font-medium bg-white/90 p-2 sm:p-3 2xl:p-4 transition-all duration-300 hover:bg-white hover:shadow-sm rounded-md">
                        {" "}
                        {/* Added rounded-md and responsive padding */}
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )
        ) : (
          // Placeholder if no floor plans are available at all
          <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] 2xl:h-[300px] flex items-center justify-center bg-gray-100 border border-gray-200 transition-colors duration-300 hover:bg-gray-200 rounded-md">
            {" "}
            {/* Added rounded-md */}
            <p className="text-gray-500 text-lg font-medium">
              No Floor Plans Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlanImg;
