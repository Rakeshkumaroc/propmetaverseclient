import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import MyListingRow from "./MyListingRow";
const baseUrl = import.meta.env.VITE_APP_URL;

const MyListingTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Property");
    XLSX.writeFile(wb, "PropertyData.xlsx");
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        title: "No properties selected",
        text: "Please select at least one property to delete.",
        icon: "warning",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

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
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setData(data.filter((item) => !selectedIds.includes(item._id)));
            setSelectedIds([]);
            Swal.fire({
              title: "Deleted!",
              text: "Selected properties have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete properties");
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to delete properties. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
        if (!customerAuth || !customerAuth.user?._id) {
          Swal.fire({
            title: "Unauthorized",
            text: "Please log in to view properties.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
          setData([]);
          return;
        }

        const response = await fetch(`${baseUrl}/property/${customerAuth.user._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let result = await response.json();
        if (!Array.isArray(result)) {
          result = [];
        }

        if (searchValue) {
          result = result.filter((item) =>
            [
              item.title,
              item.developer,
              item.district,
              item.possessionDate,
              item.status,
              item.propertyType,
            ].some(
              (field) =>
                field &&
                field.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
        }

        setData(filter === "Recent" ? result : result.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filter, searchValue]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Property Listings</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
            >
              {filter}
              <svg
                className="w-2.5 h-2.5"
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
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => {
                        setFilter("Recent");
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Recent
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilter("Oldest");
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Oldest
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={downloadExcel}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Export to Excel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
          >
            <RiDeleteBin2Fill /> Delete Selected
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <span className="sr-only">Select</span>
              </th>
              <th scope="col" className="px-6 py-3 text-center">ID</th>
              <th scope="col" className="px-6 py-3 text-center">Title</th>
              <th scope="col" className="px-6 py-3 text-center">Created At</th>
              <th scope="col" className="px-6 py-3 text-center">Updated At</th>
              <th scope="col" className="px-6 py-3 text-center">Property Type</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((value, index) => (
                <MyListingRow
                  key={value._id}
                  value={value}
                  index={index}
                  selectedIds={selectedIds}
                  handleCheckboxChange={handleCheckboxChange}
                  setLoading={setLoading}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListingTable;