import { CiSearch } from "react-icons/ci";
import EnquiryTable from "../enquiry/EnquiryTable";
import {  useState } from "react"; 

const Enquiry = () => {
  const [search, setSearch] = useState(null);
 
  return (
    <div className="bg-white overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-2xl md:text-[48px] ">Website Enquiry</h1>
            <div className="flex items-center  justify-between gap-2 mt-4 md:mt-0 text-sm text-gray-700">
              <p className="text-gray-600 mt-1">
                We are glad to see you again!
              </p>
              
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-full py-4 border-[1px] border-gray-300 ">
            <CiSearch className="text-xl" />
            <input
              type="text"
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search"
              className="w-40 outline-none text-sm"
            />
          </div>
        </div>
      </div>
      <EnquiryTable searchValue={search} />
    </div>
  );
};

export default Enquiry;
