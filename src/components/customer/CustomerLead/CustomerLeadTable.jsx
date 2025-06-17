import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { MdOutlinePreview } from "react-icons/md";
import CustomerLeadDetails from "./CustomerLeadDetails";
import CustomerLeadRow from "./CustomerLeadRow";
const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerLeadTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isOpenLead, setIsOpenLead] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const downloadExcal = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "Leads.xlsx");
  };

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
          const response = await fetch(baseUrl + "/select-lead-delete", {
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
              text: "Selected leads have been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete leads");
          }
        } catch (error) {
          console.error("Error deleting leads:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete leads.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

  useEffect(() => {
    const getFun = async () => {
      try {
        let customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
        console.log('customerAuth',customerAuth);
        
        let result = await fetch(`${baseUrl}/lead/${customerAuth.user._id}`);
        result = await result.json();

        // Step 1: Filter by status if needed
        let filteredData = [...result];
        if (filter === "Closed") {
          filteredData = filteredData.filter(
            (item) => item.status === "Closed"
          );
        } else if (filter === "Recent") {
          filteredData = filteredData.reverse();
        } else if (filter === "Oldest") {
          // no action needed; keep original order
        }

        // Step 2: Filter by search value
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.name &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFun();
  }, [filter, searchValue]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Lead Listings</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                {filter}
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 6">
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
                    <li>
                      <button
                        onClick={() => {
                          setFilter("Closed");
                          setIsFilterOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Closed
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={downloadExcal}
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
        <div className="flex items-center justify-between p-3 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      checked={allSelect}
                      onChange={handleAllSelect}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  En Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((value, index) => (
                  <CustomerLeadRow
                    key={value._id}
                    value={value}
                    index={index}
                    selectedIds={selectedIds}
                    handleCheckboxChange={handleCheckboxChange}
                    setIsOpenLead={setIsOpenLead}
                    handleAllSelect={handleAllSelect}
                    allSelect={allSelect}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenLead && (
        <CustomerLeadDetails
          setIsOpenLead={setIsOpenLead}
          isOpenLead={isOpenLead}
          data={data}
        />
      )}
    </>
  );
};

export default CustomerLeadTable;
