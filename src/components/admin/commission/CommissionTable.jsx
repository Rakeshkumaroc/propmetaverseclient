import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit, FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import axios from "axios";
import { MdEdit } from "react-icons/md";

const baseUrl = import.meta.env.VITE_APP_URL;

const CommissionTable = ({
  searchValue,
  commissions,
  setCommissions,
  onEdit,
}) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Flatten commissions for table display
  const flattenedCommissions = commissions.flatMap((commission) =>
    commission.ranges.map((range, index) => ({
      _id: `${commission._id}-${index}`,
      setId: commission._id,
      minValue: range.minValue,
      maxValue: range.maxValue,
      rate: range.rate,
      updatedAt: commission.updatedAt,
    }))
  );

  // Handle select all checkboxes
  const handleAllSelect = () => {
    setAllSelect(!allSelect);
    if (!allSelect) {
      setSelectedIds(flattenedCommissions.map((item) => item._id));
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

  // Export commissions to Excel
  const downloadExcel = () => {
    const worksheetData = flattenedCommissions.map((item) => ({
      SetID: item.setId || "N/A",
      MinValue: item.minValue.toFixed(2) || "N/A",
      MaxValue: item.maxValue.toFixed(2) || "N/A",
      Rate: item.rate.toFixed(1) || "N/A",
      UpdatedAt: item.updatedAt
        ? new Date(item.updatedAt).toLocaleDateString()
        : "N/A",
    }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commissions");
    XLSX.writeFile(wb, "Commissions.xlsx");
  };

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
          const setIds = [
            ...new Set(selectedIds.map((id) => id.split("-")[0])),
          ];
          const response = await axios.delete(
            `${baseUrl}/select-commission-delete`,
            {
              headers: { "Content-Type": "application/json" },
              data: { ids: setIds },
            }
          );

          if (response.status === 200) {
            setCommissions((prev) =>
              prev.filter((item) => !setIds.includes(item._id))
            );
            setSelectedIds([]);
            Swal.fire({
              title: "Deleted!",
              text: "Selected commissions have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete commissions");
          }
        } catch (error) {
          console.error("Error deleting commissions:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete commissions. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  // Filter and sort data
  const filteredData = flattenedCommissions
    .filter(
      (item) =>
        item.minValue
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.maxValue
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.rate.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return filter === "Recent" ? dateB - dateA : dateA - dateB;
    });

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
                  Set ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Min Value ($)
                </th>
                <th scope="col" className="px-6 py-3">
                  Max Value ($)
                </th>
                <th scope="col" className="px-6 py-3">
                  Rate (%)
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
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
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No commission ranges found.
                  </td>
                </tr>
              ) : (
                filteredData.map((value, index) => (
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
                    <td className="px-6 py-4 text-center">{value.setId}</td>
                    <td className="px-6 py-4 text-center">₹{value.minValue}</td>
                    <td className="px-6 py-4 text-center">₹{value.maxValue}</td>
                    <td className="px-6 py-4 text-center">{value.rate}%</td>
                    <td className="px-6 py-4 text-center">
                      {new Date(value.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onEdit(value)}
                        className="font-medium text-black p-1 rounded-md bg-logoBlue/10 hover:bg-logoBlue transition-all duration-700 hover:underline cursor-pointer"
                      >
                        <MdEdit />
                      </button>
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

export default CommissionTable;
