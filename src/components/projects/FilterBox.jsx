import { RiHome6Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; 

const FilterBox = ({ filteredData, setFilteredData, properties }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1); // Fixed initial value
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let results = properties;

      if (search || propertyType || status || bhkType) {
        results = properties.filter((item) => {
          const matchesSearch = search
            ? [
              "title",
              "description",
              "address",
              "city",
              "state",
              "constructionYear",
            ].some((key) => {
              // Convert item[key] to string before applying toLowerCase
              const value = item[key] != null ? String(item[key]) : "";
              return value.toLowerCase().includes(search.toLowerCase());
            })
            : true;
          const matchesType = propertyType
            ? item.propertyType === propertyType
            : true;
          const matchesStatus = status ? item.status === status : true; 
          const matchesBhk = bhkType
          ? 
            item.floorPlan.some((plan) => plan.type.toLowerCase().replaceAll(' ','') === bhkType.toLowerCase().replaceAll(' ',''))
          : true;

          return matchesSearch && matchesType && matchesStatus && matchesBhk;
        });
      } 

      setFilteredData(results);
      setSelectedIndex(results.length > 0 ? 0 : -1);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, propertyType, status, bhkType, properties, setFilteredData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredData[selectedIndex]) {
      const { title, _id } = filteredData[selectedIndex];
      navigate(`/projects/${title.replaceAll(" ", "-")}/${_id}`);
    } else {
      alert("Please select a property from the list.");
    }
  };
  const handleResetFilters = () => {
    setSearch("");
    setPropertyType("");
    setStatus("");
    setBhkType("");
    setFilteredData(properties);
    setSelectedIndex(-1);
    setShowFilters(false);
  };

  return (
    <div className="relative w-full  mx-auto bg-gray-50   px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40">
      <form
        onSubmit={handleSearchSubmit}
        className="flex relative -top-10 z-20 w-full flex-col sm:flex-row gap-4 p-4 bg-white shadow-xl rounded-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex items-center gap-2 p-3 bg-gray-50 rounded-lg w-full transition-all duration-200 focus-within:ring-2 focus-within:ring-logoColor/50">
            <RiHome6Line className="text-xl text-gray-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Enter a property name, address, price, state, or city"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden ml-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <FaFilter className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={filterRef}
          className={`${
            showFilters ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-4 w-full ${
            showFilters ? "animate-in fade-in duration-200" : ""
          }`}
        >
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="p-3 bg-gray-50 rounded-lg w-full text-gray-700 text-sm md:text-base border border-gray-200 focus:ring-2 focus:ring-logoColor/50 focus:outline-none transition-all duration-200"
          >
            <option value="">Property Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot or Land">Plot or Land</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 bg-gray-50 rounded-lg w-full text-gray-700 text-sm md:text-base border border-gray-200 focus:ring-2 focus:ring-logoColor/50 focus:outline-none transition-all duration-200"
          >
            <option value="">Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          <select
            value={bhkType}
            onChange={(e) => setBhkType(e.target.value)}
            className="p-3 bg-gray-50 rounded-lg w-full text-gray-700 text-sm md:text-base border border-gray-200 focus:ring-2 focus:ring-logoColor/50 focus:outline-none transition-all duration-200"
          >
            <option value="">Configuration</option>
            <option value="Any">Any</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="group flex items-center justify-center w-full sm:w-auto bg-logoColor hover:bg-logoColor/90 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <IoSearchOutline className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center justify-center w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;