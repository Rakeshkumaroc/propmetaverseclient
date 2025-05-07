import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import HeroTable from "../hero/HeroTable";
import { Link } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState(null);

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">Hero</p>
          <p className="text-sm leading-[25.9px]">
            We are glad to see you again!
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-lg py-4 border-[1px] border-gray-300 ">
            <CiSearch className="text-xl" />
            <input
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="w-40 outline-none text-sm"
            />
          </div>
          <Link
            to={"/admin/add-hero"}
            className="text-[15px] px-2 md:px-5 py-4 flex items-center bg-black rounded-lg text-white"
          >
            Add New Hero <GoArrowUpRight className="text-xl" />
          </Link>
        </div>
      </div>
      <HeroTable searchValue={search} />
    </div>
  );
};

export default Hero; 