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
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <Link to={'/'} className="flex items-center">
        <img
          src="https://propmetaverse.com/assets/logopng-BXERHkCM.png"
          alt="Logo"
          className="h-10"
        />
      </Link>
      <div className="flex-1 mx-4 relative">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Property / Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoBlue"
            />
          </div>
        </form>
        {isHideSearch && filteredData.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white shadow-lg rounded-xl border border-gray-100 max-h-[300px] overflow-y-auto z-10 mt-2"
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
                      <p className="text-sm font-semibold text-gray-800">
                        {title}
                        <span className="text-gray-500">
                          {" "}
                          ({propertyType})
                        </span>{" "}
                        <span className={`${getStatusClass(status)}`}>
                          ({status})
                        </span>
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-1">
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
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-logoBlue">
          <FiBell className="text-2xl" />
        </button>
        <Link to={"/customer/profile"} className="flex items-center space-x-2">
          <CgProfile className="text-2xl" />
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div>
              <span className="font-semibold">{user.fullName || "User"}</span>
              <span className="text-sm text-gray-500 block">Buyer/Seller</span>
            </div>
          ) : (
            <div>
              <span className="font-semibold">Guest</span>
              <span className="text-sm text-gray-500 block">Buyer/Seller</span>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default CustomerNavbar;
