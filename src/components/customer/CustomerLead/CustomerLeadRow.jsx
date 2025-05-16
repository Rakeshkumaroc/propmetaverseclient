import React from "react";
import { MdOutlinePreview } from "react-icons/md";

const CustomerLeadRow = ({ value, index, selectedIds, handleCheckboxChange, handleAllSelect, allSelect, setIsOpenLead }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${value._id}`}
            type="checkbox"
            checked={selectedIds.includes(value._id)}
            onChange={() => handleCheckboxChange(value._id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={`checkbox-table-search-${value._id}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 text-center">{index + 1}</td>
      <td className="px-6 py-4 text-center font-medium text-gray-900">{value.name || "No name"}</td>
      <td className="px-6 py-4 text-center">{value.phone || "No phone"}</td>
      <td className="px-6 py-4 text-center">{value.email || "No email"}</td>
      <td className="px-6 py-4 text-center">
        {value.created_at ? new Date(value.created_at).toLocaleDateString() : "No date"}
      </td>
      <td className="px-6 py-4 text-center">{value.status || "No status"}</td>
      <td className="px-6 py-4 text-center">
        <MdOutlinePreview
          className="text-2xl text-gray-700 cursor-pointer"
          onClick={() => setIsOpenLead(value)}
        />
      </td>
    </tr>
  );
};

export default CustomerLeadRow;