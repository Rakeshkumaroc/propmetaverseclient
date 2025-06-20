import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import CustomerLeadTable from "../CustomerLead/CustomerLeadTable"; // Assuming this is where your table is

const CustomerLeadManagement = () => {
  const [search, setSearch] = useState(""); // Initialize with an empty string for consistency

  return (
    <>
      <CustomerNavbar />
      {/* Main content area: Flex container for sidebar and dashboard content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]"> {/* Added min-h and adjusted flex direction */}
        {/* CustomerSidebar is handled for responsiveness internally or via external control */}
        <CustomerSidebar />
        {/* Main dashboard content - takes up remaining space */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 mt-4 lg:mt-0"> {/* Adjusted padding and removed fixed w-full */}
          {/* Header section with title */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8"> {/* Adjusted flex for responsiveness */}
            <h1 className="text-xl sm:text-3xl font-bold">Lead Management</h1> {/* Adjust font size for mobile */}
          </header>

          {/* Search and Lead Table Section */}
          <section className="my-4 sm:my-8 bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8"> {/* Adjusted padding */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6"> {/* Adjusted flex for responsiveness */}
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 w-full sm:max-w-xs"> {/* Full width on mobile, max-width on sm+ */}
                <CiSearch className="text-xl text-gray-600" />
                <input
                  value={search} // Use 'search' directly
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search leads..."
                  className="w-full outline-none text-sm bg-gray-100 text-gray-800 placeholder-gray-500" // Input takes full width of its parent div
                />
              </div>
            </div>
            {/* CustomerLeadTable Component - will need its own internal responsiveness */}
            <CustomerLeadTable searchValue={search} />
          </section>
        </div>
      </div>
    </>
  );
};

export default CustomerLeadManagement;