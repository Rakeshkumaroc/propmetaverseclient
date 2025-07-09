import { useEffect, useState, useRef } from "react"; // Import useRef for dropdown closing
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; 
import CustomerLeadDetails from "./CustomerLeadDetails";
import CustomerLeadRow from "./CustomerLeadRow"; // This component will also need responsive adjustments if its content is complex

const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerLeadTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isOpenLead, setIsOpenLead] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
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

  const handleAllSelect = () => {
    const newAllSelectState = !allSelect;
    setAllSelect(newAllSelectState);
    if (newAllSelectState) {
      setSelectedIds(data.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setAllSelect(false); // If a single checkbox is changed, "Select All" should be unchecked
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const downloadExcal = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "Leads.xlsx");
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        title: "No leads selected",
        text: "Please select at least one lead to delete.",
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

          const response = await fetch(baseUrl + "/select-lead-delete", {
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
              text: "Selected leads have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete leads");
          }
        } catch (error) {
          console.error("Error deleting leads:", error);
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to delete leads. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  useEffect(() => {
    const getFun = async () => {
      try {
        let customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
        if (!customerAuth || !customerAuth.user?._id || !customerAuth.token) {
          Swal.fire({
            title: "Unauthorized",
            text: "Please log in to view leads.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
          setData([]);
          return;
        }

        let result = await fetch(`${baseUrl}/lead/${customerAuth.user._id}`, {
          headers: {
            Authorization: `Bearer ${customerAuth.token}`, // Include token
          },
        });
        result = await result.json();

        // Step 1: Filter by status if needed
        let filteredData = [...result]; // Create a shallow copy to avoid direct mutation
        if (filter === "Closed") {
          filteredData = filteredData.filter((item) => item.status === "Closed");
        } else if (filter === "Recent") {
          filteredData = filteredData.reverse();
        }
        // "Oldest" implicitly handles as it's the original order (or no specific sort applied)

        // Step 2: Filter by search value
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.name &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
       
        setData([]);
      }
    };
    getFun();
  }, [filter, searchValue]);

  return (
    <>
      <div>
        {/* Top controls: Lead Listings title, filter, export, delete buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-semibold whitespace-nowrap">Lead Listings</h2> {/* Adjusted font size for mobile, prevent wrap */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"> {/* Stack buttons on mobile, row on sm+ */}
            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto" ref={filterDropdownRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center justify-between w-full sm:w-auto" // w-full for mobile, justify-between for icon
              >
                {filter}
                <svg className="w-2.5 h-2.5 ml-2" fill="none" viewBox="0 0 10 6">
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
                    <li>
                      <button
                        onClick={() => {
                          setFilter("Closed");
                          setIsFilterOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Closed
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Export Button */}
            <button
              onClick={downloadExcal}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto" // Full width on mobile
            >
              Export to Excel
            </button>
            {/* Delete Selected Button */}
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 w-full sm:w-auto" // Full width on mobile, center text
            >
              <RiDeleteBin2Fill /> Delete Selected
            </button>
          </div>
        </div>

        {/* This div seems empty/unused in your original code. I've left it as is for now. */}
        <div className="flex items-center justify-between p-3 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white"></div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 min-w-max"> {/* min-w-max ensures table scrolls horizontally if too wide */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      checked={allSelect}
                      onChange={handleAllSelect}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">ID</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Name</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Phone</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Email</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">En Date</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Status</th> {/* Reduced padding, prevent wrap */}
                <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">Action</th> {/* Reduced padding, prevent wrap */}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((value, index) => (
                  <CustomerLeadRow
                    key={value._id}
                    value={value}
                    index={index}
                    selectedIds={selectedIds}
                    handleCheckboxChange={handleCheckboxChange}
                    setIsOpenLead={setIsOpenLead}
                    handleAllSelect={handleAllSelect} // You might not need to pass this down if its only used here
                    allSelect={allSelect} // Pass allSelect to update checkbox state in row
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenLead && (
        <CustomerLeadDetails
          setIsOpenLead={setIsOpenLead}
          isOpenLead={isOpenLead}
          // Assuming data for CustomerLeadDetails comes from a specific lead when opened
          // You might need to pass a `selectedLead` state here to display details
          // For now, I'll remove `data` prop unless it's designed to pass ALL data.
          // data={data} // Consider if this is the correct way to pass data for details
        />
      )}
    </>
  );
};

export default CustomerLeadTable;