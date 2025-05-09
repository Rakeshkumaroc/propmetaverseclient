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

const SellerSidebar = () => {
  const location = useLocation();
  // const lastEndpoint = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [isAdminNav, setIsAdminNav] = useState(false);
  const [user, setUser] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [data, setData] = useState(null);
 const [status, setStatus] = useState("active");
  // useEffect(()=>{
  //  const sellerData=JSON.parse(localStorage.getItem("sellerData"));
  //  console.log(sellerData,"dd")
  // setData(sellerData)
  // },[])

  useEffect(() => {
    const storedData = localStorage.getItem("sellerId");
    if (storedData) {
      const sellerData = (storedData);
      console.log(sellerData, "dd");
      setData(sellerData);
    } else {
      console.warn("No sellerData found in localStorage.");
      navigate("/seller-sign-in")
    }
  }, []);
  const sections = [
    {
      title: "Main",
      items: [
       
           { icon: <FiCompass />, label: "Dashboard", link: "/seller-dashboard" }
          ,
        // {
        //   icon: <MdOutlineMarkUnreadChatAlt />,
        //   label: "Enquiries",
        //   nested: [
        //     {
        //       label: "Women’s EPM",
        //       link: "/we-enquirys",
        //     },
        //     {
        //       label: "DAMAC Property",
        //       link: "/damac-enquirys",
        //     },
        //   ],
        // },
        // {
        //   icon: <MdOutlineAdminPanelSettings />,
        //   label: "Users",
        //   link: "/user-no",
        // },
        // {
        //   icon: <MdContentCopy />,
        //   label: "Heros",
        //   link: "/hero-no",
        // },
      status==="active"?
        { icon: <LuBuilding2 />, label: "Property", link: "/property" }
         : null,
      ].filter(Boolean),
     
    },
    {
      title: "Operations",
      items: [
        // { icon: <LuUserRoundPlus />, label: "Add User", link: "/add-user-no" },
        // { icon: <MdContentPaste />, label: "Add Hero", link: "/add-hero-no" },
       
        status==="active"? {
          icon: <BsBuildingAdd />,
          label: "Add Property",
          link: "/add-property",
        }:null,
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
                            <div className="pl-10 space-y-1 ">
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

// import { RiLogoutCircleLine } from "react-icons/ri";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   MdOutlineAdminPanelSettings,
//   MdOutlineMarkUnreadChatAlt,
// } from "react-icons/md";
// import { LuUserRoundPlus, LuBuilding2 } from "react-icons/lu";
// import { BsBuildingAdd } from "react-icons/bs";
// import Logo from "../../../assets/logopng.png";
// import { FaRegUserCircle } from "react-icons/fa";

// const SellerSidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="thin-scrollbar hidden lg:block w-96 min-h-screen bg-white text-black overflow-auto shadow-lg">
//         <div className="p-7">
//           <img src={Logo} alt="logo" className="w-40 mb-5" />
//           {/* MAIN SECTION */}
//           <div className="pb-6">
//             <p className="text-gray-900 uppercase mb-3">Main</p>

//             <div className="space-y-1">
//               <Link
//                 to="/admin/properties"
//                 className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                   location.pathname === "/admin/properties"
//                     ? "bg-black text-white"
//                     : ""
//                 }`}
//               >
//                 <LuBuilding2 />
//                 <span>All Properties</span>
//               </Link>

//               <Link
//                 to="/admin/messages"
//                 className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                   location.pathname === "/admin/messages"
//                     ? "bg-black text-white"
//                     : ""
//                 }`}
//               >
//                 <MdOutlineMarkUnreadChatAlt />
//                 <span>Messages</span>
//               </Link>
//             </div>

//             {/* OPERATIONS SECTION */}
//             <div className="mb-6">
//               <p className="text-gray-900 uppercase mb-3">Operations</p>
//               <div className="space-y-1">
//                 <Link
//                   to="/admin/dashboard"
//                   className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                     location.pathname === "/admin/dashboard"
//                       ? "bg-black text-white"
//                       : ""
//                   }`}
//                 >
//                   <MdOutlineAdminPanelSettings />
//                   <span>Dashboard</span>
//                 </Link>

//                 <Link
//                   to="/admin/add-user"
//                   className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                     location.pathname === "/admin/add-user"
//                       ? "bg-black text-white"
//                       : ""
//                   }`}
//                 >
//                   <LuUserRoundPlus />
//                   <span>Add User</span>
//                 </Link>

//                 <Link
//                   to="/admin/add-property"
//                   className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                     location.pathname === "/admin/add-property"
//                       ? "bg-black text-white"
//                       : ""
//                   }`}
//                 >
//                   <BsBuildingAdd />
//                   <span>Add Property</span>
//                 </Link>

//               <Link
//                 to="/admin/profile"
//                 className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
//                   location.pathname === "/admin/profile"
//                     ? "bg-black text-white"
//                     : ""
//                 }`}
//               >
//                 <FaRegUserCircle />
//                 <span>My Profile</span>
//               </Link>

//               </div>
//             </div>

//             {/* LOGOUT */}
//             <button
//               onClick={logout}
//               className="flex items-center py-4 px-6 rounded-lg w-full font-medium hover:bg-black hover:text-white transition duration-500 gap-3"
//             >
//               <RiLogoutCircleLine />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SellerSidebar;
