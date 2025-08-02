import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import HeroTable from "../hero/HeroTable";

const Hero = () => {
  const [search, setSearch] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Hero Section
          </h2>
          <p className="text-base text-gray-600">
            We are glad to see you again!
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex w-full md:w-fit items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-md transition">
            <CiSearch className="text-2xl text-gray-700" />
            <input
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search heroes..."
              className="w-48 outline-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>
          <Link
            to="/admin/add-hero"
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            Add New Hero
            <GoArrowUpRight className="text-xl" />
          </Link>
        </div>
      </div>
      <HeroTable searchValue={search} />
    </div>
  );
};

export default Hero;