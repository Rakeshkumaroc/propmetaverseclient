import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaDownload, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      CreatedAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")
        : "N/A",
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
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton:
          "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/select-property-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setData((prev) =>
              prev.filter((item) => !selectedIds.includes(item._id))
            );
            setSelectedIds([]);
            setAllSelect(false);
            if (data.length - selectedIds.length <= (currentPage - 1) * itemsPerPage) {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Selected properties have been deleted.",
              confirmButtonColor: "#000",
              customClass: {
                confirmButton:
                  "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
              },
            });
          } else {
            throw new Error("Failed to delete properties");
          }
        } catch (error) {
          console.error("Error deleting properties:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete properties. Please try again.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
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
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve them!",
      customClass: {
        confirmButton:
          "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/bulk-approve-properties`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
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
            setAllSelect(false);
            Swal.fire({
              icon: "success",
              title: "Approved!",
              text: "Selected properties have been approved.",
              confirmButtonColor: "#000",
              customClass: {
                confirmButton:
                  "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
              },
            });
          } else {
            throw new Error("Failed to approve properties");
          }
        } catch (error) {
          console.error("Error approving properties:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to approve properties. Please try again.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
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
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, disapprove them!",
      customClass: {
        confirmButton:
          "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/bulk-approve-properties`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
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
            setAllSelect(false);
            Swal.fire({
              icon: "success",
              title: "Disapproved!",
              text: "Selected properties have been disapproved.",
              confirmButtonColor: "#000",
              customClass: {
                confirmButton:
                  "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
              },
            });
          } else {
            throw new Error("Failed to disapprove properties");
          }
        } catch (error) {
          console.error("Error disapproving properties:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to disapprove properties. Please try again.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
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
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch properties. Please try again.",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
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

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full overflow-auto mt-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-[1px] border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition shadow-sm"
              >
                {filter}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M7 10L12 15L17 10H7Z" fill="black" />
                </svg>
              </div>
              {isFilterOpen && (
                <div className="absolute z-[9999] mt-2 w-32 bg-white border-[1px] border-gray-300 rounded-lg shadow-sm">
                  <ul className="text-base text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilter("Recent");
                        setIsFilterOpen(false);
                      }}
                    >
                      Recent
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilter("Oldest");
                        setIsFilterOpen(false);
                      }}
                    >
                      Oldest
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <RiDeleteBin2Fill
              className="text-2xl text-gray-700 cursor-pointer hover:scale-105 transition"
              onClick={handleDelete}
            />
            <span
              onClick={handleBulkApprove}
              className="px-4 py-2.5 text-base font-medium text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition shadow-sm"
            >
              Bulk Approve
            </span>
            <span
              onClick={handleBulkDisapprove}
              className="px-4 py-2.5 text-base font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition shadow-sm"
            >
              Bulk Disapprove
            </span>
          </div>
          <div
            onClick={downloadExcel}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg text-base font-medium hover:bg-black/90 transition shadow-md"
          >
            <FaDownload className="text-lg" />
            Export
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-base text-gray-700">
          <thead className="bg-gray-50 text-sm text-gray-500 uppercase text-left">
            <tr>
              <th className="p-4">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={allSelect}
                  onChange={handleAllSelect}
                  className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Property Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-base text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-base text-gray-700">
                  No properties found.
                </td>
              </tr>
            ) : (
              paginatedData.map((value, index) => (
                <tr
                  key={value._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <input
                      id={`checkbox-${value._id}`}
                      type="checkbox"
                      checked={selectedIds.includes(value._id)}
                      onChange={() => handleCheckboxChange(value._id)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="p-4 text-base text-gray-700">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-4 text-base text-gray-700 flex items-center gap-2">
                    {value.title || <span className="text-gray-400">N/A</span>}
                    <FaEye
                      className="text-gray-700 cursor-pointer hover:text-purple-700 transition"
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
                  <td className="p-4 text-base text-gray-700">
                    {value.floorPlan?.[0]?.price
                      ? `₹${value.floorPlan[0].price.toLocaleString("en-IN")}`
                      : <span className="text-gray-400">N/A</span>}
                  </td>
                  <td className="p-4 text-base text-gray-700">
                    {value.propertyType || <span className="text-gray-400">N/A</span>}
                  </td>
                  <td className="p-4 text-base text-gray-700 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-base font-medium ${getStatusClass(
                        value.approveStatus
                      )}`}
                    >
                      {value.approveStatus || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-base text-gray-700 text-center">
                    {value.createdAt
                      ? new Date(value.createdAt)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      : <span className="text-gray-400">N/A</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2.5 rounded-lg border-[1px] border-gray-300 text-base font-medium text-gray-700 hover:bg-gray-100 transition ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              ← Previous
            </button>
            <div className="flex items-center gap-2">
              {(() => {
                const delta = 2;
                const range = [];
                let lastPage = 0;

                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - delta && i <= currentPage + delta)
                  ) {
                    if (lastPage && i - lastPage > 1) {
                      range.push("...");
                    }
                    range.push(i);
                    lastPage = i;
                  }
                }

                return range.map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-3 py-1 text-gray-500 text-base"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md text-base ${
                        currentPage === page
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                );
              })()}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2.5 rounded-lg border-[1px] border-gray-300 text-base font-medium text-gray-700 hover:bg-gray-100 transition ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTable;