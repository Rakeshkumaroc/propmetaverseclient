import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Like from "../../assets/card/like.svg";
import Share from "../../assets/card/share.svg";
import Compare from "../../assets/card/compare.svg";
import TrendingProjectCard from "../TrendingProjectCard";
const baseUrl = import.meta.env.VITE_APP_URL;

export default function TrendingProjects2() {
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
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();

        const mappedProperties = data.map((item) => ({
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full md:py-12 px-4 sm:px-6 overflow-hidden md:px-20 mx-auto   max-w-[1920px] mb-[93px]">
      <h2 className="text-2xl sm:text-3xl md:text-[38px] text-logoBlue mb-2">
        Most Trending Projects
      </h2>
      <p className="text-sm sm:text-base mb-8 md:mb-[47px]">
        We carefully select the finest real estate projects for you, ensuring
        top locations, trusted developers, and future-ready homes that match
        your lifestyle and investment goals.
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 md:mb-[66px] justify-center md:justify-around">
        {["Residential", "Commercial", "Plot OR Land", "Browse All"].map(
          (filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`font-[700] ${
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
      {filteredProperties.length === 1 ? (
        <div className="w-full max-w-[500px] mx-auto">
          <div className="card-container bg-[#BAD6EB] rounded-[12px] border-[1px] border-[#091F5B] shadow-md p-4 sm:p-6 md:p-[30px]">
            {/* Image Placeholder */}
            <div className="relative w-full h-[200px] sm:h-[255px] bg-gray-300 rounded-md overflow-hidden mb-4">
              <button
                className="absolute top-4 left-4 bg-[#ACACAC] text-white"
                style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              >
                {filteredProperties[0].tag}
              </button>
              <img
                src={filteredProperties[0].galleryImg}
                alt={filteredProperties[0].name}
                className="card-image w-full h-full"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="space-y-2 sm:space-y-3 md:space-y-[11px]">
                <h6 className="font-semibold text-lg sm:text-xl md:text-[20px] text-[#091F5B]">
                  {filteredProperties[0].name}
                </h6>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base">
                  <span className="flex items-center gap-1 mb-2 sm:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M8 2.50002C6.4529 2.50002 4.96917 3.1146 3.87521 4.20856C2.78125 5.30253 2.16667 6.78626 2.16667 8.33335C2.16667 10.7184 3.65167 13.0192 5.28167 14.8017C6.11512 15.7097 7.02453 16.545 8 17.2984C8.14556 17.1867 8.31639 17.0506 8.5125 16.89C9.29567 16.2469 10.0328 15.5496 10.7183 14.8034C12.3483 13.0192 13.8333 10.7192 13.8333 8.33335C13.8333 6.78626 13.2188 5.30253 12.1248 4.20856C11.0308 3.1146 9.5471 2.50002 8 2.50002ZM8 19.345L7.5275 19.02L7.525 19.0184L7.52 19.0142L7.50333 19.0025L7.44083 18.9584L7.21583 18.7942C6.07572 17.9373 5.01656 16.9778 4.05167 15.9275C2.34833 14.0625 0.5 11.3634 0.5 8.33252C0.5 6.3434 1.29018 4.43574 2.6967 3.02922C4.10322 1.6227 6.01088 0.83252 8 0.83252C9.98912 0.83252 11.8968 1.6227 13.3033 3.02922C14.7098 4.43574 15.5 6.3434 15.5 8.33252C15.5 11.3634 13.6517 14.0634 11.9483 15.9259C10.9837 16.9761 9.92483 17.9356 8.785 18.7925C8.69005 18.8634 8.5942 18.9332 8.4975 19.0017L8.48 19.0134L8.475 19.0175L8.47333 19.0184L8 19.345ZM8 6.66669C7.55797 6.66669 7.13405 6.84228 6.82149 7.15484C6.50893 7.4674 6.33333 7.89133 6.33333 8.33335C6.33333 8.77538 6.50893 9.1993 6.82149 9.51186C7.13405 9.82442 7.55797 10 8 10C8.44203 10 8.86595 9.82442 9.17851 9.51186C9.49107 9.1993 9.66667 8.77538 9.66667 8.33335C9.66667 7.89133 9.49107 7.4674 9.17851 7.15484C8.86595 6.84228 8.44203 6.66669 8 6.66669ZM4.66667 8.33335C4.66667 7.4493 5.01786 6.60145 5.64298 5.97633C6.2681 5.35121 7.11594 5.00002 8 5.00002C8.88406 5.00002 9.7319 5.35121 10.357 5.97633C10.9821 6.60145 11.3333 7.4493 11.3333 8.33335C11.3333 9.21741 10.9821 10.0653 10.357 10.6904C9.7319 11.3155 8.88406 11.6667 8 11.6667C7.11594 11.6667 6.2681 11.3155 5.64298 10.6904C5.01786 10.0653 4.66667 9.21741 4.66667 8.33335Z"
                        fill="black"
                      />
                    </svg>
                    {filteredProperties[0].location}
                  </span>
                  <span>
                    Completion:{" "}
                    <span className="ml-2">
                      {filteredProperties[0].completion}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p className="text-sm sm:text-base">
                  By:{" "}
                  <span className="ml-2">
                    {filteredProperties[0].developer}
                  </span>
                </p>
                <div className="flex justify-end items-center gap-4 sm:gap-7 mt-2 text-green-700">
                  <img src={Like} alt="Like" className="size-5 sm:size-6" />
                  <img
                    src={Compare}
                    alt="Compare"
                    className="size-5 sm:size-6"
                  />
                  <img src={Share} alt="Share" className="size-5 sm:size-6" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="my-4 sm:my-6 md:my-[31px] flex flex-wrap gap-2 text-white text-xs sm:text-sm">
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  {/* SVG content remains unchanged */}
                </svg>
                {filteredProperties[0].bedrooms}-Bedroom
              </span>
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  {/* SVG content remains unchanged */}
                </svg>
                {filteredProperties[0].bathrooms}-Bathroom
              </span>
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  {/* SVG content remains unchanged */}
                </svg>
                {filteredProperties[0].type}
              </span>
            </div>

            <div className="mt-4 flex flex-col flex-wrap sm:flex-row sm:justify-between sm:items-center">
              <div className="text-sm text-[#000] mb-2 sm:mb-0">
                Starting Price
                <br />
                <h6 className="text-base sm:text-lg">
                  {filteredProperties[0].price}
                </h6>
              </div>
              <button className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 rounded-md text-sm sm:text-base font-[600] transition">
                View Property Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Slider ref={sliderRef} {...sliderSettings}>
          {filteredProperties.map((prop, i) => (
            <TrendingProjectCard prop={prop} key={i} />
          ))}
        </Slider>
      )}

      {/* Pagination */}
      <div className="  sm:mt-10 flex justify-between items-center text-sm   mt-10 border-t pt-4">
        <span>
          {String(currentSlide + 1).padStart(2, "0")} of{" "}
          {String(filteredProperties.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2 justify-end  items-center">
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
