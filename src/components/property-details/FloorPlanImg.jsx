import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseUrl = import.meta.env.VITE_APP_URL;

const FloorPlanImg = ({ floorPlanImg, setIsEnquiryFormOpen }) => {
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300 hover:scale-110"
      aria-label="Previous image"
    >
      <ChevronLeft size={20} className="text-logoYellow" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300 hover:scale-110"
      aria-label="Next image"
    >
      <ChevronRight size={20} className="text-logoYellow" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="bg-black/20 py-3">
        <ul className="m-0 flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-all duration-300 hover:scale-125 cursor-pointer"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Floor Plan</h3>
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-50 shadow-md">
        {Array.isArray(floorPlanImg) && floorPlanImg.length > 0 ? (
          floorPlanImg.length > 1 ? (
            <Slider {...settings}>
              {floorPlanImg.map(({ img, info }, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center p-4"
                >
                  {img ? (
                    <div className="relative group">
                      <img
                        src={`${baseUrl}/Uploads/floor/${img}`}
                        alt={`Floor Plan ${index + 1}`}
                        className="w-full h-auto max-h-[450px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 cursor-pointer"
                        loading="lazy"
                        onClick={() => setIsEnquiryFormOpen(true)} // Trigger popup
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-200">
                      <p className="text-gray-500 text-lg font-medium">
                        No Image Available
                      </p>
                    </div>
                  )}
                  {info ? (
                    <div className="mt-4 text-center w-full">
                      <p className="text-gray-700 text-sm md:text-base font-medium bg-white/90 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-sm">
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </Slider>
          ) : (
            <div className="p-4">
              {floorPlanImg.map(({ img, info }, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  {img ? (
                    <div className="relative group">
                      <img
                        src={`${baseUrl}/Uploads/floor/${img}`}
                        alt={`Floor Plan ${index + 1}`}
                        className="w-full h-auto max-h-[450px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 cursor-pointer"
                        loading="lazy"
                        onClick={() => setIsEnquiryFormOpen(true)} // Trigger popup
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-200">
                      <p className="text-gray-500 text-lg font-medium">
                        No Image Available
                      </p>
                    </div>
                  )}
                  {info ? (
                    <div className="mt-4 text-center w-full">
                      <p className="text-gray-700 text-sm md:text-base font-medium bg-white/90 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-sm">
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-200">
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