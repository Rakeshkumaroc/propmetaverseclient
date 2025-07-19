// components/Projects.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import MarkerMap from "../components/projects/MarkerMap";
import PropertyListing from "../components/projects/PropertyListing";
import FilterBox from "../components/projects/FilterBox";
import AllProjects from "../components/projects/AllProjects";
import RealEstateBanner from "../components/global/RealEstateBanner";
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
        console.log("data", data);

      
        console.log("data", data);

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
        console.log("mappedProperties", mappedProperties);

        setProperties(mappedProperties);
        setFilteredData(mappedProperties); // Initialize filteredData with approved properties
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
      <AllProjects properties={filteredData.length > 0 ? filteredData : []} />
      {/* <PropertyListing
        properties={filteredData.length > 0 ? filteredData : []}
      />  */}

      <RealEstateBanner />
      <Footer />
    </>
  );
};

export default Projects;
