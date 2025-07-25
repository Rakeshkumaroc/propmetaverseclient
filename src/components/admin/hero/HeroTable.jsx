import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import HeroRow from "./HeroRow";

const baseUrl = import.meta.env.VITE_APP_URL;

const HeroTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAllSelect = () => {
    setAllSelect(!allSelect);
    if (!allSelect) {
      setSelectedIds(data.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setAllSelect(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const downloadExcel = () => {
    const worksheetData = data.map((item) => ({
      Title: item.title,
      Description: item.description,
      Price: item.price,
      PropertyType: item.property_type,
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt || "Not Updated",
    }));
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hero");
    XLSX.writeFile(wb, "HeroData.xlsx");
  };

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/select-hero-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setLoading(true);
            Swal.fire({
              title: "Deleted!",
              text: "Selected hero has been deleted.",
              icon: "success",
              confirmButtonColor: "#000",
            });
            setSelectedIds([]);
          }
        } catch (error) {
          console.error("Error deleting hero:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/hero`);
        const result = await response.json();

        let filteredData = searchValue
          ? result.filter(
              (item) =>
                item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.price?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.property_type?.toLowerCase().includes(searchValue.toLowerCase())
            )
          : result;

        setData(filter === "Recent" ? filteredData : filteredData.reverse());
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading, filter, searchValue]);

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
                  type="checkbox"
                  checked={allSelect}
                  onChange={handleAllSelect}
                  className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Price</th>
              <th className="p-4">Property Type</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Updated At</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((value, index) => (
              <HeroRow
                key={value._id}
                value={value}
                index={startIndex + index}
                selectedIds={selectedIds}
                handleCheckboxChange={handleCheckboxChange}
                setLoading={setLoading}
              />
            ))}
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

export default HeroTable;