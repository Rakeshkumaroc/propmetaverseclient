import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import TrendingProjectCard from "../TrendingProjectCard";
const baseUrl = import.meta.env.VITE_APP_URL;

const categories = ["View All", "Residential", "Commercial", "Plot or Land"];

const TrendingProjects = () => {
  const [activeCategory, setActiveCategory] = useState("View All");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch data from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data); // Your duplication logic
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on active category and limit to 6
  const filtered =
    activeCategory === "View All"
      ? properties.slice(0, 6) // Limit to 6 for "View All"
      : properties.filter((p) => p.propertyType === activeCategory).slice(0, 6); // Limit to 6 for specific categories

  const handleExploreMore = () => {
    navigate("/projects"); // Redirect to projects tab
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="md:py-28 py-10 px-6 md:px-16 lg:px-40 bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-logoColor">
          Most Trending Projects
        </h2>
        {/* Subtitle */}
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          we carefully select the finest real estate projects for you, ensuring
          top locations, trusted developers, and future-ready homes that match
          your lifestyle and investment goals.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-5 py-2 rounded text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-logoColor text-white shadow-md scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:shadow-sm"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <span className="absolute inset-0 -z-10 bg-logoColor rounded opacity-20 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div key={proj._id}>
            <TrendingProjectCard
              id={proj._id}
              propertyType={proj.propertyType}
              title={proj.title}
              location={`${proj.city}, ${proj.state}`}
              price={proj.price?`₹${proj.price.toLocaleString()}`:null} // Adjust currency if needed
              date={
                proj.constructionYear ? proj.constructionYear.toString() : "N/A"
              }
              developer={proj.developer ? proj.developer : "Unknown"}
              image={
                proj.galleryImg[0]
                  ? `${baseUrl}/uploads/property/${proj.galleryImg[0]}`
                  : "https://propmetaverse.com/assets/logopng-BXERHkCM.png"
              }
            />
          </div>
        ))}
      </div>
      {/* Call to Action */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8 animate-fadeIn">
          No projects found for this category. Explore other options!
        </p>
      )}
      {/* Explore More Button or No Results */}
      <div className="text-center mt-10">
        {filtered.length > 6 && (
          <button
            onClick={handleExploreMore}
            className=" bg-logoBlue text-white px-5 py-2 rounded hover:logoBlue/90  font-medium transition-all duration-200 transform hover:scale-105"
          >
            Explore More
          </button>
        )}
      </div>
    </div>
  );
};

export default TrendingProjects;
