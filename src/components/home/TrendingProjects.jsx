import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import TrendingProjectCard from "../TrendingProjectCard";
const baseUrl = import.meta.env.VITE_APP_URL;
// New Skeleton Card Component for TrendingProjects.jsx
const SkeletonTrendingProjectCard = () => (
  <div className="card-container bg-[#BAD6EB] rounded-[12px] border-[1px] border-[#091F5B] shadow-md p-2 md:mr-5 sm:p-4 md:p-6 lg:p-6 xl:p-6 2xl:p-[30px]">
    {/* Image Placeholder */}
    <div className="relative w-full h-[150px] sm:h-[200px] md:h-[255px] lg:h-[255px] xl:h-[255px] 2xl:h-[255px] bg-gray-300 rounded-md overflow-hidden mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 animate-pulse">
      <div
        className="absolute top-2 sm:top-3 md:top-4 lg:top-4 xl:top-4 2xl:top-4 left-2 sm:left-3 md:left-4 lg:left-4 xl:left-4 2xl:left-4 bg-gray-400 h-6 w-20 rounded"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      ></div>
    </div>
    <div className="flex flex-col flex-grow">
      <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-[11px]">
        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 sm:mb-0 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="flex justify-end items-center gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-7 mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2 text-green-700">
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Tags */}
    <div className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 2xl:my-[31px] flex flex-wrap gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-24 animate-pulse"></div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-28 animate-pulse"></div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-20 animate-pulse"></div>
    </div>

    <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 2xl:mt-4 flex flex-col flex-wrap sm:flex-row sm:justify-between sm:items-center">
      <div className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-sm text-[#000] mb-2 sm:mb-0">
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mt-1 animate-pulse"></div>
      </div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 2xl:px-4 py-1 sm:py-2 md:py-2 lg:py-2 xl:py-2 2xl:py-2 rounded-md h-9 w-36 animate-pulse"></div>
    </div>
  </div>
);

export default function TrendingProjects() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Residential");
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true); // Ensure loading is true when fetching starts
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();

        const mappedProperties = data.map((item) => ({
          id: item._id,
          tag: item.propertyType,
          name: item.title,
          location: `${item.city}, ${item.state}`,
          completion: item.constructionYear.toString(),
          developer: item.developer,
          bedrooms: item.floorPlan[0]?.type.split(" ")[0] || "N/A",
          bathrooms: item.floorPlan[0]?.balcony || 0,
          type: item.floorPlan[0]?.type || "Apartment",
          galleryImg:
            item.galleryImg[0] ||
            "https://propmetaverse.com/assets/logopng-BXERHkCM.png",
          price: `Rs. ${item.floorPlan[0]?.price.toLocaleString("en-IN")}/-`,
        }));

        setProperties(mappedProperties);
        setFilteredProperties(mappedProperties); // Initialize with all properties
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    // Filter properties based on activeFilter
    if (activeFilter === "Browse All") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((prop) => prop.tag === activeFilter)
      );
    }
    // Reset slider to first slide when filter changes
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
      setCurrentSlide(0);
    }
  }, [activeFilter, properties]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "slick-slider-custom",
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Render skeleton loaders if loading
  const renderContent = () => {
  if (loading) {
    // Render multiple skeleton cards for the slider
    return (
      <Slider ref={sliderRef} {...sliderSettings}>
        {[...Array(3)].map((_, i) => (
          <TrendingProjectCard key={i} loading={true} />
        ))}
      </Slider>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No projects found for the selected filter.
      </div>
    );
  }

  if (filteredProperties.length === 1) {
    return (
      <div className="w-full max-w-[500px] mx-auto">
        <TrendingProjectCard prop={filteredProperties[0]} />
      </div>
    );
  }

  return (
    <Slider ref={sliderRef} {...sliderSettings}>
      {filteredProperties.map((prop, i) => (
        <TrendingProjectCard prop={prop} key={i} />
      ))}
    </Slider>
  );
};

  return (
    <section className="w-full bg-b md:py-12 px-4 sm:px-6 overflow-hidden md:px-20 mx-auto   max-w-[1920px] mb-[93px]">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
        Most Trending Projects
      </h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-[47px] 2xl:mb-[47px]">
        We carefully select the finest real estate projects for you, ensuring
        top locations, trusted developers, and future-ready homes that match
        your lifestyle and investment goals.
      </p>

      {/* Filter Buttons */}
           <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 md:mb-[66px] justify-start md:justify-around">
        {["Residential", "Commercial", "Plot OR Land", "Browse All"].map(
          (filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`md:font-[700] font-[500] text-sm md:text-base  ${
                filter === activeFilter
                  ? "bg-logoColor text-white shadow-md"
                  : "border-[#000] border text-logoBlue"
              } rounded-md transition`}
            >
              {filter}
            </button>
          )
        )}
      </div>


      {/* Slider */}
      <style jsx="true">{`
        .slick-slider-custom .slick-slide {
          padding: 0 12px;
        }
        .slick-list {
          margin: 0 -12px;
        }
        .card-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-image {
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .slick-slider-custom .slick-slide {
            padding: 0 8px;
          }
          .slick-list {
            margin: 0 -8px;
          }
        }
      `}</style>
      {renderContent()}

      {/* Pagination */}
      <div className="  sm:mt-10 flex justify-between items-center text-sm   mt-10 border-t pt-4">
        <span>
          {String(currentSlide + 1).padStart(2, "0")} of{" "}
          {String(filteredProperties.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2 justify-end  items-center">
          <div
            onClick={handlePrev}
            className="p-2 size-10 sm:size-[44px] rounded-full border border-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.4004 11.9998C20.4004 12.4969 19.9974 12.8998 19.5004 12.8998L6.73489 12.8998L11.7242 17.6511C12.0825 17.9956 12.0937 18.5653 11.7491 18.9236C11.4046 19.2819 10.8349 19.2931 10.4766 18.9486L3.87659 12.6486C3.70012 12.4789 3.60039 12.2446 3.60039 11.9998C3.60039 11.755 3.70012 11.5207 3.87659 11.3511L10.4766 5.05106C10.8349 4.70654 11.4046 4.71771 11.7491 5.07601C12.0937 5.4343 12.0825 6.00404 11.7242 6.34856L6.73489 11.0998L19.5004 11.0998C19.9974 11.0998 20.4004 11.5027 20.4004 11.9998Z"
                fill="#808080"
              />
            </svg>
          </div>
          <div
            onClick={handleNext}
            className="p-2 size-10 sm:size-[44px] rounded-full bg-logoBlue cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-white"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.59961 12.0002C3.59961 11.5031 4.00255 11.1002 4.49961 11.1002L17.2651 11.1002L12.2758 6.34894C11.9175 6.00443 11.9063 5.43469 12.2509 5.0764C12.5954 4.7181 13.1651 4.70693 13.5234 5.05144L20.1234 11.3514C20.2999 11.5211 20.3996 11.7554 20.3996 12.0002C20.3996 12.245 20.2999 12.4793 20.1234 12.6489L13.5234 18.9489C13.1651 19.2935 12.5954 19.2823 12.2509 18.924C11.9063 18.5657 11.9175 17.996 12.2758 17.6514L17.2651 12.9002L4.49961 12.9002C4.00255 12.9002 3.59961 12.4973 3.59961 12.0002Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}