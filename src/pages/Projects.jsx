// components/Projects.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import AgentsSection from "../components/home/AgentsSection";
import Footer from "../components/global/Footer";
import MarkerMap from "../components/projects/MarkerMap";
import PropertyListing from "../components/projects/PropertyListing";
import FilterBox from "../components/projects/FilterBox";
const baseUrl = import.meta.env.VITE_APP_URL;

const Projects = () => {
  const [properties, setProperties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();

        // Filter for approved properties only
        const approvedProperties = Array.isArray(data)
          ? data.filter((item) => item.approveStatus === "approved")
          : [];
        setProperties(approvedProperties);
        setFilteredData(approvedProperties); // Initialize filteredData with approved properties
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <MarkerMap
        properties={filteredData.length > 0 ? filteredData : properties}
      />
      <FilterBox
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        properties={properties}
      />
      <PropertyListing
        properties={filteredData.length > 0 ? filteredData : []}
      />
      <AgentsSection />
      <Footer />
    </>
  );
};

export default Projects;