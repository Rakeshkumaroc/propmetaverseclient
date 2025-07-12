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
  };

  const handleDelete = () => {
    if (!selectedIds.length) return;
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
          Swal.fire("Deleted!", "Selected commission(s) deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete. Try again.", "error");
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
    const html = `
      <div style="text-align: left; font-size: 14px;">
        <p><strong>Seller:</strong> ${item.sellerName}</p>
        <p><strong>Status:</strong> ${item.commissionStatus}</p>
        <p><strong>Valid From:</strong> ${item.validFrom?.slice(0, 10)}</p>
        <p><strong>Valid To:</strong> ${item.validTo?.slice(0, 10)}</p>
        <hr style="margin: 10px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
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
                  <td style="padding: 8px; border: 1px solid #ddd;">${
                    i + 1
                  }</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">₹${
                    r.minValue
                  }</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">₹${
                    r.maxValue
                  }</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${
                    r.rate
                  }%</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    Swal.fire({
      title: "Commission Details",
      html,
      width: 700,
      confirmButtonColor: "#000",
      showCloseButton: true,
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseUrl}/single-commission-delete`, {
          data: { ids: [rangeId] },
        });
        setEditRanges((prev) => prev.filter((r) => r._id !== rangeId));
        Swal.fire("Deleted!", "Range deleted successfully.", "success");
      } catch (err) {
        Swal.fire("Error", "Delete failed. Try again.", "error");
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
      Swal.fire("Success", "Updated successfully", "success");
      setEditModal(false);
      const updated = await axios.get(`${baseUrl}/commissions`);
      setCommissions(updated.data);
    } catch (err) {
      console.log(err)
      Swal.fire("Error", err.response.data.error ||"Error updating", "error");
    }
  };

  return (
    <>
      <div className="mt-10 md:p-4 bg-white rounded shadow-md overflow-x-auto">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex gap-3 items-center">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-gray-100 text-sm px-4 py-2 rounded border"
              >
                {filter}
              </button>
              {isFilterOpen && (
                <div className="absolute top-full left-0 bg-white shadow border rounded mt-1 z-10">
                  {["Recent", "Oldest"].map((opt) => (
                    <div
                      key={opt}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilter(opt);
                        setIsFilterOpen(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <RiDeleteBin2Fill
              className="text-red-600 text-xl cursor-pointer"
              onClick={handleDelete}
            />
          </div>
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            <FaDownload /> Export
          </button>
        </div>

       <table className="min-w-full text-sm text-left text-gray-600">
  <thead className="text-xs bg-gray-100 uppercase text-gray-700">
    <tr>
      <th className="px-4 py-3 text-left">
        <input
          type="checkbox"
          checked={allSelect}
          onChange={handleAllSelect}
        />
      </th>
      <th className="px-4 py-3 text-left">Set ID</th>
      <th className="px-4 py-3 text-left">Seller Name</th>
      <th className="px-4 py-3 text-left">Status</th>
      <th className="px-4 py-3 text-left"># Ranges</th>
      <th className="px-4 py-3 text-left">Updated</th>
      <th className="px-4 py-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {groupedData.length === 0 ? (
      <tr>
        <td colSpan="7" className="text-center py-4">
          No commissions found.
        </td>
      </tr>
    ) : (
      groupedData.map((item) => (
        <tr
          key={item.setId}
          className="border-b hover:bg-gray-50"
        >
          <td className="px-4 py-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(item.setId)}
              onChange={() => handleCheckboxChange(item.setId)}
            />
          </td>
          <td className="px-4 py-2 text-left">{item.setId}</td>
          <td className="px-4 py-2 text-left">{item.sellerName}</td>
          <td className="px-4 py-2 text-left capitalize">
            {item.commissionStatus}
          </td>
          <td className="px-4 py-2 text-left">{item.ranges.length}</td>
          <td className="px-4 py-2 text-left">
            {new Date(item.updatedAt).toLocaleDateString()}
          </td>
          <td className="px-4 py-2 text-center">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleView(item)}
                className="p-2 rounded bg-green-100 hover:bg-green-200"
              >
                <MdVisibility />
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded bg-yellow-100 hover:bg-yellow-200"
              >
                <MdEdit />
              </button>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

      </div>

      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        className="w-full max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Edit Commission Ranges
        </h2>

        {/* Valid From & Valid To Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
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
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
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
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
            />
          </div>
        </div>

        {/* Ranges Section */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {editRanges.map((range, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 items-center">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Min Value
                </label>
                <input
                  type="number"
                  value={range.minValue}
                  onChange={(e) =>
                    handleRangeChange(idx, "minValue", e.target.value)
                  }
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Max Value
                </label>
                <input
                  type="number"
                  value={range.maxValue}
                  onChange={(e) =>
                    handleRangeChange(idx, "maxValue", e.target.value)
                  }
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
                />
              </div>
              <div className="relative">
                <label className="text-sm font-medium text-gray-600">
                  Rate (%)
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    value={range.rate}
                    onChange={(e) =>
                      handleRangeChange(idx, "rate", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
                  />
                  {range._id && (
                    <RiDeleteBin2Fill
                      onClick={() => handleRangeDelete(range._id)}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={addRangeToEdit}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Remove Last
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={updateCommission}
              className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommissionTable;
