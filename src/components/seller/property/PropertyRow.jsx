import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const PropertyRow = ({
  value,
  index, 
  setIsPanding,
  selectedIds,
  handleCheckboxChange, 
  setLoading,
}) => {
  const navigater = useNavigate();
  const [isBoxChecked, setIsBoxChecked] = useState();

//   const conditions = [
//     { condition: !value.title, label: "Title" },
//     { condition: !value.developer, label: "Developer" },
//     { condition: !value.propertyType, label: "PropertyType" },
//     { condition: value.tags.length < 1, label: "Tags" },
//     { condition: !value.possessionDate, label: "PossessionDate" },
//     { condition: !value.status, label: "Status" },
//     { condition: !value.aboutDeveloper, label: "AboutDeveloper" },
//     { condition: !value.youtubeLink, label: "YoutubeLink" },
//     { condition: !value.overviewImg, label: "OverviewImg" },
//     { condition: !value.overviewText, label: "OverviewText" },
//     { condition: !value.rera?.[0]?.img, label: "ReraImg" },
//     { condition: !value.rera?.[0]?.no, label: "ReraNo" },
//     { condition: value.galleryImg.length < 5, label: "GalleryImg" },
//     { condition: !value.locationLink, label: "LocationLink" },
//     { condition: !value.fullAddress, label: "FullAddress" },
//     { condition: !value.district, label: "District" },
//     { condition: !value.products?.[0]?.type, label: "ProductsType" },
//     { condition: !value.products?.[0]?.carpetArea, label: "ProductsArea" },
//     { condition: !value.products?.[0]?.price, label: "ProductsPrice" },
//     { condition: !value.promoters?.[0]?.name, label: "Promoters" },
//     { condition: value.faqs.length < 3, label: "Faqs" },
//     { condition: !value.keywords?.[0]?.heading, label: "Keyword" },
//     { condition: !value.brochureLink, label: "BrochureLink" },
//     { condition: value.amenities.length < 5, label: "Amenities" },
//   ];
//   const failedCondition = conditions.filter((item) => item.condition);

//   const percentage = Math.round(
//     ((conditions.length - failedCondition.length) / conditions.length) * 100
//   );

  const handleDelete = () => {
    if (isBoxChecked) {
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
            console.log(value._id);
            
            const response = await fetch(baseUrl + "/select-property-delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ids: [value._id] }),
            });

            if (response.ok) {
              setLoading(response);
              Swal.fire({
                title: "Deleted!",
                text: "Your Client has been deleted.",
                icon: "success",
                confirmButtonColor: "#1b639f",
              });
            }
          } catch (error) {
            console.log("Error deleting client");
          }
        }
      });
    } else {
      // alert('Please check the select box')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check the select box!",
        confirmButtonColor: "#1b639f",
        cancelButtonColor: "#000",
      });
    }
  };
  return (
    <tr className="bg-white border-b relative hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${index}`}
            type="checkbox"
            checked={selectedIds.includes(value._id)}
            onChange={() => {
              handleCheckboxChange(value._id);
              setIsBoxChecked(true);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-00 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th className="px-6 py-4 text-center">{index + 1}</th>
      <th
        scope="row"
        className="px-6 py-4 flex items-center justify-center gap-3 text-center font-medium text-gray-900 whitespace-nowrap"
      >
        {value.title}
        <FaEye
          className="cursor-pointer"
          onClick={() => {
            const url ="/projects/" + value.title.replaceAll(' ','-')+'/'+value._id

            window.open(url, "_blank"); // Opens the URL in a new tab
          }}
        />
      </th>
      <td className="px-6 py-4 text-center">{value.createdAt}</td>
      <td className="px-6 py-4 text-center">{value.updatedAt?value.updatedAt:'Not Update'}</td>
      <td className="px-6 py-4 text-center">{value.propertyType}</td>
         <td className="px-6 py-4 text-center capitalize">{value.approveStatus}</td>
      <td className="flex items-center gap-2 text-center px-6 py-4">
        <Link
          to={value._id}
          className="font-medium text-center flex items-center justify-center text-black p-1 rounded-md bg-logoBlue/10 hover:bg-logoBlue transition-all duration-700 hover:underline cursor-pointer"
        >
          <MdEdit />
        </Link>

        {/* <span
          className={`${
            percentage < 40
              ? "text-red-500" // Red for less than 40%
              : percentage < 70
              ? "text-yellow-500" // Yellow for less than 70%
              : percentage >= 90
              ? "text-green-500" // Green for 95% and above
              : "text-yellow-400" // Lighter yellow for between 70% and 95%
          }`}
        >
          {percentage}%
        </span> */}
        {/* {isPanding === index && (
          <div className="flex items-center text-[10px] gap-2 justify-center absolute right-0 w-fit flex-wrap top-11 rounded-md px-1 bg-black text-white z-50">
            {failedCondition.length > 0 ? (
              failedCondition.map((item, index) => (
                <p key={index}>{item.label}</p>
              ))
            ) : (
              <p>Complete</p>
            )}
          </div>
        )} */}
        {/* <IoAlertCircle
          onMouseOver={() => setIsPanding(index)}
          onMouseLeave={() => setIsPanding(null)}
          className="text-black cursor-pointer relative"
        /> */}
        <MdDeleteForever
          onClick={handleDelete}
          className="text-red-500 text-2xl bg-logoBlue/10 p-1 rounded-md "
        />
      </td>
    </tr>
  );
};

export default PropertyRow;
