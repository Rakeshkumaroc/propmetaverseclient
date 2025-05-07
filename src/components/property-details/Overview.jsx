import { Building } from "lucide-react";
import React from "react";
import { GiPriceTag } from "react-icons/gi";
import { MdDeveloperBoard } from "react-icons/md";

const Overview = ({propertyType,developer,price}) => {
  return (
    <>
      <div className="w-full mt-10 px-4 md:px-8">
        <h3 className="text-2xl font-semibold mb-4">Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 group transition-all">
            <Building className="bg-logoBlue/10 group-hover:bg-logoBlue group-hover:text-white text-logoBlue rounded p-2 size-10 transition-all duration-300" />
            <div className="">
              <p className=" text-sm">Type:</p>
              <p className="text-gray-800 font-semibold text-sm md:text-base">{propertyType}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group transition-all">
            <MdDeveloperBoard className="bg-logoBlue/10 group-hover:bg-logoBlue group-hover:text-white text-logoBlue rounded p-2 size-10 transition-all duration-300" />
            <div className="">
              <p className=" text-sm">Developer:</p>
              <p className="text-gray-800 font-semibold text-sm md:text-base">{developer}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group transition-all">
            <GiPriceTag className="bg-logoBlue/10 group-hover:bg-logoBlue group-hover:text-white text-logoBlue rounded p-2 size-10 transition-all duration-300" />
            <div className="">
              <p className=" text-sm">Price:</p>
              <p className="text-gray-800 font-semibold text-sm md:text-base">{price}</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200" />
    </>
  );
};

export default Overview;
