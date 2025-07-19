import { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaHeart, FaLocationDot, FaPlaneDeparture } from "react-icons/fa6";
import Like from "../../assets/card/like.svg";
import Share from "../../assets/card/share.svg";
import Compare from "../../assets/card/compare.svg";

export default function TrendingProjects2() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://spmv.orangecap.media/property");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();

        // Map API data to match the structure expected by the UI
        const mappedProperties = data.map((item) => ({
          tag: item.propertyType,
          name: item.title,
          location: `${item.city}, ${item.state}`,
          completion: item.constructionYear.toString(),
          developer: item.developer,
          bedrooms: item.floorPlan[0]?.type.split(" ")[0] || "N/A", // Extract number from "2 BHK"
          bathrooms: item.floorPlan[0]?.balcony || 0, // Use balcony as placeholder; adjust if API has bathroom data
          type: item.floorPlan[0]?.type || "Apartment",
          price: `Rs. ${item.floorPlan[0]?.price.toLocaleString("en-IN")}/-`,
        }));

        setProperties(mappedProperties);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className=" w-full md:py-12 px-6 md:px-20 mx-auto">
      <h2 className="text-[38px]  text-logoBlue mb-2">
        Most Trending Projects
      </h2>
      <p className="  mb-[47px]  ">
        We carefully select the finest real estate projects for you, ensuring
        top locations, trusted developers, and future-ready homes that match
        your lifestyle and investment goals.
      </p>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-[66px] flex-wrap justify-around">
        {["Residential", "Commercial", "Plot OR Land", "Browse All"].map(
          (filter, idx) => (
            <button
              style={{ padding: "14px 80px" }}
              key={idx}
              className={`    font-[700]    ${
                filter === "Residential"
                  ? "bg-logoColor  text-white shadow-md"
                  : "border-[#000] border text-logoBlue"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {properties.map((prop, i) => (
          <div
            key={i}
            className="bg-[#BAD6EB] rounded-[12px] border-[1px] border-[#091F5B] shadow-md p-[30px]"
          >
            {/* Image Placeholder */}
            <div className="relative w-full h-[255px] bg-gray-300 rounded-md overflow-hidden mb-4">
              <button
                style={{
                  padding: "2px 10px",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
                className="absolute top-[24px] left-[24px] bg-[#ACACAC] text-white text-xs px-2 py-1 rounded"
              >
                {prop.tag}
              </button>
              {/* Replace with <img src="..." /> */}
              <img
                src="https://via.placeholder.com/400x200"
                alt={prop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="space-y-[11px]">
                <h6 className="font-semibold text-[20px] text-[#091F5B]">
                  {prop.name}
                </h6>

                <div className=" mt-1 flex justify-between">
                  <span className="flex items-center gap-1">
                    {/* SVG for location icon */}
                    {/* <svg>...</svg> */}
                    {prop.location}
                  </span>
                  <span>
                    Completion: <span className="ml-2"> {prop.completion}</span>
                  </span>
                </div>
              </div>
              <div className="flex  justify-between">
                <p className=" mt-1">
                  By: <span className="ml-2">{prop.developer}</span>
                </p>

                <div className="flex justify-between items-center gap-7 text-xl mt-2 text-green-700">
                  <img src={Like} alt="Like" className="size-[24px]" />
                  <img src={Compare} alt="Compare" className="size-[24px]" />
                  <img src={Share} alt="Share" className="size-[24px]" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="my-[31px] flex flex-wrap gap-2 text-white text-sm">
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                {/* SVG for bedroom icon */}
                {/* <svg>...</svg> */}
                {prop.bedrooms}-Bedroom
              </span>
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                {/* SVG for bathroom icon */}
                {/* <svg>...</svg> */}
                {prop.bathrooms}-Bathroom
              </span>
              <span className="bg-[#091F5B] px-3 py-1 rounded-full flex items-center gap-1">
                {/* SVG for type icon */}
                {/* <svg>...</svg> */}
                {prop.type}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-[#000]">
                Starting Price
                <br />
                <h6>{prop.price}</h6>
              </div>
              <button
                style={{ fontWeight: "600" }}
                className="bg-logoColor hover:bg-logoColor/90 text-white transition"
              >
                View Property Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-between items-center text-sm text-blue-600">
        <span>01 of 60</span>
        <div className="flex gap-2 justify-end items-center">
          <div className="p-[10px] size-[44px] rounded-full  border border-gray-300">
            {/* SVG for previous button */}
            {/* <svg>...</svg> */}
          </div>
          <div className="p-[10px] size-[44px] rounded-full bg-logoBlue ">
            {/* SVG for next button */}
            {/* <svg>...</svg> */}
          </div>
        </div>
      </div>
    </section>
  );
}