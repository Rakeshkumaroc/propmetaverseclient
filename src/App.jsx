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
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);

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



  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate for desktop and mobile
    window.googleTranslateElementInit = () => {
      // Desktop widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,en,es,fr,de", // Add more languages as needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      // Mobile widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,en,es,fr,de,ar", // Add more languages as needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element_mobile"
      );
      setIsTranslateLoaded(true);
    };

    // Cleanup script on component unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
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
        isTranslateLoaded
      }}
    >
      <Layout />
      <ToastContainer autoClose={3000} />
    </MyContext.Provider>
  );
};

export default App;
