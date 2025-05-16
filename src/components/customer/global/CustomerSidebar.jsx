import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FiCalendar,
  FiFileText,
  FiHeart,
  FiSearch,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { MdContentPaste, MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNav, setIsMobileNav] = useState(false);

  const sections = [
    {
      title: "Main",
      items: [
        { icon: <MdOutlineDashboard />, label: "Dashboard", link: "/customer" },

        // {
        //   icon: <FiSearch />,
        //   label: "Browse Properties",
        //   link: "/projects",
        // },
        {
          icon: <MdContentPaste />,
          label: "My Listings",
          link: "/customer/my-listings",
        },
        // {
        //   icon: <FiFileText />,
        //   label: "My Transactions",
        //   link: "/customer/transactions",
        // },
        {
          icon: <FiTrendingUp />,
          label: "Activities",
          link: "/customer/activities",
        },
        // {
        //   icon: <FiCalendar />,
        //   label: "Site Visits & Appointments",
        //   link: "/customer/appointments",
        // },
        // {
        //   icon: <FiUsers />,
        //   label: "My Agents / Brokers",
        //   link: "/customer/agents",
        // },
      ],
    },
    {
      title: "Administration",
      items: [
       
        {
          icon: <FaTasks />,
          label: "Lead Management",
          link: "/customer/lead-management",
        },
      ],
    },
    {
      title: "Operations",
      items: [
        {
          icon: <BsBuildingAdd />,
          label: "Add Property",
          link: "/customer/add-property",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: <CgProfile />,
          label: "Settings & Profile",
          link: "/customer/profile",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("customerAuth");
    navigate("/");
  };

  return (
    <>
      {/* Desktop View */}
      <div className="thin-scrollbar hidden lg:block w-[490px] min-h-screen bg-white text-black overflow-auto shadow-lg">
        <div className="p-5">
          {sections.map((section, index) => (
            <div key={index} className="pb-6">
              <p className="text-gray-900 uppercase mb-3">{section.title}</p>
              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <Link
                    to={item.link}
                    key={idx}
                    className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                      location.pathname === item.link
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                {index === sections.length - 1 && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-4 px-6 rounded-lg w-full font-medium hover:bg-black hover:text-white transition duration-500 gap-3"
                  >
                    <RiLogoutCircleLine /> Logout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden mt-10 sm:mx-8 mx-3 lg:mx-16">
        <button
          onClick={() => setIsMobileNav(!isMobileNav)}
          className="flex w-full items-center mb-5 gap-2 bg-white shadow-md p-5 rounded-lg cursor-pointer"
        >
          <IoMenu className="text-lg" /> Customer Navigation
        </button>
        {isMobileNav && (
          <div className="bg-white shadow-md p-5 rounded-lg">
            {sections.map((section, index) => (
              <div key={index} className="pb-6">
                <p className="text-gray-500 uppercase mb-3">{section.title}</p>
                <div className="space-y-1">
                  {section.items.map((item, idx) => (
                    <Link
                      to={item.link}
                      key={idx}
                      className={`flex items-center py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3 ${
                        location.pathname === item.link
                          ? "bg-black text-white"
                          : ""
                      }`}
                      onClick={() => setIsMobileNav(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  {index === sections.length - 1 && (
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3"
                    >
                      <RiLogoutCircleLine /> Logout
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerSidebar;
