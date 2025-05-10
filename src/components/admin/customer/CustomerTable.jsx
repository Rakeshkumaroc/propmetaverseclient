import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import CustomerRow from "./CustomerRow";
const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerTable = ({
  searchValue,
  viewOnly = false,
  apiUrl = `${baseUrl}/customers`,
}) => {
  const [filter, setFilter] = useState("Recent"); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDelete = () => {
       if (!selectedIds.length) return;
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
          const response = await fetch(baseUrl + "/select-customers-delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your customers has been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          }
        } catch (error) {
          console.log("Error deleting customers");
          Swal.fire({
            title: "Deleted!",
            text: "Your customers has been deleted.",
            icon: "success",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  // Handle select all checkboxes
  const handleAllSelect = () => {
    if (viewOnly) return;
    setAllSelect(!allSelect);
    if (!allSelect) {
      setSelectedIds(data.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual checkbox
  const handleCheckboxChange = (id) => {
    if (viewOnly) return;
    setAllSelect(false);
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Export Customer data to Excel
  const downloadExcel = () => {
    const worksheetData = data.map((item) => ({
      FullName: item.fullName || "N/A",
      Email: item.email || "N/A",
      Phone: item.number || "N/A",
      CreatedAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A",
    }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "CustomerProfiles.xlsx");
  };

  // Fetch Customer profiles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const result = await response.json();

        // Apply search filter
        let filteredData = searchValue
          ? result.filter(
              (item) =>
                item.fullName
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                item.email?.toLowerCase().includes(searchValue.toLowerCase())
            )
          : result;

      

        // Sort by createdAt
        filteredData = [...filteredData].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return filter === "Recent" ? dateB - dateA : dateA - dateB;
        });

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch customers. Please try again.",
          icon: "error",
          confirmButtonColor: "#1b639f",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, searchValue, apiUrl]);

  return (
    <div
      className="w-full bg-mainbg sm:rounded-l-[30px] sm:rounded-r-md backdrop-blur-lg"
      style={{ overflow: "auto" }}
    >
      <div className="md:p-4 mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between p-3 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
            <div className="relative select-none flex justify-between w-full items-center cursor-pointer">
              <div className="flex items-center gap-5">
                {/* Sort Filter */}
                <div
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                >
                  {filter}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <div
                  style={{ display: isFilterOpen ? "" : "none" }}
                  className="z-10 top-[34px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <p
                        onClick={() => {
                          setFilter("Recent");
                          setIsFilterOpen(false);
                        }}
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Recent
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => {
                          setFilter("Oldest");
                          setIsFilterOpen(false);
                        }}
                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Oldest
                      </p>
                    </li>
                  </ul>
                </div>
                <RiDeleteBin2Fill
                  onClick={handleDelete}
                  className="  text-black 
                 font-medium rounded-lg text-md"
                />
              </div>
              <p
                onClick={downloadExcel}
                className="cursor-pointer bg-black text-white p-1 px-3 rounded-md hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Export <span className="hidden md:inline">to Excel</span>
              </p>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      onClick={handleAllSelect}
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      disabled={viewOnly}
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No Customers registered. Invite agents or Customers.
                  </td>
                </tr>
              ) : (
                data.map((value, index) => (
                  <CustomerRow
                    key={value._id}
                    value={value}
                    index={index}
                    selectedIds={selectedIds}
                    handleCheckboxChange={handleCheckboxChange}
                    setLoading={setLoading}
                    setData={setData}
                    viewOnly={viewOnly}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
