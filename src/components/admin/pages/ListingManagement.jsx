import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import PropertyTable from "../property/PropertyTable";

const ListingManagement = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Listing Management
          </h2>
          <p className="text-base text-gray-600">
            Review and manage property listings
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex w-full md:w-fit items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-md transition">
            <CiSearch className="text-2xl text-gray-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search properties..."
              className="w-48 outline-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <PropertyTable searchValue={search} />
    </div>
  );
};

export default ListingManagement;