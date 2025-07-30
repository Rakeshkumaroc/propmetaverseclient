import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../App";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Amenities from "../components/property-details/Amenities";
import GoogleMap from "../components/property-details/GoogleMap";
import Rera from "../components/property-details/Rera";
import FloorPlanImg from "../components/property-details/FloorPlanImg";
import RatingSystem from "../components/property-details/RatingSystem";
import EmiCalculator from "../components/property-details/EmiCalculator";
import Pricing from "../components/property-details/Pricing";
import EnquiryPopup from "../components/global/EnquiryPopup";
import PropertyGallery from "../components/property-details/PropertyGallery";
import DescriptionCard from "../components/property-details/DescriptionCard";
import FAQSlider from "../components/property-details/FAQSlider";
import InquiryEnquiryMerged from "../components/property-details/InquiryEnquiryMerged";

const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyDetailsPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({});
  const { setSiteName } = useContext(MyContext);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

  const getFun = async () => {
    try {
      let response = await fetch(`${baseUrl}/single-property/${id}`);
      response = await response.json();
      setPropertyDetails(response);
      setSiteName(response.title);
      document.title =
        response.title + " | PROP METAVERSE PRIVATE LIMITED | PROPERTY DETAILS";
    } catch (error) {
      console.error("Failed to fetch property details:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getFun();
  }, [id]);

  return (
    <div>
      <Navbar />
      <PropertyGallery
        title={propertyDetails.title}
        galleryImg={propertyDetails.galleryImg || []}
        price={
          propertyDetails.floorPlan?.[0]?.price
            ? `${propertyDetails.floorPlan[0].price.toLocaleString("en-IN")}`
            : "Price on Request"
        }
        address={propertyDetails.address}
      />
      <div className="w-full bg-black relative mb-[93px] sm:mb-[60px]">
        <div className="w-full px-2 sm:px-4 md:px-10 lg:px-24 bg-white">
          <div className="flex flex-col lg:flex-row gap-6">
            {propertyDetails &&
              propertyDetails._id &&
              propertyDetails.title &&
              propertyDetails.description &&
              Array.isArray(propertyDetails.floorPlan) &&
              propertyDetails.floorPlan.length > 0 &&
              propertyDetails.floorPlan.every((plan) => plan.carpetArea) && (
                <DescriptionCard
                  id={propertyDetails._id}
                  title={propertyDetails.title}
                  description={propertyDetails.description}
                  floorPlan={propertyDetails.floorPlan}
                />
              )}
            {Array.isArray(propertyDetails.amenities) &&
              propertyDetails.amenities.length > 0 && (
                <Amenities amenities={propertyDetails.amenities} />
              )}
          </div>

          {Array.isArray(propertyDetails.floorPlan) &&
            propertyDetails.floorPlan.length > 0 &&
            propertyDetails.floorPlan[0].carpetArea !== "" && (
              <Pricing
                id={propertyDetails._id}
                product={propertyDetails.floorPlan}
              />
            )}

          {Array.isArray(propertyDetails.floorPlanImg) && (
            <FloorPlanImg
              floorPlanImg={propertyDetails.floorPlanImg}
              setIsEnquiryFormOpen={setIsEnquiryFormOpen}
            />
          )}

          {propertyDetails.googleMap && (
            <GoogleMap googleMap={propertyDetails.googleMap} />
          )}

          {Array.isArray(propertyDetails.faqs) &&
            propertyDetails.faqs.length > 0 &&
            propertyDetails.faqs[0].carpetArea !== "" && (
              <FAQSlider faqs={propertyDetails.faqs} />
            )}

          <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-40 w-full">
            {Array.isArray(propertyDetails.reraImg) &&
              propertyDetails.reraImg.length > 0 &&
              propertyDetails.reraImg[0].no !== "" && (
                <Rera reraImg={propertyDetails.reraImg} />
              )}

            <EmiCalculator
              developer={propertyDetails.developer}
              constructionYear={propertyDetails.constructionYear}
            />
          </div>

          <InquiryEnquiryMerged />

          {Array.isArray(propertyDetails.ratings) && (
            <RatingSystem
              propertyRatings={propertyDetails.ratings}
              propertyId={propertyDetails._id}
              getFunc={getFun}
            />
          )}
        </div>
      </div>

      <Footer />
      <EnquiryPopup
        isOpen={isEnquiryFormOpen}
        setIsOpen={setIsEnquiryFormOpen}
        propertyId={id}
      />
    </div>
  );
};

export default PropertyDetailsPage;
