import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
const baseUrl = import.meta.env.VITE_APP_URL;

const UserTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState();
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
    XLSX.utils.book_append_sheet(wb, ws, "User");
    XLSX.writeFile(wb, "User.xlsx");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(baseUrl + "/select-user-delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            setLoading(response);
            Swal.fire({
              title: "Deleted!",
              text: "Your User has been deleted.",
              icon: "success",
              confirmButtonColor: "#000",
            });
          }
        } catch (error) {
          console.log("Error deleting User");
          Swal.fire({
            title: "Deleted!",
            text: "Your User has been deleted.",
            icon: "success",
            confirmButtonColor: "#000",
          });
        }
      }
    });
  };

  useEffect(() => {
    const getFun = async () => {
      try {
        let result = await fetch(baseUrl + "/admin");
        result = await result.json();

        if (searchValue) {
          let filteredResult = result.filter((item) => {
            return (
              item.username &&
              item.username.toLowerCase().includes(searchValue.toLowerCase())
            );
          });

          // Sort based on filter criteria
          if (filter === "Recent") {
            setData(filteredResult);
          } else {
            setData(filteredResult.reverse());
          }
        } else {
          if (filter === "Recent") {
            setData(result);
          } else {
            result = result.reverse();
            setData(result);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFun();
  }, [loading, filter, searchValue]);

  return (
    <>
      <div
        style={{ overflow: "auto" }}
        className="w-full sm:rounded-l-[30px] sm:rounded-r-md backdrop-blur-lg"
      >
        <div className="md:p-4 mt-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex  items-center justify-between p-3 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white ">
              <div className="relative select-none flex justify-between w-full items-center cursor-pointer">
                <div className="flex items-center gap-5">
                  <div
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                    }}
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5    "
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
                  {/* <!-- Dropdown menu --> */}

                  <div
                    style={{ display: isFilterOpen ? "" : "none" }}
                    className="z-10 top-[34px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md  "
                  >
                    <ul
                      className="py-1 text-sm text-gray-700  "
                      aria-labelledby="dropdownActionButton"
                    >
                      <li>
                        <p
                          onClick={() => {
                            setFilter("Recent");
                            setIsFilterOpen(!isFilterOpen);
                          }}
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100 "
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
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100 "
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
                  className="cursor-pointer bg-black text-white p-1 px-3  rounded-md  hover:scale-105 transition-all duration-200 hover:shadow-lg"
                >
                  Export <span className="hidden md:inline"> to Excel</span>
                </p>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
              <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50   ">
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
                    Number
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Type
                  </th>

                  <th scope="col" className="px-6 py-3 ">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((value, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          className="bg-white border-b hover:bg-gray-50 "
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id={`checkbox-table-search-${index}`}
                                type="checkbox"
                                checked={selectedIds.includes(value._id)}
                                onChange={() => handleCheckboxChange(value._id)}
                                className="w-4 h-4 text-blue-600 bg-gray-00 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor={`checkbox-table-search-${index}`}
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <th className="px-6 py-4 text-center">{index + 1}</th>
                          <th
                            scope="row"
                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap "
                          >
                            {value.username ? value.username : "no name"}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {value.number ? value.number : "no phone"}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {value.email ? value.email : "no email"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {value.userType ? value.userType : "no value"}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {value.password ? value.password : "no value"}
                          </td>
                          <td className="px-6 py-4 flex items-center justify-center text-center">
                            <Link
                              to={value._id}
                              className="font-medium text-center  flex items-center justify-center     text-black p-1 rounded-md bg-logoYellow/10 hover:bg-logoYellow transition-all duration-700  hover:underline cursor-pointer "
                            >
                              <BiEdit className="text-xl" />
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
