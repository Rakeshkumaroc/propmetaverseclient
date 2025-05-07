import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import EnquiryDetails from "./EnquiryDetails";
import { MdOutlinePreview } from "react-icons/md";
const baseUrl = import.meta.env.VITE_APP_URL;

const EnquiryTable = ({ searchValue }) => {
  const [filter, setFilter] = useState("Recent");
  const [isOpenEnquiry, setIsOpenEnquiry] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState("");
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
    XLSX.utils.book_append_sheet(wb, ws, "WomensEPM");
    XLSX.writeFile(wb, "WomensEPM.xlsx");
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
          const response = await fetch(baseUrl + "/select-enquiry-delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds }),
          });

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Client has been deleted.",
              icon: "success",
              confirmButtonColor: "#000",
            });
          }
        } catch (error) {
          console.log("Error deleting client");
          Swal.fire({
            title: "Deleted!",
            text: "Your Client has been deleted.",
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
        let result = await fetch(baseUrl + "/enquiry");
        result = await result.json();

        if (searchValue) {
          let filteredResult = result.filter((item) => {
            return (
              item.name &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
          });

          // Sort based on filter criteria
          if (filter === "Recent") {
            setData(filteredResult.reverse());
          } else {
            setData(filteredResult);
          }
        } else {
          if (filter === "Recent") {
            result = result.reverse();
            setData(result);
          } else {
            setData(result);
          }
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
        className="w-full  sm:rounded-l-[30px] sm:rounded-r-md    backdrop-blur-lg"
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
                    className="z-10 top-[34px]  absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md  "
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
                    className="  text-black 
                 font-medium rounded-lg text-md"
                  />
                </div>

                <p
                  onClick={downloadExcal}
                  className="cursor-pointer bg-black  text-white p-1 px-3  rounded-md  hover:scale-105 transition-all duration-200 hover:shadow-lg"
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

                  <th scope="col" className="px-6 py-3 ">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of birth
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
                      <tr
                        key={index}
                        className={` border-b     ${
                          value.status == "Pending" ? "bg-white" : "bg-gray-200"
                        }`}
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
                          {value.name ? value.name : "no name"}
                        </th>
                        <td className="px-6 py-4 text-center">
                          {value.phone ? value.phone : "no phone"}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {value.email ? value.email : "no email"}
                        </td>

                        <td className="px-6 py-4 text-center ">
                          {value.gender ? value.gender : "no value"}
                        </td>
                        <td className="px-6 py-4 text-center ">
                          {value.dob ? value.dob : "no value"}
                        </td>
                        <td className="px-6 mx-auto text-center flex items-center justify-center py-4 text-nowrap">
                          <MdOutlinePreview
                            className="text-2xl text-black"
                            onClick={() => {
                              setIsOpenEnquiry(value); 
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenEnquiry ? (
        <EnquiryDetails
          setIsOpenEnquiry={setIsOpenEnquiry}
          isOpenEnquiry={isOpenEnquiry}
          data={data}
        />
      ) : null}
    </>
  );
};

export default EnquiryTable;
