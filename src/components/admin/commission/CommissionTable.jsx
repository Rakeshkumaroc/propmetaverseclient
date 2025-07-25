import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { MdEdit, MdVisibility } from "react-icons/md";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const baseUrl = import.meta.env.VITE_APP_URL;

const CommissionTable = ({ searchValue, commissions, setCommissions }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCommission, setEditCommission] = useState(null);
  const [editRanges, setEditRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const groupedData = commissions
    .map((c) => ({
      setId: c._id,
      sellerId: c.sellerId?._id || "N/A",
      sellerName: c.sellerId?.fullName || "N/A",
      commissionStatus: c.status || "pending",
      updatedAt: c.updatedAt,
      validFrom: c.validFrom,
      validTo: c.validTo,
      ranges: c.ranges,
    }))
    .filter((item) =>
      [
        item.sellerName,
        item.sellerId,
        item.commissionStatus,
        ...item.ranges.map((r) => `${r.minValue} ${r.maxValue} ${r.rate}`),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .sort((a, b) =>
      filter === "Recent"
        ? new Date(b.updatedAt) - new Date(a.updatedAt)
        : new Date(a.updatedAt) - new Date(b.updatedAt)
    );

  const handleAllSelect = () => {
    const allIds = groupedData.map((item) => item.setId);
    setAllSelect(!allSelect);
    setSelectedIds(!allSelect ? allIds : []);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
    setAllSelect(false);
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
      customClass: {
        confirmButton:
          "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/select-commission-delete`, {
            data: { ids: selectedIds },
          });
          setCommissions((prev) =>
            prev.filter((c) => !selectedIds.includes(c._id))
          );
          setSelectedIds([]);
          setAllSelect(false);
          if (groupedData.length - selectedIds.length <= (currentPage - 1) * itemsPerPage) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Selected commission(s) deleted.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete. Try again.",
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

  const downloadExcel = () => {
    const data = groupedData.flatMap((item) =>
      item.ranges.map((r) => ({
        SetID: item.setId,
        SellerID: item.sellerId,
        SellerName: item.sellerName,
        MinValue: r.minValue,
        MaxValue: r.maxValue,
        Rate: r.rate,
        Status: item.commissionStatus,
        ValidFrom: item.validFrom?.slice(0, 10) || "N/A",
        ValidTo: item.validTo?.slice(0, 10) || "N/A",
        UpdatedAt: new Date(item.updatedAt).toLocaleString(),
      }))
    );
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commissions");
    XLSX.writeFile(wb, "Commissions.xlsx");
  };

  const handleView = (item) => {
    Swal.fire({
      title: "Commission Details",
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>Seller:</strong> ${item.sellerName}</p>
          <p><strong>Status:</strong> ${item.commissionStatus}</p>
          <p><strong>Valid From:</strong> ${item.validFrom?.slice(0, 10)}</p>
          <p><strong>Valid To:</strong> ${item.validTo?.slice(0, 10)}</p>
          <hr style="margin: 10px 0;" />
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 8px; border: 1px solid #ddd;">#</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Min Value</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Max Value</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              ${item.ranges
                .map(
                  (r, i) => `
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">${i + 1}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">₹${r.minValue}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">₹${r.maxValue}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${r.rate}%</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `,
      width: 700,
      confirmButtonColor: "#000",
      showCloseButton: true,
      customClass: {
        confirmButton:
          "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
      },
    });
  };

  const handleEdit = (item) => {
    setEditCommission(item);
    setEditRanges(item.ranges);
    setEditModal(true);
  };

  const handleRangeChange = (i, field, value) => {
    const updated = [...editRanges];
    updated[i][field] = value;
    setEditRanges(updated);
  };

  const handleRangeDelete = async (rangeId) => {
    if (!rangeId) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Delete this commission range?",
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
          await axios.delete(`${baseUrl}/single-commission-delete`, {
            data: { ids: [rangeId] },
          });
          setEditRanges((prev) => prev.filter((r) => r._id !== rangeId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Range deleted successfully.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Delete failed. Try again.",
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

  const addRangeToEdit = () => {
    setEditRanges([...editRanges, { minValue: "", maxValue: "", rate: "" }]);
  };

  const updateCommission = async () => {
    try {
      await axios.put(`${baseUrl}/commissions/${editCommission.setId}`, {
        sellerId: editCommission.sellerId,
        validFrom: editCommission.validFrom,
        validTo: editCommission.validTo,
        ranges: editRanges,
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Updated successfully",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      setEditModal(false);
      const updated = await axios.get(`${baseUrl}/commissions`);
      setCommissions(updated.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.response?.data?.error || "Error updating",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(groupedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = groupedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
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
                <th className="p-4">Set ID</th>
                <th className="p-4">Seller Name</th>
                <th className="p-4">Status</th>
                <th className="p-4"># Ranges</th>
                <th className="p-4">Updated</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-base text-gray-700">
                    No commissions found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={item.setId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.setId)}
                        onChange={() => handleCheckboxChange(item.setId)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="p-4 text-base text-gray-700">{item.setId}</td>
                    <td className="p-4 text-base text-gray-700">
                      {item.sellerName === "N/A" ? (
                        <span className="text-gray-400">N/A</span>
                      ) : (
                        item.sellerName
                      )}
                    </td>
                    <td className="p-4 text-base text-gray-700 capitalize">
                      {item.commissionStatus}
                    </td>
                    <td className="p-4 text-base text-gray-700">{item.ranges.length}</td>
                    <td className="p-4 text-base text-gray-700">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-1.5 rounded-md bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition"
                        >
                          <MdVisibility className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-md bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition"
                        >
                          <MdEdit className="text-xl" />
                        </button>
                      </div>
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

      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        className="w-[90vw] max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Edit Commission Ranges
        </h2>

        {/* Valid From & Valid To Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-800">
              Valid From
            </label>
            <input
              type="date"
              value={editCommission?.validFrom?.slice(0, 10) || ""}
              onChange={(e) =>
                setEditCommission((prev) => ({
                  ...prev,
                  validFrom: e.target.value,
                }))
              }
              className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-800">
              Valid To
            </label>
            <input
              type="date"
              value={editCommission?.validTo?.slice(0, 10) || ""}
              onChange={(e) =>
                setEditCommission((prev) => ({
                  ...prev,
                  validTo: e.target.value,
                }))
              }
              className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />
          </div>
        </div>

        {/* Ranges Section */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {editRanges.map((range, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Min Value (₹)
                </label>
                <input
                  type="number"
                  value={range.minValue}
                  onChange={(e) =>
                    handleRangeChange(idx, "minValue", e.target.value)
                  }
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Max Value (₹)
                </label>
                <input
                  type="number"
                  value={range.maxValue}
                  onChange={(e) =>
                    handleRangeChange(idx, "maxValue", e.target.value)
                  }
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Rate (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={range.rate}
                    onChange={(e) =>
                      handleRangeChange(idx, "rate", e.target.value)
                    }
                    className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                  />
                  {range._id && (
                    <RiDeleteBin2Fill
                      onClick={() => handleRangeDelete(range._id)}
                      className="text-2xl text-gray-700 cursor-pointer hover:scale-105 transition"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={addRangeToEdit}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-base font-medium"
          >
            + Add New Range
          </button>
          {editRanges.some((r) => !r._id) && (
            <button
              onClick={() =>
                setEditRanges((prev) =>
                  prev.filter((r, i, arr) => i !== arr.length - 1)
                )
              }
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition text-base font-medium"
            >
              - Remove Last
            </button>
          )}
          <button
            onClick={() => setEditModal(false)}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition text-base font-medium"
          >
            Cancel
          </button>
          <button
            onClick={updateCommission}
            className="px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CommissionTable;