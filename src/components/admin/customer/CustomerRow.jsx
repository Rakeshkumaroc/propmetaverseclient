import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

const CustomerRow = ({
  value,
  index,
  selectedIds,
  handleCheckboxChange,
  setLoading,
  setData,
  viewOnly = false,
}) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${index}`}
            type="checkbox"
            checked={selectedIds.includes(value._id)}
            onChange={() => handleCheckboxChange(value._id)}
            className="w-4 h-4 text-logoBlue bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            disabled={viewOnly}
          />
          <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 text-center">{index + 1}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
        {value.fullName
          ? value.fullName.length > 15
            ? value.fullName.slice(0, 15) + ".."
            : value.fullName
          : "N/A"}
      </td>
      <td className="px-6 py-4 text-center">{value.email || "N/A"}</td>
      <td className="px-6 py-4 text-center">{value.number || "N/A"}</td>
      <td className="px-6 py-4 text-center">
        {value.createdAt
          ? new Date(value.createdAt).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="flex items-center gap-2 justify-center px-6 py-4">
        <Link
          to={`/admin/customer-details/${value._id}`}
          className="font-medium text-blue-500 p-1 rounded-md bg-blue-100 hover:bg-blue-200 cursor-pointer"
        >
          <FiEye />
        </Link>
      </td>
    </tr>
  );
};

export default CustomerRow;