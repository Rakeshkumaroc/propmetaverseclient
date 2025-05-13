// components/ListingManagement.js
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import PropertyTable from "../property/PropertyTable";


const ListingManagement = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            Listing Management
          </p>
          <p className="text-sm leading-[25.9px]">
            Review and manage property listings
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-lg py-4 border-[1px] border-gray-300">
            <CiSearch className="text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search properties"
              className="w-40 outline-none text-sm"
            />
          </div>
        </div>
      </div>
      <PropertyTable searchValue={search} />
    </div>
  );
};

export default ListingManagement;