import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiCompass, FiUsers } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { MdContentCopy, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdContentPaste } from "react-icons/md"; // Added for new tabs
import { IoMdNotificationsOutline } from "react-icons/io";
const baseUrl = import.meta.env.VITE_APP_URL;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminNav, setIsAdminNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const sections = [
    {
      title: "Main",
      items: [
        { icon: <FiCompass />, label: "Dashboard", link: "/" },

        {
          icon: <MdOutlineMarkUnreadChatAlt />,
          label: "Enquiries", // Review relevance
          link: "/enquiry",
        },
        {
          icon: <MdContentCopy />,
          label: "Hero Section",
          nested: [
            { label: "Heros", link: "/hero" },
            { label: "Add Heros", link: "/add-hero" },
          ],
        },
        {
          icon: <IoMdNotificationsOutline />,
          label: "Announcements",
          link: "/announcements",
        },
      ].filter(Boolean),
    },
    {
      title: "Administration",
      items: [
        {
          icon: <FiUsers />,
          label: "User Management",
          nested: [
            { label: "Manage Sellers", link: "/manage-sellers" },
            { label: "View Customers", link: "/view-customers" },
          ],
        },
        {
          icon: <FaTasks />,
          label: "Lead Management",
          link: "/lead-management",
        },
        {
          icon: <LiaMoneyCheckAltSolid />,
          label: "Commission Management",
          link: "/commission-management",
        },
        {
          icon: <MdContentPaste />,
          label: "Listing Management",
          link: "/listing-management",
        },
        // {
        //   icon: <CgProfile />,
        //   label: "Document Management",
        //   link: "/document-management",
        // },
        {
          icon: <FaTasks />,
          label: "Training & Support",
          nested: [
            { label: "Training Materials", link: "/training-materials" },
            // { label: "Support Tickets", link: "/support-tickets" },
          ],
        },
      ].filter(Boolean),
    },
    // {
    //   title: "Analytics",
    //   items: [
    //     {
    //       icon: <FiCompass />,
    //       label: "Performance Reports",
    //       link: "/performance-reports",
    //     },
    //   ].filter(Boolean),
    // },
    {
      title: "Account",
      items: [
        { icon: <CgProfile />, label: "My Profile", link: "/my-profile" },
      ].filter(Boolean),
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) return alert("User not found in localStorage.");
        const response = await fetch(`${baseUrl}/single-user/${user._id}`);
        if (response.ok) {
          const result = await response.json();
          if (result.password !== user.password) {
            localStorage.removeItem("user");
            navigate("/");
          }
        } else {
          alert("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred. Please try again.");
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <>
      <div className="thin-scrollbar hidden pt-[50px] lg:block w-[590px] min-h-screen bg-white text-black overflow-auto shadow-lg">
        <div className=" px-4 sm:px-6 md:px-20 ">
         
          {sections.map((section, index) => (
            <div key={index} className="pb-[94px]">
              <h6
                style={{
                  color: "#1865A4",
                  fontSize:"24px"
                }}
                className=" uppercase  mb-3"
              >
                {section.title}
              </h6>
              <div className="space-y-[16px]">
                {section.items.map((item, idx) => {
                  if (item.nested) {
                    return (
                      <ul key={idx}>
                        <li
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.label ? null : item.label
                            )
                          }
                          className={`flex items-center gap-2 p-[17px]  rounded-full  ${
                            item.nested.some(
                              (nest) =>
                                location.pathname === `/admin${nest.link}`
                            )
                              ? "bg-[#BAD6EB] text-white"
                              : "bg-gray-100"
                          }`}
                         
                        >
                          {item.icon}
                          <span className="text-[20px] leading-[20px] font-[400]">{item.label}</span>
                        </li>
                        
                        {openDropdown === item.label && (
                          <div className="pl-10 space-y-[16px]">
                            {item.nested.map((nestedItem, nestedIdx) => (
                              <Link
                                key={nestedIdx}
                                to={`/admin${nestedItem.link}`}
                                className={`text-[20px] font-[400] flex items-center py-3 mt-1 px-6 rounded-lg hover:bg-logoBlue hover:text-white transition duration-500 ${
                                  location.pathname ===
                                  `/admin${nestedItem.link}`
                                    ? "bg-logoBlue text-white"
                                    : "bg-gray-100"
                                }`}
                              >
                                {nestedItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </ul>
                    );
                  }
                  return (
                    <Link
                      to={`/admin${item.link}`}
                      key={idx}
                     

                       className={`flex items-center gap-2 p-[17px]  rounded-full  ${ 
                                location.pathname === `/admin${item.link}` 
                              ? "bg-logoBlue text-white"
                              : "bg-gray-100"
                          }`}
                    >
                      {item.icon}
                      <span className="text-[20px] leading-[20px] font-[400]">{item.label}</span>
                    </Link>
                  );
                })}
                {index === sections.length - 1 && (
                  <p
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                    className="flex text-[20px] leading-[20px] font-[400] items-center py-4 px-6 rounded-lg w-full   hover:bg-black hover:text-white transition duration-500 gap-3"
                  >
                    <RiLogoutCircleLine /> Logout
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden mt-10 sm:mx-8 mx-3 lg:mx-16">
        <button
          onClick={() => setIsAdminNav(!isAdminNav)}
          className="flex w-full items-center mb-5 gap-2 bg-white shadow-md p-5 rounded-lg cursor-pointer"
        >
          <IoMenu className="text-lg" /> Dashboard Navigation
        </button>
        {isAdminNav && (
          <div className="bg-white shadow-md p-5 rounded-lg">
            {sections.map((section, index) => (
              <div key={index} className="pb-6">
                <p className="text-gray-500 uppercase mb-3">{section.title}</p>
                <div className="space-y-[16px]">
                  {section.items.map((item, idx) => {
                    if (item.nested) {
                      return (
                        <div key={idx}>
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === item.label ? null : item.label
                              )
                            }
                            className={`flex items-center w-full py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3 ${
                              item.nested.some(
                                (nest) =>
                                  location.pathname === `/admin${nest.link}`
                              )
                                ? "bg-black text-white"
                                : ""
                            }`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                          {openDropdown === item.label && (
                            <div className="pl-10 space-y-[16px]">
                              {item.nested.map((nestedItem, nestedIdx) => (
                                <Link
                                  key={nestedIdx}
                                  to={`/admin${nestedItem.link}`}
                                  className={`flex items-center py-3 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 ${
                                    location.pathname ===
                                    `/admin${nestedItem.link}`
                                      ? "bg-black text-white"
                                      : ""
                                  }`}
                                  onClick={() => setIsAdminNav(false)}
                                >
                                  {nestedItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link
                        to={`/admin${item.link}`}
                        key={idx}
                        className={`flex items-center py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3 ${
                          location.pathname === `/admin${item.link}`
                            ? "bg-black text-white"
                            : ""
                        }`}
                        onClick={() => setIsAdminNav(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  {index === sections.length - 1 && (
                    <p
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                      className="flex w-full items-center py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3"
                    >
                      <RiLogoutCircleLine /> Logout
                    </p>
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

export default Sidebar;
