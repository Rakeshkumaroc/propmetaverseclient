import { useState, useEffect, useRef, useContext } from "react";
import { FaSearch, FaFilter } from "react-icons/fa"; // Added FaFilter import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../App";

const baseUrl = import.meta.env.VITE_APP_URL;

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHideSearch, setIsHideSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef(null);
  const filterRef = useRef(null); 
  const navigate = useNavigate();
  const { propertyData } = useContext(MyContext);

  // Filtering useEffect with case-insensitive & trimmed comparisons
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search || propertyType || status || bhkType) {
        setIsHideSearch(true);
        const results = propertyData.filter((item) => {
          const matchesSearch = search
            ? ["title", "description", "address", "city", "state", "constructionYear"]
                .some((key) =>
                  (item[key] || "")
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
            : true;

          const matchesType = propertyType
            ? item.propertyType
                ?.toLowerCase()
                .trim() === propertyType.toLowerCase().trim()
            : true;

          const matchesStatus = status
            ? item.status
                ?.toLowerCase()
                .trim() === status.toLowerCase().trim()
            : true;

          const matchesBhk = bhkType && bhkType !== "Any"
            ? item.floorPlan?.some((plan) =>
                plan.type
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .trim() === bhkType.toLowerCase().replace(/\s/g, "").trim()
              )
            : true;

          return matchesSearch && matchesType && matchesStatus && matchesBhk;
        });
        setFilteredData(results);
        setSelectedIndex(results.length > 0 ? 0 : -1);
      } else {
        setFilteredData([]);
        setIsHideSearch(false);
        setSelectedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, propertyType, status, bhkType, propertyData]);

  // Click-outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setIsHideSearch(false);
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Submit handler
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredData[selectedIndex]) {
      const { title, _id } = filteredData[selectedIndex];
      const query = [search, `Type: ${propertyType}`, `Status: ${status}`, `BHK: ${bhkType}`]
        .filter(Boolean)
        .join(", ");
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

      if (customerAuth?.token) {
        try {
          await axios.post(
            `${baseUrl}/save-search-history`,
            { query },
            { headers: { Authorization: `Bearer ${customerAuth.token}` } }
          );
        } catch (err) {
          console.error("Search history error:", err);
        }
      }

      navigate(`/projects/${title.replaceAll(" ", "-")}/${_id}`);
    } else {
      alert("Please select a property from the list.");
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (filteredData.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredData.length - 1));
      } else if (e.key === "Enter") {
        handleSearchSubmit(e);
      }
    }
  };

  return (
    <div className="flex items-center w-full px-4 md:absolute bottom-20 z-50">
      <div className="max-w-screen-xl mx-auto relative">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full bg-white shadow-md px-4 md:px-8 py-6 flex flex-col md:flex-row gap-4 md:gap-20 items-center justify-between rounded-md"
        >
          {/* Search Input */}
          <div className="flex items-center w-fit gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name, address, city..."
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded w-full md:w-[180px] h-[50px] focus:outline-logoColor"
            />
            <div
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 bg-gray-50 rounded text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <FaFilter className="text-lg" />
            </div>
          </div>

          {/* Filters */}
          <div
            ref={filterRef}
            className={`w-full ${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-4 md:gap-20`}
          >
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded w-full md:w-[180px] h-[50px]"
            >
              <option value="">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot or Land">Plot or Land</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded w-full md:w-[180px] h-[50px]"
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
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded w-full md:w-[180px] h-[50px]"
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-logoColor text-white px-6 py-3 rounded shadow flex items-center gap-2 w-full md:w-auto justify-center hover:bg-logoColor/90 transition"
          >
            <FaSearch className="text-white text-lg" />
            <span className="font-medium">Search</span>
          </button>
        </form>

        {/* Dropdown Results */}
        {isHideSearch && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-2 w-full max-w-screen-xl mx-auto bg-white shadow-lg rounded-xl border border-gray-100 max-h-[300px] overflow-y-auto z-40"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/projects/${item.title.replaceAll(" ", "-")}/${item._id}`)
                  }
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${
                    index === selectedIndex ? "bg-green-100" : ""
                  } ${index === 0 ? "rounded-t-xl" : ""} ${
                    index === filteredData.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  <img
                    src={item.galleryImg?.[0]}
                    alt={item.title}
                    className="rounded-lg w-12 h-12 object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-semibold text-gray-800">
                      {item.title} <span className="text-gray-500">({item.propertyType})</span>{" "}
                      <span className="text-blue-600">({item.status})</span>
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                      {item.address} - {item.floorPlan?.map((plan) => plan.type).join(", ")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No matching properties found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
