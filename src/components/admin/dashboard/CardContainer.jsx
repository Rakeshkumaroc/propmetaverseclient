 
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";
import { TfiAnnouncement } from "react-icons/tfi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUserTie, FaUsers, FaAddressBook} from "react-icons/fa6";   

const baseUrl = import.meta.env.VITE_APP_URL;

const CardContainer = () => {
  const [stats, setStats] = useState({
    enquiry: 0,
    hero: 0,
    announcement: 0,
    sellers: 0,
    customers: 0,
    leads: 0,
    listed: 0,
  });

  const dashboardItems = [
    {
      label: "Website Inquiry",
      link: "/admin/enquiry",
      value: stats.enquiry,
      icon: <BsChatDots />,
      note: "10% increase from last week",
    },
    {
      label: "Hero Cards",
      link: "/admin/hero",
      value: stats.hero,
      icon: <CiCreditCard1 />,
      note: "10% increase from last week",
    },
    {
      label: "Announcement",
      link: "/admin/announcements",
      value: stats.announcement,
      icon: <TfiAnnouncement />,
      note: "10% increase from last week",
    },
    {
      label: "Sellers",
      link: "/admin/manage-sellers",
      value: stats.sellers,
      icon: <FaUserTie />,
      note: "2 new listings this week",
    },
    {
      label: "Customers",
      link: "/admin/view-customers",
      value: stats.customers,
      icon: <FaUsers />,
      note: "10% increase from last week",
    },
    {
      label: "Buyer Leads",
      link: "/admin/lead-management",
      value: stats.leads,
      icon: <FaAddressBook />,
      note: "10% increase from last week",
    },
    {
      label: "Listed Properties",
      link: "/admin/listing-management",
      value: stats.listed,
      icon: <HiOutlineBuildingOffice2 />,
      note: "10% increase from last week",
    },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          e, h, a, l, s, c, b
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
          enquiryData,
          heroData,
          announcementData,
          listedData,
          sellersData,
          customersData,
          leadsData,
        ] = await Promise.all([
          e.json(),
          h.json(),
          a.json(),
          l.json(),
          s.json(),
          c.json(),
          b.json(),
        ]);

        setStats({
          enquiry: enquiryData.length,
          hero: heroData.length,
          announcement: announcementData.length,
          sellers: sellersData.length,
          customers: customersData.length,
          leads: leadsData.length,
          listed: listedData.length,
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dashboardItems.map((item, i) => (
        <Link
          to={item.link}
          key={i}
          className="p-5 bg-[#BAD6EB] hover:bg-logoBlue/50 transition rounded-2xl shadow-sm flex flex-col justify-between min-h-[130px]"
        >
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-logoBlue">{item.value}</div>
            <div className="bg-white p-2 rounded-full text-logoBlue text-xl">
              {item.icon}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-800">{item.label}</p>
            <p className="text-xs text-gray-600">{item.note}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardContainer;
