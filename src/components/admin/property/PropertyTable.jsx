// components/PropertyTable.js
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { FaDownload, FaEye } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Handle select all checkboxes
  const handleAllSelect = () => {
    setAllSelect(!allSelect);
    if (!allSelect) {
      setSelectedIds(data.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual checkbox
  const handleCheckboxChange = (id) => {
    setAllSelect(false);
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Export properties to Excel
  const downloadExcel = () => {
    const worksheetData = data.map((item) => ({
      Title: item.title || "N/A",
      Price: item.price ? `₹${item.price}` : "N/A",
      PropertyType: item.propertyType || "N/A",
      Description: item.description || "N/A",
      Status: item.approveStatus || "Pending",
      CreatedAt: item.createdAt || "N/A",
    }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Properties");
    XLSX.writeFile(wb, "Properties.xlsx");
  };

  // Bulk delete selected properties
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
          const response = await fetch(`${baseUrl}/select-property-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Add Authorization if needed: Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setData((prev) =>
              prev.filter((item) => !selectedIds.includes(item._id))
            );
            setSelectedIds([]);
            Swal.fire({
              title: "Deleted!",
              text: "Selected properties have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete properties");
          }
        } catch (error) {
          console.error("Error deleting properties:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete properties. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  // Bulk approve selected properties
  const handleBulkApprove = () => {
    if (!selectedIds.length) return;

    Swal.fire({
      title: "Approve Properties?",
      text: "This will approve all selected properties.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1b639f",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, approve them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/bulk-approve-properties`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Add Authorization if needed: Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ids: selectedIds,
              approveStatus: "approved",
            }),
          });

          if (response.ok) {
            setData((prev) =>
              prev.map((item) =>
                selectedIds.includes(item._id)
                  ? { ...item, approveStatus: "approved" }
                  : item
              )
            );
            setSelectedIds([]);
            Swal.fire({
              title: "Approved!",
              text: "Selected properties have been approved.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to approve properties");
          }
        } catch (error) {
          console.error("Error approving properties:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to approve properties. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  // Bulk disapprove selected properties
  const handleBulkDisapprove = () => {
    if (!selectedIds.length) return;

    Swal.fire({
      title: "Disapprove Properties?",
      text: "This will disapprove all selected properties.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1b639f",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, disapprove them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/bulk-approve-properties`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Add Authorization if needed: Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ids: selectedIds,
              approveStatus: "disapproved",
            }),
          });

          if (response.ok) {
            setData((prev) =>
              prev.map((item) =>
                selectedIds.includes(item._id)
                  ? { ...item, approveStatus: "disapproved" }
                  : item
              )
            );
            setSelectedIds([]);
            Swal.fire({
              title: "Disapproved!",
              text: "Selected properties have been disapproved.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to disapprove properties");
          }
        } catch (error) {
          console.error("Error disapproving properties:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to disapprove properties. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  // Fetch properties
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/property`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const result = await response.json();
        if (result.message === "empty data") {
          setData([]);
          return;
        }

        // Apply search filter
        let filteredData = searchValue
          ? result.filter(
              (item) =>
                item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase())
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
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, searchValue]);

  // Function to get status class names
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "disapproved":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

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
                  className="text-black font-medium rounded-lg text-md cursor-pointer"
                />
                <button
                  onClick={handleBulkApprove}
                  className="text-green-600 font-medium rounded-lg text-sm px-3 py-1.5 bg-green-100 hover:bg-green-200"
                >
                  Bulk Approve
                </button>
                <button
                  onClick={handleBulkDisapprove}
                  className="text-red-600 font-medium rounded-lg text-sm px-3 py-1.5 bg-red-100 hover:bg-red-200"
                >
                  Bulk Disapprove
                </button>
              </div>
              <p
                onClick={downloadExcel}
                className="cursor-pointer flex items-center gap-2 bg-black text-white py-2 px-4 rounded-md hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                <FaDownload /> Export{" "}
                <span className="hidden md:inline">to Excel</span>
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
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Property Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
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
                    No properties found.
                  </td>
                </tr>
              ) : (
                data.map((value, index) => (
                  <tr
                    key={value._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${value._id}`}
                          type="checkbox"
                          checked={selectedIds.includes(value._id)}
                          onChange={() => handleCheckboxChange(value._id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`checkbox-${value._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                      {value.title || "N/A"}{" "}
                      <FaEye
                        className="cursor-pointer"
                        onClick={() => {
                          const url =
                            "/projects/" +
                            value.title?.replaceAll(" ", "-") +
                            "/" +
                            value._id;
                          window.open(url, "_blank");
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {value.price ? `₹${value.price}` : "N/A"}
                    </td>
                    <td className="px-6 py-4">{value.propertyType || "N/A"}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          value.approveStatus
                        )}`}
                      >
                        {value.approveStatus || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {value.createdAt || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyTable;
