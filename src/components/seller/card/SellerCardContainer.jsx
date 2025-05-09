import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";

const baseUrl = import.meta.env.VITE_APP_URL;

const SellerCardContainer = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [heroData, setHeroData] = useState([]);

  const dashboardItems = [
    {
      label: "Admin",
      link: "/admin/user",
      value: adminData || 0,
      icon: (
        <MdOutlineAdminPanelSettings className="text-2xl   transition-all duration-700" />
      ),
    },
    {
      label: "Total Enquiry",
      link: "/admin/we-enquiry",
      value: enquiryData || 0,
      icon: <BsChatDots className="text-2xl   transition-all duration-700" />,
    },
    {
      label: "Hero Cards",
      link: "/admin/hero",
      value: heroData || 0,
      icon: <CiCreditCard1 className="text-2xl   transition-all duration-700" />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, enquiryRes,heroRes] = await Promise.all([
          fetch(`${baseUrl}/admin`),
          fetch(`${baseUrl}/enquiry`),
          fetch(`${baseUrl}/hero`),
        ]);
        const [adminResult, enquiryResult,heroResult] = await Promise.all([
          adminRes.json(),
          enquiryRes.json(),
          heroRes.json(),
        ]);
        setAdminData(adminResult.length);
        setEnquiryData(enquiryResult.length);
        setHeroData(heroResult.length);
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
          <div className="h-[70px] w-[70px] mb-3 bg-gray-100   transition-all duration-700 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SellerCardContainer;
