import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import CustomerLeadTable from "../CustomerLead/CustomerLeadTable";

const CustomerLeadManagement = () => {
  const [search, setSearch] = useState(null);

  return (
    <>
      <CustomerNavbar />
      <div className="flex flex-1">
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Lead Management</h1>
          </header>
          <section className="my-8 bg-white shadow rounded p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
                <CiSearch className="text-xl text-gray-600" />
                <input
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search leads..."
                  className="w-40 md:w-64 outline-none text-sm bg-gray-100 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            <CustomerLeadTable searchValue={search} />
          </section>
        </div>
      </div>
    </>
  );
};

export default CustomerLeadManagement;