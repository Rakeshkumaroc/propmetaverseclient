import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../App";
import Navbar from "../components/global/Navbar";
import AgentsSection from "../components/home/AgentsSection";
import Footer from "../components/global/Footer";
import Header from "../components/property-details/Header";
import PropertyHeader from "../components/property-details/PropertyHeader";
import Overview from "../components/property-details/Overview";
import Enquiry from "../components/property-details/Enquiry";
import Description from "../components/property-details/Description";
import Amenities from "../components/property-details/Amenities";
import Faq from "../components/property-details/Faq";
import AboutDeveloper from "../components/property-details/AboutDeveloper";
import GoogleMap from "../components/property-details/GoogleMap";
import FloorPlan from "../components/property-details/FloorPlan";
import Gallery from "../components/property-details/Gallery";
import Rera from "../components/property-details/Rera";
import FloorPlanImg from "../components/property-details/FloorPlanImg";
import RatingSystem from "../components/property-details/RatingSystem";
import EmiCalculator from "../components/property-details/EmiCalculator";
const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyDetailsPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({});
  const { setSiteName } = useContext(MyContext);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  // console.log("kkkkkkkkk", propertyDetails);
  const getFun = async () => {
    let response = await fetch(baseUrl + "/single-property/" + id);
    response = await response.json();
    // console.log(response.rera && response.rera);
    setPropertyDetails(response);
    setSiteName(response.title);
    document.title =
      response.title + "PROP METAVERSE PRIVATE LIMITED | PROPERTY DETAILS";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getFun();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Header
        galleryImg={
          propertyDetails.galleryImg ? propertyDetails.galleryImg : []
        }
      />
      <div className="px-2 md:px-10 lg:px-20 xl:px-28 2xl:px-40 py-4 rounded grid  -mt-52   ">
        {propertyDetails &&
        (propertyDetails.title ||
          propertyDetails.price ||
          propertyDetails.status ||
          propertyDetails.address ||
          propertyDetails.constructionYear) ? (
          <PropertyHeader
            price={propertyDetails.price}
            title={propertyDetails.title}
            status={propertyDetails.status}
            address={propertyDetails.address}
            constructionYear={propertyDetails.constructionYear}
            id={propertyDetails._id}
          />
        ) : null}
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-6 w-full ">
          <div className="  col-span-2 rounded ">
            {propertyDetails &&
            (propertyDetails.propertyType ||
              propertyDetails.developer ||
              propertyDetails.price) ? (
              <Overview
                propertyType={propertyDetails.propertyType}
                developer={propertyDetails.developer}
                price={propertyDetails.price}
              />
            ) : null}
            {propertyDetails && propertyDetails.description ? (
              <Description description={propertyDetails.description} />
            ) : null}
            {propertyDetails && propertyDetails.amenities ? (
              <Amenities amenities={propertyDetails.amenities} />
            ) : null}

            {propertyDetails &&
              Array.isArray(propertyDetails.floorPlan) &&
              propertyDetails.floorPlan.length > 0 &&
              propertyDetails.floorPlan[0].carpetArea !== "" && (
                <FloorPlan
                  id={propertyDetails._id}
                  product={propertyDetails.floorPlan}
                />
              )}

            {propertyDetails &&
              Array.isArray(propertyDetails.galleryImg) &&
              propertyDetails.galleryImg.length > 0 &&
              propertyDetails.galleryImg[0] !== "" && (
                <Gallery galleryImg={propertyDetails.galleryImg} />
              )}
            {propertyDetails && propertyDetails.aboutDeveloper ? (
              <AboutDeveloper
                developer={propertyDetails.developer}
                aboutDeveloper={propertyDetails.aboutDeveloper}
              />
            ) : null}

            {propertyDetails &&
              Array.isArray(propertyDetails.floorPlanImg) &&
              propertyDetails.floorPlanImg.length > 0 &&
              propertyDetails.floorPlanImg[0].info !== "" && (
                <FloorPlanImg floorPlanImg={propertyDetails.floorPlanImg} />
              )}

            {propertyDetails && propertyDetails.googleMap ? (
              <GoogleMap googleMap={propertyDetails.googleMap} />
            ) : null}

            {propertyDetails &&
              Array.isArray(propertyDetails.faqs) &&
              propertyDetails.faqs.length > 0 &&
              propertyDetails.faqs[0].carpetArea !== "" && (
                <Faq faqs={propertyDetails.faqs} />
              )}
            {propertyDetails &&
              Array.isArray(propertyDetails.reraImg) &&
              propertyDetails.reraImg.length > 0 &&
              propertyDetails.reraImg[0].no !== "" && (
                <Rera reraImg={propertyDetails.reraImg} />
              )}

            {propertyDetails && Array.isArray(propertyDetails.ratings) && (
              <RatingSystem
                propertyRatings={propertyDetails.ratings}
                propertyId={propertyDetails._id}
                getFunc={getFun}
              />
            )}
          </div>
          <div className="col-span-2 space-y-5 lg:col-span-1">
            <EmiCalculator />
            <Enquiry />
          </div>
        </div>
      </div>
      <AgentsSection />

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;
