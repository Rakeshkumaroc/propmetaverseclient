import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import LeadDetails from "./LeadDetails";
import { MdOutlinePreview } from "react-icons/md";
const baseUrl = import.meta.env.VITE_APP_URL;

const LeadTable = ({ searchValue }) => {
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
        let result = await fetch(baseUrl + "/lead");
        result = await result.json();
        console.log("result", result);

        if (searchValue) {
          let filteredResult = result.filter(
            (item) =>
              item.name &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())
          );
          setData(
            filter === "Recent" ? filteredResult.reverse() : filteredResult
          );
        } else {
          setData(filter === "Recent" ? result.reverse() : result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFun();
  }, [filter, searchValue]);

  return (
    <>
      <div
        style={{ overflow: "auto" }}
        className="w-full sm:rounded-l-[30px] sm:rounded-r-md backdrop-blur-lg"
      >
        <div className="md:p-4 mt-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between p-3 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
              <div className="relative select-none flex justify-between w-full items-center cursor-pointer">
                <div className="flex items-center gap-5">
                  <div
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                  >
                    {filter}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
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
                  </div>
                  <div
                    style={{ display: isFilterOpen ? "" : "none" }}
                    className="z-10 top-[34px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownActionButton"
                    >
                      <li>
                        <p
                          onClick={() => {
                            setFilter("Recent");
                            setIsFilterOpen(!isFilterOpen);
                          }}
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          Recent
                        </p>
                      </li>
                      <li>
                        <p
                          onClick={() => {
                            setFilter("Oldest");
                            setIsFilterOpen(!isFilterOpen);
                          }}
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          Oldest
                        </p>
                      </li>
                    </ul>
                  </div>
                  <RiDeleteBin2Fill
                    onClick={handleDelete}
                    className="text-black font-medium rounded-lg text-md"
                  />
                </div>
                <p
                  onClick={downloadExcal}
                  className="cursor-pointer bg-black text-white p-1 px-3 rounded-md hover:scale-105 transition-all duration-200 hover:shadow-lg"
                >
                  Export <span className="hidden md:inline"> to Excel</span>
                </p>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        onClick={handleAllSelect}
                        id="checkbox-all-search"
                        type="checkbox"
                        checked={allSelect}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((value, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        value.status === "pending" ? "bg-white" : "bg-gray-200"
                      }`}
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${index}`}
                            type="checkbox"
                            checked={selectedIds.includes(value._id)}
                            onChange={() => handleCheckboxChange(value._id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${index}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap"
                      >
                        {value.name || "No name"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {value.phone || "No phone"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {value.email || "No email"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {value.date
                          ? new Date(value.date).toLocaleDateString()
                          : "No date"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {value.status || "No status"}
                      </td>
                      <td className="px-6 py-4 text-center flex items-center justify-center">
                        <MdOutlinePreview
                          className="text-2xl text-black"
                          onClick={() => setIsOpenLead(value)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenLead ? (
        <LeadDetails
          setIsOpenLead={setIsOpenLead}
          isOpenLead={isOpenLead}
          data={data}
        />
      ) : null}
    </>
  );
};

export default LeadTable;
