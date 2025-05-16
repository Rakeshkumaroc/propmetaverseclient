import React from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const MyListingRow = ({ value, index, selectedIds, handleCheckboxChange, setLoading }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
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
            },
            body: JSON.stringify({ ids: [ value._id ] }),
          });

          if (response.ok) {
            setLoading(true);
            Swal.fire({
              title: "Deleted!",
              text: "Your property has been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete property");
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to delete property. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${index}`}
            type="checkbox"
            checked={selectedIds.includes(value._id)}
            onChange={() => handleCheckboxChange(value._id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 text-center">{index + 1}</td>
      <td className="px-6 py-4 text-center font-medium text-gray-900">
        <div className="flex items-center justify-center gap-2">
          {value.title}
          <FaEye
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => {
              const url = `/projects/${value.title.replaceAll(" ", "-")}/${value._id}`;
              window.open(url, "_blank");
            }}
          />
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        {new Date(value.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-center">
        {value.updatedAt ? new Date(value.updatedAt).toLocaleDateString() : "Not Updated"}
      </td>
      <td className="px-6 py-4 text-center">{value.propertyType}</td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Link
            to={`/customer/edit-property/${value._id}`}
            className="text-blue-600 hover:text-blue-800 p-1 rounded"
          >
            <MdEdit className="text-lg" />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded"
          >
            <MdDeleteForever className="text-lg" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyListingRow;