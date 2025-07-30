import { useContext, useEffect, useState } from "react";
import heroimg1 from "../../assets/image/heroimg1.png";
import { MyContext } from "../../App";
import { scrollPage } from "../../utils/utils";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_APP_URL;
const dummyData = [
  {
    title: (
      <>
        {" "}
        Discover Your Dream Property <br /> with Propmetaverse
      </>
    ),
    description:
      "Your trusted partner in real estate consulting, brokering, investment, and asset management. Operating across India and UAE with full RERA compliance, we deliver bespoke solutions and exceptional service through innovation and integrity. Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.",
    image_url: heroimg1,
  },
];
const HeroSection = () => {
  const { enquiryRef } = useContext(MyContext);
  const [heroData, setHeroData] = useState(dummyData);
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${baseUrl}/hero`);
        const data = await response.json();
        setHeroData(dummyData); // Use dummy
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroData(dummyData); // Set dummy data on error
      }
    };

    fetchHeroData();
  }, []);
  return (
    <div className="w-full relative mb-12 sm:mb-16 md:mb-24 lg:mb-32 2xl:mb-[93px] mt-24 sm:mt-32 md:mt-40 lg:mt-28 2xl:mt-[200px] overflow-hidden">
      <section className="w-full bg-white py-6 sm:py-8 md:py-12 lg:pb-30 2xl:py-12 px-4 sm:px-6 md:px-10 lg:px-20 2xl:px-20 grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-2 gap-8 sm:gap-10 md:gap-12 2xl:gap-8">
        {/* Left Section - Text & Buttons */}
        <div className="w-full md:w-auto col-span-2 2xl:col-span-1  2xl:w-[800px]">
          <div className="w-full flex flex-col items-start gap-3 sm:gap-4 md:gap-5 2xl:gap-[10px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-[46px] font-bold leading-tight">
              {heroData[0].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg 2xl:text-base text-gray-600 mt-4 2xl:mt-4">
              {heroData[0].description}
            </p>
          </div>
          {/* CTA Buttons */}
          <div className="flex gap-3 sm:gap-4 md:gap-5 2xl:gap-4 flex-wrap mt-6 sm:mt-8 md:mt-10 2xl:mt-[25px]">
            <Link
              to="/projects"
              className="border-[1px] border-[#262626] text-logoBlue py-3 px-4 sm:py-3.5 sm:px-5 md:py-4 md:px-6 2xl:p-[14px_20px] text-sm sm:text-base md:text-lg 2xl:text-[20px] rounded-md 2xl:rounded-[8px] hover:bg-blue-50 transition"
            >
              Browse Properties
            </Link>
            <button
              style={{ fontWeight: 700 }}
              onClick={() => {
                scrollPage(enquiryRef);
              }}
              className="bg-logoColor text-white py-3 px-4 sm:py-3.5 sm:px-5 md:py-4 md:px-6 2xl:p-[14px_20px] text-sm sm:text-base md:text-lg 2xl:text-[20px] rounded-md 2xl:rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25)] hover:bg-logoColor/90 transition"
            >
              Enquiry
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-12 md:mt-16 2xl:mt-[59px]  flex gap-4 sm:gap-6 md:gap-4 2xl:gap-4 flex-wrap justify-center sm:justify-start">
            <div className="bg-logoBlue space-y-0.5 2xl:w-[220px] sm:space-y-1 2xl:space-y-[2px] text-white rounded-md 2xl:rounded-[10px] p-4 sm:p-5 md:p-6 2xl:p-[14px_20px] w-full sm:w-40 md:w-48 lg:w-56   text-center sm:text-start">
              <p className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[30px] font-bold">
                200+
              </p>
              <p className="text-sm sm:text-base md:text-lg 2xl:text-lg">
                Happy Customers
              </p>
            </div>
            <div className="bg-logoBlue space-y-0.5 2xl:w-[220px] sm:space-y-1 2xl:space-y-[2px] text-white rounded-md 2xl:rounded-[10px] p-4 sm:p-5 md:p-6 2xl:p-[14px_20px] w-full sm:w-40 md:w-48 lg:w-56   text-center sm:text-start">
              <p className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[30px] font-bold">
                10k+
              </p>
              <p className="whitespace-nowrap text-sm sm:text-base md:text-lg 2xl:text-lg">
                Properties For Clients
              </p>
            </div>
            <div className="bg-logoBlue space-y-0.5 2xl:w-[220px] sm:space-y-1 2xl:space-y-[2px] text-white rounded-md 2xl:rounded-[10px] p-4 sm:p-5 md:p-6 2xl:p-[14px_20px] w-full sm:w-40 md:w-48 lg:w-56   text-center sm:text-start">
              <p className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[30px] font-bold">
                3+
              </p>
              <p className="text-sm sm:text-base md:text-lg 2xl:text-lg">
                Years of Experience
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] 2xl:h-[700px] hidden md:flex justify-end items-end md:w-[917px] -ml-0 md:-ml-10 lg:-ml-16 2xl:-ml-20">
          <img
            src={heroData[0].image_url} // Use heroData[0].image_url for the image source
            alt="House in hand"
            className="w-full h-full object-cover 2xl:-mr-[106px]" // Added object-cover to maintain aspect ratio
        
          />
        </div>
      </section>

      <SearchBox />
    </div>
  );
};

export default HeroSection;
