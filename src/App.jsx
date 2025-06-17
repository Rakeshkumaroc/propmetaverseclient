import React, { createContext, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MyContext = createContext();
const baseUrl = import.meta.env.VITE_APP_URL;

const App = () => {
  const enquiryRef = useRef(false); 
  const [propertyData, setPropertyData] = useState([]);
  const [siteName, setSiteName] = useState("Prop Metaverse");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    status: "",
    purpose: "", // Add purpose
    constructionYear: "",
    price: "",
    discount: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    googleMap: "",
    galleryImg: [],
    floorPlanImg: [],
    reraImg: [],
    floorPlan: [
      {
        type: "",
        carpetArea: "",
        parking: 0,
        balcony: 0,
        price: "",
        sellingArea: "",
      },
    ], // Include sellingArea and parking
    faqs: [{ question: "", answer: "" }],
    keywords: [{ heading: "", keyword: [] }],
    amenities: [],
  });

  useEffect(() => {
    const getFun = async () => {
      try {
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (Array.isArray(result)) {
          // Filter for approved properties only
          const approvedProperties = result.filter(
            (item) => item.approveStatus === "approved"
          );
          setPropertyData(approvedProperties.reverse());
        } else {
          console.error("Invalid response format:", result);
          setPropertyData([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setPropertyData([]);
      }
    };
    getFun();
  }, []);

  return (
    <MyContext.Provider
      value={{
        formData,
        setFormData,
        propertyData,
        setPropertyData,
        siteName,
        setSiteName,
        enquiryRef,
      }}
    >
      <Layout />
      <ToastContainer autoClose={3000} />
    </MyContext.Provider>
  );
};

export default App;
