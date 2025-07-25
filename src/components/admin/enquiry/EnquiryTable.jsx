import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import EnquiryDetails from "./EnquiryDetails";
import EnquiryRow from "./EnquiryRow"; // Import the new component

const baseUrl = import.meta.env.VITE_APP_URL;

const EnquiryTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOpenEnquiry, setIsOpenEnquiry] = useState(false);
  const [data, setData] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Number of items per page

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
      prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
    );
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, "Enquiries.xlsx");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseUrl}/select-enquiry-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            Swal.fire("Deleted!", "Your enquiry has been deleted.", "success");
            setData(data.filter((d) => !selectedIds.includes(d._id)));
            setSelectedIds([]);
            setAllSelect(false);
            // Adjust current page if necessary
            if (
              data.length - selectedIds.length <=
              (currentPage - 1) * itemsPerPage
            ) {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await fetch(`${baseUrl}/enquiry`);
        result = await result.json();

        const filtered = searchValue
          ? result.filter((item) =>
              item.name?.toLowerCase().includes(searchValue.toLowerCase())
            )
          : result;

        setData(filter === "Recent" ? filtered.reverse() : filtered);
        setCurrentPage(1); // Reset to first page on data change
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [searchValue, filter]);

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
    <>
      <div className="w-full overflow-auto mt-10">
        <div className="bg-white rounded-xl shadow-md p-4">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-1 border rounded-md text-[15px] font-[500] text-gray-600 hover:bg-gray-100"
                >
                  {filter}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M7 10L12 15L17 10H7Z" fill="black" />
                  </svg>
                </div>
                {isFilterOpen && (
                  <div className="absolute z-10 mt-1 w-28 bg-white border rounded-md shadow-sm">
                    <ul className="text-sm text-gray-700">
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
              <RiDeleteBinLine
                className="text-black text-xl cursor-pointer hover:scale-105"
                onClick={handleDelete}
              />
            </div>
            <div
              onClick={downloadExcel}
              className="flex items-center gap-2 px-4 py-1 bg-black text-white rounded-md text-[15px] font-[500] hover:scale-105 transition"
            >
              <FaDownload /> Export
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-gray-700 shadow-md">
            <thead className="bg-gray-100 text-xs text-gray-500 uppercase text-left">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={allSelect}
                    onChange={handleAllSelect}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-3">ID</th>
                
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <EnquiryRow
                  key={item._id}
                  item={item}
                  index={startIndex + idx}
                  selectedIds={selectedIds}
                  handleCheckboxChange={handleCheckboxChange}
                  setIsOpenEnquiry={setIsOpenEnquiry}
                />
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-2 mt-4">
              {/* Previous Button */}
              <span
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-[8px] border-[1px] border-[#D0D5DD]    hover:bg-gray-100 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ← Previous
              </span>
              <div>
                {/* Page Buttons */}
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
                        className="px-3 py-1 text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <span
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page
                            ? "bg-purple-100 text-purple-700 font-medium"
                            : "  hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </span>
                    )
                  );
                })()}
              </div>
              {/* Next Button */}
              <span
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-[8px] border-[1px] border-[#D0D5DD]  hover:bg-gray-100 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next →
              </span>
            </div>
          )}
        </div>
      </div>

      {isOpenEnquiry && (
        <EnquiryDetails
          setIsOpenEnquiry={setIsOpenEnquiry}
          isOpenEnquiry={isOpenEnquiry}
          data={data}
        />
      )}
    </>
  );
};

export default EnquiryTable;
