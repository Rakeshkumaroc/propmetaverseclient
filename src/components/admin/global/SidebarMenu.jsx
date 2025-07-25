import {
  LayoutDashboard,
  MessageSquare,
  Megaphone,
  Users,
  Share2,
  BadgePercent,
  FileText,
  LifeBuoy,
  User2,
  LogOut,
  Pencil,
} from "lucide-react"; // Or use @heroicons/react

import { Link } from "react-router-dom";

const SidebarMenu = () => {
  return (
    <aside className="w-[666px]  p-4 space-y-6  font-medium">
      {/* MAIN */}
      <div>
        <h6
          style={{
            color: "#1865A4",
          }}
          className="text-[32px]  mb-3"
        >
          Main
        </h6>
        <ul className="space-y-[16px]">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-logoBlue text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Dashboard
              </span>
            </Link>
          </li>

          <li>
            <div className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100 ">
              <MessageSquare className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Enquiries
              </span>
            </div>
            <ul className="ml-6 mt-1 space-y-1 text-sm">
              <li>
                <Link className="text-[20px] font-[400]" to="/enquiries/hero">
                  Hero Section Enquiry
                </Link>
              </li>
              <li>
                <Link className="text-[20px] font-[400]" to="/enquiries/general">
                  General Enquiry
                </Link>
              </li>
              <li>
                <Link className="text-[20px] font-[400]" to="/enquiries/user">
                  User Preference Enquiry
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/announcements"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100"
            >
              <Megaphone className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Announcements
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* ADMINISTRATION */}
      <div>
        <h6
          style={{
            color: "#1865A4",
          }}
          className="text-[32px]  mb-3"
        >
          Administration
        </h6>
        <ul className="space-y-2">
          <li>
            <div className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100">
              <Users className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                User Management
              </span>
            </div>
            <ul className="ml-6 mt-1 space-y-1 text-sm">
              <li>
                <Link className="text-[20px] font-[400]" to="/admin/sellers">
                  Manage Sellers
                </Link>
              </li>
              <li>
                <Link className="text-[20px] font-[400]" to="/admin/customers">
                  View Customers
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/leads"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Lead Management
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/commissions"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100"
            >
              <BadgePercent className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Commission Management
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/listings"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100"
            >
              <FileText className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Listing Management
              </span>
            </Link>
          </li>

          <li>
            <div className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100">
              <LifeBuoy className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Training & Support Management
              </span>
            </div>
            <ul className="ml-6 mt-1 text-sm">
              <li>
                <Link className="text-[20px] font-[400]" to="/training">
                  Training Materials
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* ACCOUNT */}
      <div>
        <h6
          style={{
            color: "#1865A4",
          }}
          className="text-[32px]  mb-3"
        >
          Account
        </h6>
        <ul className="space-y-2">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100"
            >
              <Pencil className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                My Profile
              </span>
            </Link>
          </li>
          <li>
            <button className="flex items-center gap-2 p-[17px]  rounded-full bg-gray-100 w-full text-left">
              <LogOut className="w-4 h-4" />
              <span className="text-[24px] leading-[20px] font-[400]">
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarMenu;
