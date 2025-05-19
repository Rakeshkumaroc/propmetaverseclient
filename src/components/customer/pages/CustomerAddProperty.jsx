import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../App";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
// import Amenities from "../customerAddProperty/Amenities";
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
  description:
    "A luxurious condo with stunning ocean views and modern amenities.",
  propertyType: "Condo",
  status: "Available",
  constructionYear: "2023", 
  discount: "5",
  galleryImg: [
    `${baseUrl}/uploads/gallery/sample1.jpg`,
    `${baseUrl}/uploads/gallery/sample2.jpg`,
  ],
  floorPlanImg: [
    {
      img: "sample_floor1.jpg",
      info: "2BHK Floor Plan",
    },
  ],
  reraImg: [
    {
      img: "sample_rera1.jpg",
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
                preview: `${baseUrl}/uploads/floor/${item.img}`,
                info: item.info || "",
              })) || [],
            reraImg:
              dummyPropertyData.reraImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/uploads/rera/${item.img}`,
                no: item.no || "",
              })) || [],
          });
          setIsDummyData(true);
        } else {
          setFormData({
            ...data,
            galleryImg: data.galleryImg?.map((img) => img) || [],
            floorPlanImg:
              data.floorPlanImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/uploads/floor/${item.img}`,
                info: item.info || "",
              })) || [],
            reraImg:
              data.reraImg?.map((item) => ({
                file: null,
                preview: `${baseUrl}/Uploads/rera/${item.img}`,
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
              preview: `${baseUrl}/Uploads/floor/${item.img}`,
              info: item.info || "",
            })) || [],
          reraImg:
            dummyPropertyData.reraImg?.map((item) => ({
              file: null,
              preview: `${baseUrl}/Uploads/rera/${item.img}`,
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
        purpose: "", // Add purpose
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
        floorPlan: [{ type: "", carpetArea: "", parking: 0,balcony:0, price: "", sellingArea: "" }], // Include sellingArea and parking
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
      <div className="flex flex-1">
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {action === "edit" ? "Edit Property" : "Add New Property"}
            </h1>
          </header>
          <section className="my-8 bg-white shadow rounded p-6">
            {isDummyData && (
              <div className="text-center text-sm text-gray-500 mb-4">
                Showing sample data for demonstration purposes.
              </div>
            )}
            <ul className="flex flex-wrap gap-4 md:gap-6 border-b border-gray-200 mb-6">
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
                  className={`cursor-pointer px-4 py-2 text-sm font-semibold border-b-2 ${
                    isActive === index + 1
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              {isActive === 1 && <BasicInformation setIsActive={setIsActive} />}
              {isActive === 2 && <Configuration setIsActive={setIsActive} />}
              {isActive === 3 && <Location setIsActive={setIsActive} />}
              {isActive === 4 && <Media setIsActive={setIsActive} />}
              {isActive === 5 && <Keywords setIsActive={setIsActive} />}
              {isActive === 6 && <Faq setIsActive={setIsActive} />}
              {isActive === 7 && (
                <Amenities action={action} setIsActive={setIsActive} />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CustomerAddProperty;
