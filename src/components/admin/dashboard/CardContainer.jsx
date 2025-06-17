import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";
import { TfiAnnouncement } from "react-icons/tfi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUserTie, FaUsers, FaAddressBook} from "react-icons/fa6"; // Added FaBookOpen for Training Materials

const baseUrl = import.meta.env.VITE_APP_URL;

const CardContainer = () => {
  const [enquiryData, setEnquiryData] = useState([]); 
  const [heroData, setHeroData] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [listedPropertyData, setListedPropertyData] = useState([]);
  const [sellersData, setSellersData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [leadsData, setLeadsData] = useState([]); 

  const dashboardItems = [
  
    {
      label: "Website Enquiry",
      link: "/admin/enquiry",
      value: enquiryData || 0,
      icon: <BsChatDots className="text-2xl transition-all duration-700" />,
    },
    {
      label: "Hero Cards",
      link: "/admin/hero",
      value: heroData || 0,
      icon: <CiCreditCard1 className="text-2xl transition-all duration-700" />,
    },
    {
      label: "Announcement",
      link: "/admin/announcements",
      value: announcementData || 0,
      icon: (
        <TfiAnnouncement className="text-2xl transition-all duration-700" />
      ),
    },
    {
      label: "Sellers",
      link: "/admin/manage-sellers",
      value: sellersData || 0,
      icon: <FaUserTie className="text-2xl transition-all duration-700" />,
    },
    {
      label: "Customers",
      link: "/admin/view-customers",
      value: customersData || 0,
      icon: <FaUsers className="text-2xl transition-all duration-700" />,
    },
    {
      label: "Buyer Leads",
      link: "/admin/lead-management",
      value: leadsData || 0,
      icon: <FaAddressBook className="text-2xl transition-all duration-700" />,
    },

    {
      label: "Listed Property",
      link: "/admin/listing-management",
      value: listedPropertyData || 0,
      icon: (
        <HiOutlineBuildingOffice2 className="text-2xl transition-all duration-700" />
      ),
    },
 
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          
          enquiryRes,
          heroRes,
          announcementRes,
          propertyRes,
          sellersRes,
          customersRes,
          leadsRes, 
        ] = await Promise.all([ 
          fetch(`${baseUrl}/enquiry`),
          fetch(`${baseUrl}/hero`),
          fetch(`${baseUrl}/announcements`),
          fetch(`${baseUrl}/property`),
          fetch(`${baseUrl}/sellers`),
          fetch(`${baseUrl}/customers`),
          fetch(`${baseUrl}/lead`), 
        ]);

        const [
         
          enquiryResult,
          heroResult,
          announcementResult,
          propertyResult,
          sellersResult,
          customersResult,
          leadsResult, 
        ] = await Promise.all([ 
          enquiryRes.json(),
          heroRes.json(),
          announcementRes.json(),
          propertyRes.json(),
          sellersRes.json(),
          customersRes.json(),
          leadsRes.json(), 
        ]);

        
        setEnquiryData(enquiryResult.length);
        setHeroData(heroResult.length);
        setAnnouncementData(announcementResult.length);
        setListedPropertyData(propertyResult.length);
        setSellersData(sellersResult.length);
        setCustomersData(customersResult.length);
        setLeadsData(leadsResult.length); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 xl:grid-cols-4 gap-5 my-16">
      {dashboardItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="bg-white group p-6 cursor-pointer flex items-center hover:shadow-xl transition-all justify-between rounded-2xl shadow-sm w-full"
        >
          <div>
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-4xl font-semibold leading-[54px]">
              {item.value}
            </p>
          </div>
          <div className="h-[70px] w-[70px] mb-3 bg-gray-100 transition-all duration-700 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardContainer;
