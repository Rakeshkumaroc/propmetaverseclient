import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineMarkUnreadChatAlt,
} from "react-icons/md";
import { LuUserRoundPlus, LuBuilding2 } from "react-icons/lu";
import { BsBuildingAdd } from "react-icons/bs";
import Logo from "../../../assets/logopng.png";
import { FaRegUserCircle } from "react-icons/fa";

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="thin-scrollbar hidden lg:block w-96 min-h-screen bg-white text-black overflow-auto shadow-lg">
        <div className="p-7">
          <img src={Logo} alt="logo" className="w-40 mb-5" />
          {/* MAIN SECTION */}
          <div className="pb-6">
            <p className="text-gray-900 uppercase mb-3">Main</p>

            <div className="space-y-1">
              <Link
                to="/admin/properties"
                className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                  location.pathname === "/admin/properties"
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                <LuBuilding2 />
                <span>All Properties</span>
              </Link>

              <Link
                to="/admin/messages"
                className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                  location.pathname === "/admin/messages"
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                <MdOutlineMarkUnreadChatAlt />
                <span>Messages</span>
              </Link>
            </div>

            {/* OPERATIONS SECTION */}
            <div className="mb-6">
              <p className="text-gray-900 uppercase mb-3">Operations</p>
              <div className="space-y-1">
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <MdOutlineAdminPanelSettings />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/admin/add-user"
                  className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                    location.pathname === "/admin/add-user"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <LuUserRoundPlus />
                  <span>Add User</span>
                </Link>

                <Link
                  to="/admin/add-property"
                  className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                    location.pathname === "/admin/add-property"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <BsBuildingAdd />
                  <span>Add Property</span>
                </Link>

               
              <Link
                to="/admin/profile"
                className={`flex items-center py-4 px-6 rounded-lg font-medium hover:bg-black hover:text-white transition duration-500 gap-3 ${
                  location.pathname === "/admin/profile"
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                <FaRegUserCircle />
                <span>My Profile</span>
              </Link>
            
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="flex items-center py-4 px-6 rounded-lg w-full font-medium hover:bg-black hover:text-white transition duration-500 gap-3"
            >
              <RiLogoutCircleLine />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSidebar;