import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Herobg from "../../assets/image/herobg.jpg";
import SliderImg1 from "../../assets/image/herosecimg.jpeg";
import { MyContext } from "../../App";
import SearchBox from "./SearchBox";
import { scrollPage } from "../../utils/utils";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_APP_URL;

const HeroSection = () => {
  const { enquiryRef } = useContext(MyContext);
  const [heroData, setHeroData] = useState([]);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${baseUrl}/hero`);
        const data = await response.json();
        setHeroData(data);
        console.log('data',data);
        
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroData([]); // Ensure heroData is empty on error
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div
      className="relative w-full pt-6 sm:pt-10 md:pt-20 lg:pt-40 pb-5 md:pb-0 min-h-[100vh] md:min-h-screen bg-cover bg-center px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40"
      style={{ backgroundImage: `url(${Herobg})` }}
    >
      <div className="bg-gradient-to-t absolute inset-0 to-[#061a33] from-[#173306]/80"></div>

      {heroData.length > 0 ? (
        heroData.length > 1 ? (
          <Slider ref={sliderRef} {...settings}>
            {heroData.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col-reverse md:flex-row items-center h-full justify-between p-4 sm:p-6 md:p-8 lg:p-10 gap-6 md:gap-10">
                  <div className="w-full md:w-1/2 lg:max-w-[670px] text-white">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                      {item.title}
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                      {item.description}
                    </p>
                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                      <button
                        onClick={() => {
                          scrollPage(enquiryRef);
                        }}
                        className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base"
                      >
                        Enquiry
                      </button>
                      <Link
                        to={"/projects"}
                        className="px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-white md:bg-transparent bg-white md:text-white text-black hover:text-black text-sm sm:text-base"
                      >
                        See All Apartments
                      </Link>
                    </div>
                  </div>

                  <div className="w-52 h-52 sm:w-72 md:w-80 lg:w-96 sm:h-72 md:h-80 lg:h-96 relative rounded-full shadow-[0_0_20px] shadow-white/80">
                    {/* Circular Image */}
                    <div className="relative rounded-full overflow-hidden w-full h-full">
                      <img
                        src={`${item.image_url}`}
                        alt={item.title}
                        className="w-full h-full object-cover border-4 sm:border-5 border-white shadow-lg rounded-full"
                      />

                      {/* Property Type Text Inside Circle */}
                      <div className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-0 right-0 px-3 sm:px-4 text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-400 bg-white bg-opacity-80 py-2">
                        {item.property_type.toUpperCase()}
                      </div>
                    </div>

                    {/* Price Badge Overlapping Bottom Left */}
                    <div className="absolute -bottom-5 -left-5 sm:bottom-5 sm:-left-0 border-4 sm:border-5 border-white bg-logoColor w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 flex items-center justify-center z-10 text-white px-3 py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold shadow-md">
                      <div className="flex flex-col   items-center justify-center leading-tight text-center">
                        <span>₹ {item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          heroData.map((item, index) => (
            <div key={index}>
              <div className="flex z-50 relative  flex-col-reverse md:flex-row items-center h-full justify-between p-4 sm:p-6 md:p-8 lg:p-10 gap-6 md:gap-10">
                <div className="w-full md:w-1/2 lg:max-w-[670px] text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    {item.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                    {item.description}
                  </p>
                  <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        scrollPage(enquiryRef);
                      }}
                      className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base"
                    >
                      Enquiry
                    </button>
                    <Link
                      to={"/projects"}
                      className="px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-white md:bg-transparent bg-white md:text-white text-black hover:text-black text-sm sm:text-base"
                    >
                      See All Apartments
                    </Link>
                  </div>
                </div>

                <div className="w-52 h-52 sm:w-72 md:w-80 lg:w-96 sm:h-72 md:h-80 lg:h-96 relative rounded-full shadow-[0_0_20px] shadow-white/80">
                  {/* Circular Image */}
                  <div className="relative rounded-full overflow-hidden w-full h-full">
                    <img
                      src={`${item.image_url}`}
                      alt={item.title}
                      className="w-full h-full object-cover border-4 sm:border-5 border-white shadow-lg rounded-full"
                    />

                    {/* Property Type Text Inside Circle */}
                    <div className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-0 right-0 px-3 sm:px-4 text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-400 bg-white bg-opacity-80 py-2">
                      {item.property_type.toUpperCase()}
                    </div>
                  </div>

                  {/* Price Badge Overlapping Bottom Left */}
                  <div className="absolute -bottom-5 -left-5 sm:bottom-5 sm:-left-0 border-4 sm:border-5 border-white bg-logoColor w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 flex items-center justify-center z-10 text-white px-3 py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold shadow-md">
                    <div className="flex flex-col   items-center justify-center leading-tight text-center">
                      <span>₹ {item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div>
          <div className="flex z-50 relative  flex-col-reverse md:flex-row items-center h-full justify-between p-4 sm:p-6 md:p-8 lg:p-10 gap-6 md:gap-10">
            <div className="w-full md:w-1/2 lg:max-w-[670px] text-white">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                Work in progress
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus eos hic dignissimos necessitatibus magnam officia, sit
                dolore, maiores, repellat dolorem quisquam qui obcaecati veniam!
                Commodi nihil magnam vitae voluptates. Perspiciatis?
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    scrollPage(enquiryRef);
                  }}
                  className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base"
                >
                  Enquiry
                </button>
                <Link
                  to={"/projects"}
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-white md:bg-transparent bg-white md:text-white text-black hover:text-black text-sm sm:text-base"
                >
                  See All Apartments
                </Link>
              </div>
            </div>

            <div className="w-60 sm:w-72 md:w-80 lg:w-96 h-60 sm:h-72 md:h-80 lg:h-96 relative">
              <div className="relative rounded-full overflow-hidden">
                <img
                  src={SliderImg1}
                  alt="Penthouse"
                  className="w-full h-full object-cover rounded-full border-4 sm:border-5 border-white shadow-lg"
                />
                <div className="text-end text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3 absolute bottom-12 sm:bottom-14 md:bottom-16 left-0 right-0 md:pr-12 pr-6 bg-white font-bold text-gray-400 p-2 sm:p-3 md:p-4">
                  PENTHOUSE APARTMENT
                </div>
              </div>
              <div className="absolute left-0 bottom-4 sm:bottom-6 md:bottom-7 border-4 sm:border-5 border-white bg-logoColor w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 flex items-center justify-center z-10 text-white px-3 py-2 rounded-full text-sm sm:text-base md:text-lg font-semibold">
                ₹13,200,00
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Arrows */}
      {heroData.length > 1 ? (
        <div className="md:block flex flex-col items-center  ">
          {/* <div className="flex md:block gap-5 z-10 md:static absolute bottom-0 md:bottom-auto right-1/2 md:right-auto translate-x-1/2 md:translate-[auto] justify-center items-center w-full "> */}
          <div className="relative md:static">
            <button
              className="md:absolute md:top-1/2 md:left-20 md:transform md:-translate-y-1/2 bg-black/50 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full md:rounded-none "
              onClick={() => sliderRef.current.slickPrev()}
            >
              <FaChevronLeft size={20} sm:size={24} />
            </button>
            <button
              className="md:absolute md:top-1/2 md:right-20 md:transform md:-translate-y-1/2 bg-black/50 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full md:rounded-none "
              onClick={() => sliderRef.current.slickNext()}
            >
              <FaChevronRight size={20} sm:size={24} />
            </button>
          </div>

          {/* Search Form */}
          <SearchBox />
        </div>
      ) : (
       <div className="md:block flex flex-col items-center  ">
          {/* <div className="flex md:block gap-5 z-10 md:static absolute bottom-0 md:bottom-auto right-1/2 md:right-auto translate-x-1/2 md:translate-[auto] justify-center items-center w-full "> */}
 

          {/* Search Form */}
          <SearchBox />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
