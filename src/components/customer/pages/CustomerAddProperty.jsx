import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../App";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import BasicInformation from "../../seller/AddProperty/BasicInformation";
import Media from "../../seller/AddProperty/Media";
import Location from "../../seller/AddProperty/Location";
import Configuration from "../../seller/AddProperty/Configuration";
import Keywords from "../../seller/AddProperty/Keywords";
import Amenities from "../../seller/AddProperty/Amenities";
import Faq from "../../seller/AddProperty/Faq";

const baseUrl = import.meta.env.VITE_APP_URL;

const dummyPropertyData = {
  _id: "dummy_1",
  title: "Sample Oceanview Condo",
  description: "A luxurious condo with stunning ocean views and modern amenities.",
  propertyType: "Condo",
  status: "Available",
  constructionYear: "2023",
  discount: "5",
  galleryImg: [
    "https://res.cloudinary.com/demo/image/upload/sample1.jpg",
    "https://res.cloudinary.com/demo/image/upload/sample2.jpg",
  ],
  floorPlanImg: [
    {
      img: "https://res.cloudinary.com/demo/image/upload/sample_floor1.jpg",
      info: "2BHK Floor Plan",
    },
  ],
  reraImg: [
    {
      img: "https://res.cloudinary.com/demo/image/upload/sample_rera1.jpg",
      no: "RERA12345",
    },
  ],
  address: "123 Beach Road",
  state: "California",
  city: "San Diego",
  floorPlan: [
    {
      type: "2BHK",
      carpetArea: "1200",
      price: "450000",
    },
  ],
  faqs: [
    {
      question: "Is parking available?",
      answer: "Yes, two parking spaces are included.",
    },
  ],
  keywords: [
    {
      heading: "Features",
      keyword: ["Ocean View", "Modern Kitchen", "Balcony"],
    },
  ],
  amenities: ["Swimming Pool", "Gym", "Security"],
};

const CustomerAddProperty = ({ action }) => {
  const [isActive, setIsActive] = useState(1);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { setFormData } = useContext(MyContext);
  const [isDummyData, setIsDummyData] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch(`${baseUrl}/single-property/${id}`);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        if (!data || Object.keys(data).length === 0) {
          // Use dummy data if API returns empty or invalid data
          setFormData({
            ...dummyPropertyData,
            galleryImg: dummyPropertyData.galleryImg || [],
            floorPlanImg:
              dummyPropertyData.floorPlanImg?.map((item) => ({
                file: null,
                preview: item.img, // Use Cloudinary URL directly
                info: item.info || "",
              })) || [],
            reraImg:
              dummyPropertyData.reraImg?.map((item) => ({
                file: null,
                preview: item.img, // Use Cloudinary URL directly
                no: item.no || "",
              })) || [],
          });
          setIsDummyData(true);
        } else {
          setFormData({
            ...data,
            galleryImg: data.galleryImg || [], // Use Cloudinary URLs directly
            floorPlanImg:
              data.floorPlanImg?.map((item) => ({
                file: null,
                preview: item.img, // Use Cloudinary URL directly
                info: item.info || "",
              })) || [],
            reraImg:
              data.reraImg?.map((item) => ({
                file: null,
                preview: item.img, // Use Cloudinary URL directly
                no: item.no || "",
              })) || [],
          });
          setIsDummyData(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to dummy data on error
        setFormData({
          ...dummyPropertyData,
          galleryImg: dummyPropertyData.galleryImg || [],
          floorPlanImg:
            dummyPropertyData.floorPlanImg?.map((item) => ({
              file: null,
              preview: item.img, // Use Cloudinary URL directly
              info: item.info || "",
            })) || [],
          reraImg:
            dummyPropertyData.reraImg?.map((item) => ({
              file: null,
              preview: item.img, // Use Cloudinary URL directly
              no: item.no || "",
            })) || [],
        });
        setIsDummyData(true);
      }
    }

    if (action === "edit") {
      getData();
    } else {
      setFormData({
        title: "",
        description: "",
        propertyType: "",
        status: "",
        purpose: "",
        constructionYear: "",
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
        floorPlan: [{ type: "", carpetArea: "", parking: 0, balcony: 0, price: "", sellingArea: "" }],
        faqs: [{ question: "", answer: "" }],
        keywords: [{ heading: "", keyword: [] }],
        amenities: [],
      });
      setIsDummyData(false);
    }
  }, [action, id, setFormData]);

  return (
    <>
      <CustomerNavbar />
      {/* Main layout container: stacks vertically on small screens, row on large screens */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        <CustomerSidebar />
        {/* Main content area: responsive padding and top margin */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 mt-4 lg:mt-0"> {/* Adjusted padding and mt for responsiveness */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8"> {/* Stack on mobile, row on sm+, adjusted margin */}
            <h1 className="text-2xl sm:text-3xl font-bold"> {/* Adjusted font size for mobile */}
              {action === "edit" ? "Edit Property" : "Add New Property"}
            </h1>
          </header>
          <section className="my-4 sm:my-8 bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8"> {/* Adjusted padding and margin */}
            {isDummyData && (
              <div className="text-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4"> {/* Adjusted font size and margin for mobile */}
                Showing sample data for demonstration purposes.
              </div>
            )}
            {/* Tab Navigation: flex-wrap for smaller screens, responsive gap */}
            <ul className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4 md:gap-x-6 border-b border-gray-200 mb-6"> {/* Added gap-y for wrapping, adjusted gap-x */}
              {[
                "1. Basic",
                "2. Configuration",
                "3. Location",
                "4. Media",
                "5. Keywords",
                "6. Faq",
                "7. Amenities",
              ].map((tab, index) => (
                <li
                  key={index}
                  onClick={() => setIsActive(index + 1)}
                  className={`cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap ${ /* Adjusted padding, font size, and added whitespace-nowrap */
                    isActive === index + 1
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="mt-4 sm:mt-6"> {/* Adjusted top margin for content */}
              {isActive === 1 && <BasicInformation setIsActive={setIsActive} />}
              {isActive === 2 && <Configuration setIsActive={setIsActive} />}
              {isActive === 3 && <Location setIsActive={setIsActive} />}
              {isActive === 4 && <Media setIsActive={setIsActive} />}
              {isActive === 5 && <Keywords setIsActive={setIsActive} />}
              {isActive === 6 && <Faq setIsActive={setIsActive} />}
              {isActive === 7 && (
                <Amenities action={action} setIsActive={setIsActive} page={'customer'} />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CustomerAddProperty;