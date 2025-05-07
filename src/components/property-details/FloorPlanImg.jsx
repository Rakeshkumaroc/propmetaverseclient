import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseUrl = import.meta.env.VITE_APP_URL;

const FloorPlanImg = ({ floorPlanImg }) => { 

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 bottom-1/2  -translate-y-1/2 z-10 bg-black/30 rounded-full p-1 hover:bg-black/50 transition"
      aria-label="Previous image"
    >
      <ChevronLeft size={18} className="text-logoYellow" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 bottom-1/2  -translate-y-1/2 z-10 bg-black/30 rounded-full p-1 hover:bg-black/50 transition"
      aria-label="Next image"
    >
      <ChevronRight size={18} className="text-logoYellow" />
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
      <div className="bg-black/20 py-4">
        <ul className="m-0 flex justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition"></div>
    ),
  };

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">Floor Plan</h3>
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
        {floorPlanImg.length > 1 ? (
          <Slider {...settings}>
            {floorPlanImg.map(({ img, info }, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col border max-h-[500px] justify-center items-center "
                >
                  {img ? (
                    <img
                      src={`${baseUrl}/Uploads/floor/${img}`}
                      alt={`Floor Plan ${index + 1}`}
                      className="w-full h-auto max-h-[450px] object-contain rounded"
                      loading="lazy" // Optimize image loading
                    />
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <p className="text-gray-500">No Image Available</p>
                    </div>
                  )}
                  {info ? (
                    <div className="mt-4 text-center w-full ">
                      <p className="text-gray-700 text-sm md:text-lg  font-medium bg-white/80 p-4 rounded">
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </Slider>
        ) : (
          <div>
            {floorPlanImg.map(({ img, info }, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col border max-h-[500px] justify-center items-center "
                >
                  {img ? (
                    <img
                      src={`${baseUrl}/Uploads/floor/${img}`}
                      alt={`Floor Plan ${index + 1}`}
                      className="w-full h-auto max-h-[450px] object-contain rounded"
                      loading="lazy" // Optimize image loading
                    />
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <p className="text-gray-500">No Image Available</p>
                    </div>
                  )}
                  {info ? (
                    <div className="mt-4 text-center w-full ">
                      <p className="text-gray-700 text-sm md:text-lg  font-medium bg-white/80 p-4 rounded">
                        {info}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlanImg;
