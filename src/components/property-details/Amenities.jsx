 

import { useState } from "react";
import { CiDumbbell } from "react-icons/ci";
import { FaCloudSunRain } from "react-icons/fa6";
import { GiCctvCamera, GiKidSlide, GiRailway } from "react-icons/gi";
import { GrCafeteria, GrGamepad } from "react-icons/gr";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { LuPartyPopper } from "react-icons/lu";
import { MdElderlyWoman, MdOutlineDeck, MdPool } from "react-icons/md";
import { PiSwimmingPool } from "react-icons/pi";
import { TbMichelinStarGreen } from "react-icons/tb"; 

const amenitiesData = [
  {
    icon: (
      <PiSwimmingPool className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Swimming pool",
  },
  {
    icon: (
      <MdOutlineDeck className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Meditation deck",
  },
  {
    icon: (
      <GiRailway className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Multipurpose court",
  },
  {
    icon: (
      <GiKidSlide className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Kids' play area",
  },
  {
    icon: (
      <LuPartyPopper className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Party hall",
  },
  {
    icon: (
      <MdPool className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Kids' pool (0.5 m deep)",
  },
  {
    icon: (
      <MdElderlyWoman className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Elderly corner",
  },
  {
    icon: (
      <TbMichelinStarGreen className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Green landscaping",
  },
  {
    icon: (
      <GiCctvCamera className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "CCTV in key areas",
  },
  {
    icon: (
      <CiDumbbell className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "World class gym",
  },
  {
    icon: (
      <GrGamepad className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Indoor games room",
  },
  {
    icon: (
      <HiOutlineBuildingLibrary className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Library",
  },
  {
    icon: (
      <FaCloudSunRain className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Rainwater harvesting",
  },
  {
    icon: (
      <GrCafeteria className="text-[#1865A4] group-hover:text-white group-hover:bg-[#1865A4] bg-[#BAD6EB]/10 rounded p-1 h-6 w-6" />
    ),
    text: "Cafe",
  },
];

 
const Amenities = ({ amenities }) => {
  // State to control whether to show all amenities or a limited set.
  const [itemOpen, setItemOpen] = useState(true); // true means "Read More" is shown (collapsed view)

  // Filter the full amenitiesData to only include those present in the 'amenities' prop.
  const matchedAmenities = amenitiesData.filter(
    (amenity) => amenities && amenities.includes(amenity.text)
  );

  return ( 
    <div className="flex-1 w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 2xl:p-[40px] border border-gray-300 2xl:border-black shadow-md">
   
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1865A4] mb-6 sm:mb-8 2xl:mb-[40px]">
        Key Features and Amenities
      </h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 2xl:gap-6">
        {matchedAmenities
          .slice(0, itemOpen ? 9 : matchedAmenities.length) // Slice based on itemOpen state
          .map(({ icon, text }, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-[#BAD6EB] to-[rgba(186, 214, 235, 0.00)] border-[#1865A4] border-l-[1px] p-2 sm:p-3 flex items-center rounded-md transition-all duration-200 ease-in-out hover:shadow-md"
            >
              {/* Amenity Icon - sizes are already handled by the icon component's own classes */}
              {icon}
              {/* Amenity Text - responsive font size */}
              <span className="text-gray-700 text-sm sm:text-base font-medium ml-2">
                {text}
              </span>
            </div>
          ))}
      </div>
 
      {matchedAmenities.length > 9 && (
        <button
          // Override default button fontWeight and padding for consistent styling
          style={{ fontWeight: "unset", padding: "0" }}
          onClick={() => setItemOpen(!itemOpen)}
          className="mt-4 sm:mt-6 2xl:mt-3 cursor-pointer text-[#1865A4] text-sm sm:text-base font-medium hover:underline transition duration-200"
        >
          {itemOpen ? "Read More" : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default Amenities;
