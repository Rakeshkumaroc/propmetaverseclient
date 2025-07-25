import React from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const HeroRow = ({ value, index, selectedIds, handleCheckboxChange, setLoading }) => {
  const handleDelete = () => {
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
            body: JSON.stringify({ ids: [value._id] }),
          });

          if (response.ok) {
            setLoading(true);
            Swal.fire({
              title: "Deleted!",
              text: "Hero has been deleted.",
              icon: "success",
              confirmButtonColor: "#000",
            });
          }
        } catch (error) {
          console.error("Error deleting hero:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-4">
        <input
          id={`checkbox-table-search-${index}`}
          type="checkbox"
          checked={selectedIds.includes(value._id)}
          onChange={() => handleCheckboxChange(value._id)}
          className="w-5 h-5 text-purple-600 focus:ring-purple-500"
        />
      </td>
      <td className="p-4 text-base text-gray-700">{index + 1}</td>
      <td className="p-4 text-base text-gray-700">
        {value.title
          ? value.title.length > 20
            ? value.title.slice(0, 20) + "..."
            : value.title
          : <span className="text-gray-400">N/A</span>}
      </td>
      <td className="p-4 text-base text-gray-700">
        {value.description
          ? value.description.length > 30
            ? value.description.slice(0, 30) + "..."
            : value.description
          : <span className="text-gray-400">N/A</span>}
      </td>
      <td className="p-4 text-base text-gray-700">
        {value.price || <span className="text-gray-400">N/A</span>}
      </td>
      <td className="p-4 text-base text-gray-700">
        {value.property_type || <span className="text-gray-400">N/A</span>}
      </td>
      <td className="p-4 text-base text-gray-700">
        {value.createdAt || <span className="text-gray-400">N/A</span>}
      </td>
      <td className="p-4 text-base text-gray-700">
        {value.updatedAt || <span className="text-gray-400">Not Updated</span>}
      </td>
      <td className="p-4 flex items-center justify-center gap-3">
        <Link
          to={value._id}
          className="text-gray-700 p-1.5 rounded-md bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <MdEdit className="text-xl" />
        </Link>
        <span
          onClick={handleDelete}
          className=" p-1.5 rounded-md bg-gray-100 hover:bg-red-100 transition"
        >
          <MdDeleteForever className="text-xl" />
        </span>
      </td>
    </tr>
  );
};

export default HeroRow;