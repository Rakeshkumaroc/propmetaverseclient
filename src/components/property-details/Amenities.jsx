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
      <PiSwimmingPool className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Swimming pool",
  },
  {
    icon: (
      <MdOutlineDeck className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Meditation deck",
  },
  {
    icon: (
      <GiRailway className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Multipurpose court",
  },
  {
    icon: (
      <GiKidSlide className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Kids' play area",
  },
  {
    icon: (
      <LuPartyPopper className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Party hall",
  },
  {
    icon: <MdPool className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />,
    text: "Kids' pool (0.5 m deep)",
  },
  {
    icon: (
      <MdElderlyWoman className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Elderly corner",
  },
  {
    icon: (
      <TbMichelinStarGreen className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Green landscaping",
  },
  {
    icon: (
      <GiCctvCamera className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "CCTV in key areas",
  },
  {
    icon: (
      <CiDumbbell className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "World class gym",
  },
  {
    icon: (
      <GrGamepad className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Indoor games room",
  },
  {
    icon: (
      <HiOutlineBuildingLibrary className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Library",
  },
  {
    icon: (
      <FaCloudSunRain className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Rainwater harvesting",
  },
  {
    icon: (
      <GrCafeteria className="text-logoBlue group-hover:text-white group-hover:bg-logoBlue bg-logoBlue/10 rounded p-1 h-6 w-6" />
    ),
    text: "Cafe",
  },
];
const Amenities = ({ amenities }) => {
  const [itemOepn, setItemOepn] = useState(true);

  const matchedAmenities = amenitiesData.filter(
    (amenity) => amenities && amenities.includes(amenity.text)
  );
  return (
    <div
     
      className="w-full mt-10 px-4 md:px-8"
    >
     
      <h3 className="text-2xl font-semibold mb-4">Amenities</h3>


      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5   my-5">
        {matchedAmenities
          .slice(0, itemOepn ? 6 : matchedAmenities.length)
          .map(({ icon, text }, index) => (
            <p className="flex group items-start gap-2 text-gray-700 leading-relaxed text-sm md:text-base " key={index}>
              {icon}
              {text}
            </p>
          ))}
      </div>
      <button
        onClick={() => {
          setItemOepn(!itemOepn);
        }}
       className="mt-3 cursor-pointer text-logoColor font-medium hover:underline transition duration-200"
      >
        {itemOepn ? "Read More" : "Read Less"}
      </button>

      
    </div>
  );
};

export default Amenities;
