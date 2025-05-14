import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiCompass } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logopng.png";
import { useLocation } from "react-router-dom";
import { BsBuildingAdd } from "react-icons/bs";
import { FaTasks } from "react-icons/fa"; // Icon for Lead Management
import { MdOutlineBook } from "react-icons/md";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_URL;

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminNav, setIsAdminNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [status, setStatus] = useState("");

  const fetchSellerDataById = () => {
    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .get(`${baseUrl}/get-seller-data/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result.data.sellerData);
          setStatus(result.data.sellerData.approveStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };
  useEffect(() => {
    const storedData = localStorage.getItem("sellerId");
    if (storedData) {
      const sellerData = storedData;
      console.log(sellerData, "dd");
      fetchSellerDataById();
    } else {
      console.warn("No sellerData found in localStorage.");
      navigate("/seller-sign-in");
    }
  }, []);

  const sections = [
    {
      title: "Main",
      items: [
        { icon: <FiCompass />, label: "Dashboard", link: "/" },
        status === "approved"
          ? { icon: <LuBuilding2 />, label: "Property", link: "/property" }
          : null,
      ].filter(Boolean),
    },
    {
      title: "Administration",
      items: [
        status === "approved"
          ? {
              icon: <FaTasks />,
              label: "Lead Management",
              link: "/seller-leads",
            }
          : null,
        status === "approved"
          ? {
              icon: <LiaMoneyCheckSolid />,
              label: "Commission Management",
              link: "/commissions",
            }
          : null,
      ].filter(Boolean),
    },
    {
      title: "Operations",
      items: [
        status === "approved"
          ? {
              icon: <BsBuildingAdd />,
              label: "Add Property",
              link: "/add-property",
            }
          : null,
        status === "approved"
          ? {
              icon: <MdOutlineBook />,
              label: "Training Resources",
              link: "/seller-training",
            }
          : null,
        status === "approved"
          ? {
              icon: <MdOutlineBook />,
              label: "Notification",
              link: "/seller-notification",
            }
          : null,
        {
          icon: <CgProfile />,
          label: "My Profile",
          link: "/seller-profile",
        },
      ].filter(Boolean),
    },
  ];

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
                                location.pathname === `/seller${nest.link}`
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
                                to={`/seller${nestedItem.link}`}
                                className={`flex items-center py-3 mt-1 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 ${
                                  location.pathname ===
                                  `/seller${nestedItem.link}`
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
                      to={`/seller${item.link}`}
                      key={idx}
                      className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                        location.pathname === `/seller${item.link}`
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
                      localStorage.removeItem("sellerId");
                      localStorage.removeItem("sellerFullName");
                      localStorage.removeItem("token");
                      navigate("/seller-sign-in");
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
                                  location.pathname === `/seller${nest.link}`
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
                                  to={`/seller${nestedItem.link}`}
                                  className={`flex items-center py-3 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 ${
                                    location.pathname ===
                                    `/seller${nestedItem.link}`
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
                        to={`/seller${item.link}`}
                        key={idx}
                        className={`flex items-center py-4 px-6 rounded-lg hover:bg-black hover:text-white transition duration-500 gap-3 ${
                          location.pathname === `/seller${item.link}`
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
                        localStorage.removeItem("sellerId");
                        localStorage.removeItem("sellerFullName");
                        localStorage.removeItem("token");
                        navigate("/seller-sign-in");
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

export default SellerSidebar;
