import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiBell, FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { MyContext } from "../../../App";
// Import context for propertyData

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isHideSearch, setIsHideSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const { propertyData } = useContext(MyContext); // Access propertyData from context

  // Fetch user profile (unchanged)
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to continue", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const profileRes = await axios.get(
          `${baseUrl}/customer-profile`,
          config
        );
        setUser(profileRes.data.user);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          toast.error("Session expired. Please log in again.", {
            position: "top-left",
          });
          navigate("/customer-sign-in");
        }
        toast.error("Failed to fetch user data", { position: "top-left" });
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Search filtering logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        setIsHideSearch(true);
        const results = propertyData.filter((item) =>
          ["title", "description", "address", "city", "state"].some((key) => {
            const value = item[key] != null ? String(item[key]) : "";
            return value.toLowerCase().includes(search.toLowerCase());
          })
        );
        setFilteredData(results);
        setSelectedIndex(results.length > 0 ? 0 : -1);
      } else {
        setFilteredData([]);
        setSelectedIndex(-1);
        setIsHideSearch(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, propertyData]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHideSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredData[selectedIndex]) {
      const { title, _id } = filteredData[selectedIndex];

      // Save search history
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (customerAuth && customerAuth.token) {
        try {
          await axios.post(
            `${baseUrl}/save-search-history`,
            { query: search || "Empty search" },
            {
              headers: { Authorization: `Bearer ${customerAuth.token}` },
            }
          );
          console.log("Search history saved:", search);
        } catch (error) {
          console.error(
            "Error saving search history:",
            error.response?.data?.message || error.message
          );
        }
      }

      // Navigate to selected property
      navigate(`/projects/${title.replaceAll(" ", "-")}/${_id}`);
      setIsHideSearch(false);
      setSearch("");
    } else {
      toast.error("Please select a property from the list.", {
        position: "top-left",
      });
    }
  };

  // Handle keyboard navigation
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

  // Status class for styling
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
    <header className="bg-white shadow-md p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center justify-between w-full sm:w-auto mb-2 sm:mb-0">
        <Link to={"/"} className="flex items-center">
          <img
            src="https://propmetaverse.com/assets/logopng-BXERHkCM.png"
            alt="Logo"
            className="h-8 sm:h-10" // Smaller height on mobile
          />
        </Link>
        {/* Mobile-only User/Notification Icons (if desired, could be moved here) */}
        {/* For this example, keeping them grouped on the right for simplicity */}
      </div>

      {/* Search Bar - takes full width on mobile, shrinks on larger screens */}
      <div className="flex-1 w-full sm:mx-4 relative order-3 sm:order-2"> {/* order-3 ensures it's below logo on mobile */}
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Property / Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 p-2 text-sm sm:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoBlue" // Adjusted text size
            />
          </div>
        </form>
        {isHideSearch && filteredData.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white shadow-lg rounded-xl border border-gray-100 max-h-[200px] sm:max-h-[300px] overflow-y-auto z-10 mt-2" // Max height adjusted for mobile
          >
            {filteredData.map(
              (
                {
                  _id,
                  title,
                  propertyType,
                  address,
                  galleryImg,
                  floorPlan,
                  status,
                },
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
                        `/projects/${title.replaceAll(" ", "-")}/${_id}`
                      );
                      setIsHideSearch(false);
                      setSearch("");
                    }}
                    key={index}
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 cursor-pointer transition-all duration-200 hover:bg-green-50 ${ // Adjusted padding, gap
                      index === selectedIndex ? "bg-green-100" : ""
                    } ${index === 0 ? "rounded-t-xl" : ""} ${
                      index === filteredData.length - 1 ? "rounded-b-xl" : ""
                    }`}
                  >
                    <img
                      src={fileUrl}
                      alt={title}
                      className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 object-cover border border-gray-200" // Smaller image on mobile
                    />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800"> {/* Adjusted text size */}
                        {title}
                        <span className="text-gray-500">
                          {" "}
                          ({propertyType})
                        </span>{" "}
                        <span className={`${getStatusClass(status)}`}>
                          ({status})
                        </span>
                      </p>
                      <p className="text-xxs sm:text-xs text-gray-600 line-clamp-1"> {/* Adjusted text size */}
                        {address} -{" "}
                        {floorPlan.map((plan) => plan.type).join(", ")}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* User Icons - remain on the right, but adapt spacing */}
      <div className="flex items-center space-x-3 sm:space-x-4 order-2 sm:order-3 mt-2 sm:mt-0"> {/* order-2 ensures it's next to logo on mobile, mt adds space */}
        <Link to={"/customer"} className="text-gray-600 hover:text-logoBlue p-1 sm:p-0"> {/* Added padding for tap target */}
          <FiBell className="text-xl sm:text-2xl" /> {/* Adjusted icon size */}
        </Link>
        <Link to={"/customer/profile"} className="flex items-center space-x-2">
          <CgProfile className="text-xl sm:text-2xl" /> {/* Adjusted icon size */}
          <div className="hidden sm:block"> {/* Hide user name/role on very small screens */}
            {loading ? (
              <div className="text-sm">Loading...</div>
            ) : user ? (
              <div>
                <span className="font-semibold text-sm">{user.fullName || "User"}</span>
                <span className="text-xs text-gray-500 block">Buyer/Seller</span>
              </div>
            ) : (
              <div>
                <span className="font-semibold text-sm">Guest</span>
                <span className="text-xs text-gray-500 block">Buyer/Seller</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );

};

export default CustomerNavbar;
