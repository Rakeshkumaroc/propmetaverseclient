import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FiHeart,
  FiTrendingUp,
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
        // icon: <FiHeart />,
        // label: "Saved Properties",
        // link: "/customer/saved-properties",
        // },
        {
          icon: <MdContentPaste />,
          label: "My Listings",
          link: "/customer/my-listings",
        },
        {
          icon: <FiTrendingUp />,
          label: "Search history",
          link: "/customer/search",
        },
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
      <div className="thin-scrollbar hidden lg:block w-[280px] xl:w-[320px] 2xl:w-[380px] min-h-screen bg-white text-black overflow-auto shadow-lg sticky top-0"> {/* Adjusted width and added sticky */}
        <div className="p-5">
          {sections.map((section, index) => (
            <div key={index} className="pb-6">
              <p className="text-gray-900 uppercase mb-3 text-sm font-semibold">{section.title}</p> {/* Adjusted text size and weight */}
              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <Link
                    to={item.link}
                    key={idx}
                    className={`flex items-center py-3 px-4 rounded-lg font-medium text-base hover:bg-black hover:text-white transition duration-300 gap-3 ${ // Adjusted padding, font size, and transition
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
                    className="flex items-center py-3 px-4 rounded-lg w-full font-medium text-base hover:bg-black hover:text-white transition duration-300 gap-3" // Adjusted padding, font size, and transition
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
      <div className="block lg:hidden mx-3 sm:mx-8 md:mx-10 mt-4"> {/* Adjusted margin-top and horizontal margins */}
        <button
          onClick={() => setIsMobileNav(!isMobileNav)}
          className="flex w-full items-center mb-5 gap-2 bg-white shadow-md p-4 rounded-lg cursor-pointer text-lg font-medium justify-center" // Adjusted padding, font size, and centering
        >
          <IoMenu className="text-xl" /> Customer Navigation
        </button>
        {isMobileNav && (
          <div className="bg-white shadow-md p-5 rounded-lg mb-8"> {/* Added margin-bottom */}
            {sections.map((section, index) => (
              <div key={index} className="pb-6">
                <p className="text-gray-500 uppercase mb-3 text-sm font-semibold">{section.title}</p> {/* Adjusted text size and weight */}
                <div className="space-y-1">
                  {section.items.map((item, idx) => (
                    <Link
                      to={item.link}
                      key={idx}
                      className={`flex items-center py-3 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300 gap-3 ${ // Adjusted padding, font size, and transition
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
                      className="flex w-full items-center py-3 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300 gap-3" // Adjusted padding, font size, and transition
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