import React, { useEffect, useState, useRef } from "react"; // Import useRef for dropdown closing
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import MyListingRow from "./MyListingRow";

const baseUrl = import.meta.env.VITE_APP_URL;

const MyListingTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const filterDropdownRef = useRef(null); // Ref for the filter dropdown

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Property");
    XLSX.writeFile(wb, "PropertyData.xlsx");
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        title: "No properties selected",
        text: "Please select at least one property to delete.",
        icon: "warning",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b639f",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
          if (!customerAuth || !customerAuth.token) {
            throw new Error("User not authenticated.");
          }

          const response = await fetch(`${baseUrl}/select-property-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${customerAuth.token}`, // Include token
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setData(data.filter((item) => !selectedIds.includes(item._id)));
            setSelectedIds([]);
            Swal.fire({
              title: "Deleted!",
              text: "Selected properties have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            // Attempt to read error message from response
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete properties");
          }
        } catch (error) {
          console.error("Error deleting properties:", error);
          Swal.fire({
            title: "Error",
            text: error.message || "Failed to delete properties. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
        if (!customerAuth || !customerAuth.user?._id || !customerAuth.token) {
          Swal.fire({
            title: "Unauthorized",
            text: "Please log in to view properties.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
          setData([]);
          return;
        }

        const response = await fetch(
          `${baseUrl}/property/${customerAuth.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${customerAuth.token}`, // Include token
            },
          }
        );

        if (!response.ok) {
          // Attempt to read error message from response
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        let result = await response.json();
        if (!Array.isArray(result)) {
          result = [];
        }

        let filteredResult = result;
        if (searchValue) {
          filteredResult = result.filter((item) =>
            [
              item.title,
              item.developer,
              item.district,
              item.possessionDate,
              item.status,
              item.propertyType,
            ].some(
              (field) =>
                field &&
                field.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
        }

        setData(filter === "Recent" ? filteredResult : [...filteredResult].reverse()); // Use spread to avoid modifying original array
      } catch (error) {
        console.error("Error fetching data:", error);
        // Display a user-friendly error message if data fetch fails
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to fetch properties. Please try again.",
          icon: "error",
          confirmButtonColor: "#1b639f",
        });
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filter, searchValue]); // Add data to dependencies if needed for real-time updates after delete

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div>
      {/* Top controls: Property Listings title, filter, export, delete buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-semibold whitespace-nowrap">Property Listings</h2> {/* Added whitespace-nowrap */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"> {/* Stack buttons on mobile, row on sm+ */}
          <div className="relative w-full sm:w-auto" ref={filterDropdownRef}> {/* Set width for dropdown container */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center justify-between w-full sm:w-auto" // w-full for mobile, justify-between for icon
            >
              {filter}
              <svg
                className="w-2.5 h-2.5 ml-2" // Added ml-2 for spacing
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full sm:w-auto"> {/* w-full for mobile dropdown */}
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => {
                        setFilter("Recent");
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Recent
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilter("Oldest");
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Oldest
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={downloadExcel}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto" // Full width on mobile
          >
            Export to Excel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 w-full sm:w-auto" // Full width on mobile, center text
          >
            <RiDeleteBin2Fill /> Delete Selected
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto shadow-md rounded-lg"> {/* Added shadow and rounded corners here for the container */}
        <table className="w-full text-sm text-left text-gray-500 min-w-max"> {/* Added min-w-max to ensure table doesn't shrink too much */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <span className="sr-only">Select</span>
              </th>
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">ID</th> {/* Reduced padding, added nowrap */}
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Title</th> {/* Reduced padding, added nowrap */}
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Created At</th> {/* Reduced padding, added nowrap */}
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Updated At</th> {/* Reduced padding, added nowrap */}
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Property Type</th> {/* Reduced padding, added nowrap */}
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Action</th> {/* Reduced padding, added nowrap */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((value, index) => (
                <MyListingRow
                  key={value._id}
                  value={value}
                  index={index}
                  selectedIds={selectedIds}
                  handleCheckboxChange={handleCheckboxChange}
                  setLoading={setLoading}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListingTable;