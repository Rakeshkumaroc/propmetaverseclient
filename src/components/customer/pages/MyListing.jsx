import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar";
import MyListingTable from "../listing/MyListingTable";

const MyListing = () => {
  const [ search, setSearch ] = useState(null);

  return (
    <>
      <CustomerNavbar />
      <div className="flex flex-1">
        <CustomerSidebar />
        <div className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Properties</h1>
            <Link
              to="/seller/add-property"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
            >
              Add New Property <GoArrowUpRight className="text-xl" />
            </Link>
          </header>
          <section className="my-8 bg-white shadow rounded p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
                <CiSearch className="text-xl" />
                <input
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search properties..."
                  className="w-40 md:w-64 outline-none text-sm bg-gray-100"
                />
              </div>
            </div>
            <MyListingTable searchValue={search} />
          </section>
        </div>
      </div>
    </>
  );
};

export default MyListing;