import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiCompass } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { LuBuilding2, LuUserRoundPlus } from "react-icons/lu";
import {
  MdContentCopy,
  MdContentPaste,
  MdOutlineAdminPanelSettings,
  MdOutlineMarkUnreadChatAlt,
} from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logopng.png";
import { useLocation } from "react-router-dom";
import { BsBuildingAdd } from "react-icons/bs";
const baseUrl = import.meta.env.VITE_APP_URL;

const Sidebar = () => {
  const location = useLocation();
  const lastEndpoint = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [isAdminNav, setIsAdminNav] = useState(false);
  const [user, setUser] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const sections = [
    {
      title: "Main",
      items: [
        { icon: <FiCompass />, label: "Dashboard", link: "/" },
        user?.userType === "Admin" || user?.userType === "Sales"
          ? {
              icon: <MdOutlineMarkUnreadChatAlt />,
              label: "Enquiries",
              nested: [
                {
                  label: "Women’s EPM",
                  link: "/we-enquiry",
                },
                {
                  label: "DAMAC Property",
                  link: "/damac-enquiry",
                },
              ],
            }
          : null,
        user?.userType === "Admin"
          ? {
              icon: <MdOutlineAdminPanelSettings />,
              label: "Users",
              link: "/user",
            }
          : null,
        user?.userType === "Admin"
          ? {
              icon: <MdContentCopy />,
              label: "Heros",
              link: "/hero",
            }
          : null,
          { icon: <LuBuilding2 />, label: "Property", link: "/property" },
      ].filter(Boolean),
    },
    {
      title: "Opratations",
      items: [
        user?.userType === "Admin"
          ? { icon: <LuUserRoundPlus />, label: "Add User", link: "/add-user" }
          : null,
        user?.userType === "Admin"
          ? { icon: <MdContentPaste />, label: "Add Hero", link: "/add-hero" }
          : null,
        { icon: <BsBuildingAdd />, label: "Add Property", link: "/add-property" },
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
          setUser(result);

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

  useEffect(() => {
    if (!user?.userType) return;

    if (
      user.userType === "Sales" &&
      ["/user", "/add-user", "/we-enquiry", "/damac-enquiry"].includes(
        `/${lastEndpoint}`
      )
    ) {
      navigate("/admin");
    }

    if (
      user.userType === "Hero" &&
      !["/my-profile", "/"].includes(`/${lastEndpoint}`)
    ) {
      navigate("/admin");
    }
  }, [lastEndpoint, user, navigate]);

  return (
    <>
      <div className="thin-scrollbar hidden lg:block w-96 min-h-screen bg-white text-black overflow-auto shadow-lg">
        <div className="p-7">
          <img src={Logo} alt="logo" className="w-40 mb-5" />
          {sections.map((section, index) => (
            <div key={index} className="pb-6">
              <p className="text-gray-900 uppercase mb-3">{section.title}</p>
              <div className="space-y-1">
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
                          className={`flex items-center w-full py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
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
                          <div className="pl-10 space-y-1">
                            {item.nested.map((nestedItem, nestedIdx) => (
                              <Link
                                key={nestedIdx}
                                to={`/admin${nestedItem.link}`}
                                className={`flex items-center py-3 mt-1 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 ${
                                  location.pathname ===
                                  `/admin${nestedItem.link}`
                                    ? "bg-black text-white"
                                    : ""
                                }`}
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
                      className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                        location.pathname === `/admin${item.link}`
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                {index === sections.length - 1 && (
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
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
                <div className="space-y-1">
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
                            <div className="pl-10 space-y-1 ">
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
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
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

export default Sidebar;