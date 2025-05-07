import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const HeroRow = ({
  value,
  index,
  selectedIds,
  handleCheckboxChange,
  setLoading,
}) => {
  const handleDelete = () => {
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
              confirmButtonColor: "#1b639f",
            });
          }
        } catch (error) {
          console.error("Error deleting hero:", error);
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
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
      >
        <div className="flex items-center justify-center gap-3">
          {value.title
            ? value.title.length > 15
              ? value.title.slice(0, 15) + ".."
              : value.title
            : "N/A"}
        </div>
      </th>
      <td className="px-6 py-4 text-center">
        {value.description
          ? value.description.length > 20
            ? value.description.slice(0, 20) + ".."
            : value.description
          : "N/A"}
      </td>
      <td className="px-6 py-4 text-center">{value.price || "N/A"}</td>
      <td className="px-6 py-4 text-center">{value.property_type || "N/A"}</td>
      <td className="px-6 py-4 text-center">{value.createdAt}</td>
      <td className="px-6 py-4 text-center">
        {value.updatedAt || "Not Updated"}
      </td>
      <td className="flex items-center gap-2 justify-center px-6 py-4">
        <Link
          to={value._id}
          className="font-medium text-black p-1 rounded-md bg-logoBlue/10 hover:bg-logoBlue transition-all duration-700 hover:underline cursor-pointer"
        >
          <MdEdit />
        </Link>
        <MdDeleteForever
          onClick={handleDelete}
          className="text-red-500 text-2xl bg-logoBlue/10 p-1 rounded-md cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default HeroRow;
