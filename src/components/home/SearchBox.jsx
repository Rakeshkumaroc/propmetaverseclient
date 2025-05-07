import { RiHome6Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../App";
import axios from "axios"; // Added axios import
const baseUrl = import.meta.env.VITE_APP_URL;

const SearchBox = () => {
  const [isHideSearch, setIsHideSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { propertyData } = useContext(MyContext);
  const [filteredData, setFilteredData] = useState([]);
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  // Existing useEffect for filtering
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search || propertyType || status || bhkType) {
        setIsHideSearch(true);
        const results = propertyData.filter((item) => {
          const matchesSearch = search
            ? [
                "title",
                "description",
                "address",
                "city",
                "state",
                "constructionYear",
              ].some((key) => {
                const value = item[key] != null ? String(item[key]) : "";
                return value.toLowerCase().includes(search.toLowerCase());
              })
            : true;
          const matchesType = propertyType
            ? item.propertyType === propertyType
            : true;
          const matchesStatus = status ? item.status === status : true;
          const matchesBhk = bhkType
            ? item.floorPlan.some((plan) =>
                plan.type.toLowerCase().replaceAll(" ", "") ===
                bhkType.toLowerCase().replaceAll(" ", "")
              )
            : true;
          return matchesSearch && matchesType && matchesStatus && matchesBhk;
        });
        setFilteredData(results);
        setSelectedIndex(results.length > 0 ? 0 : -1);
      } else {
        setFilteredData([]);
        setSelectedIndex(-1);
        setIsHideSearch(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, propertyType, status, bhkType, propertyData]);

  // Existing useEffect for handling outside clicks
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Updated handleSearchSubmit to save search history
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredData[selectedIndex]) {
      const { title, _id } = filteredData[selectedIndex];

      // Save search history for authenticated users
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (customerAuth && customerAuth.token) {
        try {
          // Construct query string from search and filters
          const queryParts = [];
          if (search) queryParts.push(search);
          if (propertyType) queryParts.push(`Type: ${propertyType}`);
          if (status) queryParts.push(`Status: ${status}`);
          if (bhkType) queryParts.push(`BHK: ${bhkType}`);
          const query = queryParts.join(", ") || "Empty search";

          await axios.post(
            `${baseUrl}/save-search-history`,
            { query },
            {
              headers: {
                Authorization: `Bearer ${customerAuth.token}`,
              },
            }
          );
          console.log("Search history saved:", query);
        } catch (error) {
          console.error(
            "Error saving search history:",
            error.response?.data?.message || error.message
          );
          // Continue navigation even if saving fails
        }
      }

      // Navigate to the selected property
      navigate(`/projects/${title.replaceAll(" ", "-")}/${_id}`);
    } else {
      alert("Please select a property from the list.");
    }
  };

  const handleKeyDown = (e) => {
    if (filteredData.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
        );
      } else if (e.key === "Enter") {
        handleSearchSubmit(e);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600";
      case "Sold":
        return "bg-red-100 text-red-600";
      case "Rented":
        return "bg-yellow-100 text-yellow-600";
      case "Under Construction":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleSearchSubmit}
        className="flex relative top-8 sm:top-12 md:top-16 z-20 w-full flex-col sm:flex-row gap-4 p-4 bg-white shadow-xl rounded-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex items-center gap-2 p-3 bg-gray-50 rounded-lg w-full transition-all duration-200 focus-within:ring-2 focus-within:ring-logoColor/50">
            <RiHome6Line className="text-xl text-gray-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Enter an property name, address, price, state, or city"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />
          </div>
          {/* Filter Button for Mobile */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden ml-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <FaFilter className="h-5 w-5" />
          </button>
        </div>

        {/* Filters - Hidden on mobile by default, shown on sm+ */}
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
            <option value="">Any</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK</option>
          </select>
        </div>

        <button
          type="submit"
          className="group flex items-center justify-center w-full sm:w-auto bg-logoColor hover:bg-logoColor/90 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSearchOutline className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </form>

      {isHideSearch && filteredData.length > 0 && (
        <div
          ref={dropdownRef}
          className="relative top-10 sm:top-14 md:top-20 animate-in fade-in duration-300"
        >
          <div className="absolute w-full bg-white shadow-lg rounded-xl border border-gray-100 max-h-[300px] overflow-y-auto z-10">
            {filteredData.map(
              (
                { _id, title, propertyType, address, galleryImg, floorPlan, status },
                index
              ) => {
                const isString = typeof galleryImg[0] === "string";
                const fileName = isString
                  ? galleryImg[0].split(/[/\\]/).pop()
                  : null;
                const fileUrl = isString
                  ? `${baseUrl}/uploads/property/${fileName}`
                  : null;
                return (
                  <div
                    onClick={() => {
                      navigate(
                        "/projects/" + title.replaceAll(" ", "-") + "/" + _id
                      );
                    }}
                    key={index}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${
                      index === selectedIndex ? "bg-green-100" : ""
                    } ${index === 0 ? "rounded-t-xl" : ""} ${
                      index === filteredData.length - 1 ? "rounded-b-xl" : ""
                    }`}
                  >
                    <img
                      src={fileUrl}
                      alt={title}
                      className="rounded-lg w-12 h-12 object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-semibold text-gray-800">
                        {title}
                        <span className="text-gray-500">
                          {" "}
                          ({propertyType})
                        </span>{" "}
                        <span className={` ${getStatusClass(status)}`}>
                          ({status})
                        </span>
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                        {address} -{" "}
                        {floorPlan.map((plan) => plan.type).join(", ")}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;