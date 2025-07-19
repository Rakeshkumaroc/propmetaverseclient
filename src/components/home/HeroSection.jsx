import { useContext, useEffect, useRef, useState } from "react";
import heroimg1 from "../../assets/image/heroimg1.png";
import { MyContext } from "../../App";
import { scrollPage } from "../../utils/utils";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_APP_URL;
const dummyData = [
  {
    title: " Discover Your Dream Property with Propmetaverse",
    description:
      "Your trusted partner in real estate consulting, brokering, investment, and asset management. Operating across India and UAE with full RERA compliance, we deliver bespoke solutions and exceptional service through innovation and integrity.   Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.",
    image_url: heroimg1,
  },
];
const HeroSection = () => {
  const { enquiryRef } = useContext(MyContext);
  const [heroData, setHeroData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  useEffect(() => {
    const fetchHeroData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`${baseUrl}/hero`);
        const data = await response.json();
        setHeroData(dummyData); // Use dummy
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroData(dummyData); // Set dummy data on error
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchHeroData();
  }, []);
  return (
    <div className="w-full relative mb-[93px]">
      <section className="w-full bg-white md:py-12 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2  gap-8">
        {/* Left Section - Text & Buttons */}
        <div className="md:w-[610px] w-full">
          <div className="w-full flex flex-col items-start gap-[10px] md:gap-[10px]">
            <h1 className="text-3xl md:text-[46px] ">{heroData[0].title}</h1>
            <p className="text-gray-600 mt-4 ">{heroData[0].description}</p>
          </div>
          {/* CTA Buttons */}
          <div className=" flex gap-4 flex-wrap mt-[20px] md:mt-[25px]">
            <Link
              to={"/projects"}
              className="border-[1px] border-[#262626] text-logoBlue p-[14px_20px] md:text-[20px] rounded-[8px] hover:bg-blue-50 transition"
            >
              Browse Properties
            </Link>
            <button
              style={{ fontWeight: 700 }}
              onClick={() => {
                scrollPage(enquiryRef);
              }}
              className="bg-logoColor md:text-[20px] text-white    rounded-[8px] p-[14px_20px] shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25)] hover:bg-logoColor/90 transition"
            >
              Enquiry
            </button>
          </div>

          {/* Stats */}
          <div className="md:mt-[59px] mt-[29px] flex gap-4 flex-wrap">
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">200+</p>
              <p className="">Happy Customers</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">10k+</p>
              <p className="">Properties For Clients</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">3+</p>
              <p className="">Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-[817px] h-[700px] hidden md:flex justify-end items-end    -ml-20">
          <img
            src={heroimg1} // Replace with your actual image path
            alt="House in hand"
            className="w-full h-full -mr-[106px]"
          />
        </div>
      </section>

      <SearchBox />
    </div>
  );
};

export default HeroSection;
