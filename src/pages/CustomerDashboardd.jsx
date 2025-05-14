import React from "react";
import {
  FiCompass,
  FiSearch,
  FiBell,
  FiUsers,
  FiHeart,
  FiFileText,
  FiTrendingUp,
  FiCalendar, 
} from "react-icons/fi";
import { MdOutlineDashboard, MdContentPaste } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";

const CustomerDashboardd = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://propmetaverse.com/assets/logopng-BXERHkCM.png"
            alt="Logo"
            className="h-10 "
          />
        </div>
        <div className="flex-1 mx-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Property / Location"
              className="w-full pl-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoBlue"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-logoBlue">
            <FiBell className="text-2xl" />
          </button>
          <div className="flex items-center space-x-2">
            <CgProfile className="text-2xl" />
            <div>
              <span className="font-semibold">Rakesh Kumar</span>
              <span className="text-sm text-gray-500 block">Buyer/Seller</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md p-4">
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <MdOutlineDashboard className="mr-2 text-xl" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiSearch className="mr-2 text-xl" /> Browse Properties
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <MdContentPaste className="mr-2 text-xl" /> My Listings
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiHeart className="mr-2 text-xl" /> Saved Properties
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiFileText className="mr-2 text-xl" /> My Transactions
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiTrendingUp className="mr-2 text-xl" /> Market Trends
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiCalendar className="mr-2 text-xl" /> Site Visits & Appointments
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <FiUsers className="mr-2 text-xl" /> My Agents / Brokers
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-100 rounded-md"
            >
              <CgProfile className="mr-2 text-xl" /> Settings & Profile
            </a>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          <div className="flex space-x-6">
            {/* Seller Overview (Left Side - 50%) */}
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MdContentPaste className="mr-2" /> Seller Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">My Listings</h3>
                  <p>
                    Active Listings: 3{" "}
                    <a href="#" className="text-logoBlue">
                      [View/Edit Listing]
                    </a>
                  </p>
                  <p>Views Today: 105</p>
                  <p>Leads / Inquiries: 12</p>
                  <p>Scheduled Visits: 2 Today | 4 This Week</p>
                  <p>Avg. Days on Market: 18 Days</p>
                  <p>Ad Boost Status: 2 Boosted | 1 Normal</p>
                </div>
                <button className="bg-logoBlue text-white px-4 py-2 rounded-md hover:bg-logoBlue/90 flex items-center">
                  <FaTasks className="mr-2" /> Add New Property
                </button>
                <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center">
                  <span>Mini Chart: Views Over Time</span>
                </div>
              </div>
            </div>

            {/* Buyer Overview (Right Side - 50%) */}
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiHeart className="mr-2" /> Buyer Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">My Buying Activity</h3>
                  <p>Saved Properties: 6</p>
                  <p>Shortlisted: 2</p>
                  <p>Upcoming Site Visits: 1 Today | 3 Scheduled</p>
                  <p>Offers Made: 1 Pending | 1 Accepted</p>
                  <p>Loan Pre-Approval Status: ✅ Approved ₹1.2 Cr</p>
                </div>
                <button className="bg-logoBlue text-white px-4 py-2 rounded-md hover:bg-logoBlue/90 flex items-center">
                  <FiCalendar className="mr-2" /> Schedule a Site Visit
                </button>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-medium">Smart Suggestions</h4>
                  <p>Top 3 Matches Based on Your Preferences</p>
                  <div className="mt-2 space-y-2">
                    <div className="h-16 bg-gray-200 rounded-md"></div>
                    <div className="h-16 bg-gray-200 rounded-md"></div>
                    <div className="h-16 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Widgets */}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardd;
