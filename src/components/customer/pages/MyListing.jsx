import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import MyListingTable from "../listing/MyListingTable";

const MyListing = () => {
  const [search, setSearch] = useState(""); // Initialize with an empty string for consistency

  return (
    <>
      <CustomerNavbar />
      {/* Main content area: Flex container for sidebar and dashboard content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]"> {/* Added min-h and adjusted flex direction */}
        {/* CustomerSidebar is hidden on small screens and shown on lg screens */}
        <CustomerSidebar />
        {/* Main dashboard content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 mt-4 lg:mt-0"> {/* Adjusted padding and removed fixed w-full */}
          {/* Header section with title and Add Property button */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h2 className="text-3xl font-bold">My Properties</h2>
            <Link
              to="/customer/add-property"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
            >
              Add New Property <GoArrowUpRight className="text-xl" />
            </Link>
          </header>

          {/* Search and Listing Table Section */}
          <section className="my-4 sm:my-8 bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 w-full sm:max-w-xs"> {/* Adjusted width for search input container */}
                <CiSearch className="text-xl" />
                <input
                  value={search} // Use 'search' directly
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search properties..."
                  className="w-full outline-none text-sm bg-gray-100" // Input takes full width of its parent div
                />
              </div>
            </div>
            {/* MyListingTable Component - Crucial for its internal responsiveness */}
            <MyListingTable searchValue={search} />
          </section>
        </div>
      </div>
    </>
  );
};

export default MyListing;