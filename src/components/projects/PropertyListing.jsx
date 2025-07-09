import React, { useState, useMemo } from "react";
import TrendingProjectCard from "../TrendingProjectCard";
import Pagination from "../Pagination";
const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyListing = ({ properties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage, setPropertiesPerPage] = useState(9);
  const [sortOption, setSortOption] = useState("Default");

  // Memoize sorted properties to avoid redundant sorting
  const sortedProperties = useMemo(() => {
    const sorted = [...properties].sort((a, b) => {
      if (sortOption === "Newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "Price (low to high)") return a.price - b.price;
      if (sortOption === "Price (high to low)") return b.price - a.price;
      return 0; // Default sorting
    });
    return sorted;
  }, [properties, sortOption]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);
  // Ensure currentPage is valid
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);

  // Update currentPage if it becomes invalid (e.g., after filtering)
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const indexOfLastProperty = validCurrentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = sortedProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page on sort
  };

  const handlePerPageChange = (number) => {
    setPropertiesPerPage(number);
    setCurrentPage(1); // Reset to first page
  };

  // Define per-page options, capped by total properties
  const perPageOptions = [3, 6, 9, 12, 15, 30].filter(
    (num) => num <= sortedProperties.length || num === 3
  );

 

  return (
    <div className="bg-gray-50 md:py-10 py-5 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40">
      {/* Dropdown Filters */}
      <div className="flex justify-end gap-4 mb-6">
        {/* Per Page Dropdown */}
        <div className="relative">
          <label htmlFor="per-page" className="sr-only">
            Properties per page
          </label>
          <select
            id="per-page"
            className="bg-white border border-gray-300 text-gray-900 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={propertiesPerPage}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
            title="Select number of properties per page"
          >
            {perPageOptions.map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Sort properties
          </label>
          <select
            id="sort"
            className="bg-white border border-gray-300 text-gray-900 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            title="Sort properties"
          >
            <option value="Default">Default</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Price (low to high)">Price: Low to High</option>
            <option value="Price (high to low)">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Property Cards */}
      {currentProperties.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {currentProperties.map((proj) => (
            <TrendingProjectCard
              key={proj._id}
              id={proj._id}
              propertyType={proj.propertyType}
              title={proj.title}
              location={`${proj.city}, ${proj.state}`}
              price={ proj.floorPlan?.[0]?.price
                  ? `₹${proj.floorPlan[0].price.toLocaleString("en-IN")}`
                  : "Price on Request"} 
            
              date={
                proj.constructionYear ? proj.constructionYear.toString() : "N/A"
              }
              developer={proj.developer || "Unknown"}
              image={
                proj.galleryImg[0]
                  ? `${proj.galleryImg[0]}`
                  : "https://via.placeholder.com/400"
              }
              amenities={proj.amenities.slice(0, 3)} // Show top 3 amenities
              keywords={
                proj.keywords.flatMap((k) => k.keyword).slice(0, 3) // Show top 3 keywords
              }
              
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No properties found.
        </p>
      )}

      {/* Pagination: Show only if more than 6 properties */}
      {sortedProperties.length > 6 && totalPages > 1 && (
        <Pagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PropertyListing;
