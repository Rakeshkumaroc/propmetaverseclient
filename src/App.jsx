import React, { createContext, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const MyContext = createContext();
const baseUrl = import.meta.env.VITE_APP_URL;

const App = () => {
  const enquiryRef = useRef(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [damacIsPopUpOpen, setDamacIsPopUpOpen] = useState(false);
  const [propertyData, setPropertyData] = useState();
  const [siteName, setSiteName] = useState("Prop Metaverse");
  const [formData, setFormData] = useState({
    // Basic Property Information
    title: "",
    description: "",
    propertyType: "",
    status: "",
    developer: "",
    aboutDeveloper: "",
    constructionYear: "",
    price: "",
    discount: "",

    // Media
    galleryImg: [],
    floorPlanImg: [],
    reraImg: [],

    // Location Details
    address: "",
    state: "",
    city: "",
    googleMap: "",

    //Details
    floorPlan: [{ type: "", carpetArea: "", price: "" }],
    faqs: [{ question: "", answer: "" }],

    // keyword
    keywords: [{ heading: "", keyword: [] }],

    // amenities
    amenities: [],
  });

  useEffect(() => {
    const getFun = async () => {
      let result = await fetch(baseUrl + "/property");
      result = await result.json();
      setPropertyData(result.reverse());
    };
    getFun();
  }, []);

  return (
    <MyContext.Provider
      value={{
        formData,
        setFormData,
        isPopUpOpen,
        setIsPopUpOpen,
        damacIsPopUpOpen,
        setDamacIsPopUpOpen,
        propertyData,
        setPropertyData,
        siteName,
        setSiteName,
        enquiryRef
      }}
    >
      <Layout />
      <ToastContainer  autoClose={3000} />
    </MyContext.Provider>
  );
};

export default App;
