import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const SellerRow = ({
  value,
  index,
  selectedIds,
  handleCheckboxChange,
  setLoading,
  setData,
}) => {
  // Handle single seller deletion
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
          const response = await fetch(`${baseUrl}/select-seller-delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ids: [value._id] }),
          });

          if (response.ok) {
            setData((prev) => prev.filter((item) => item._id !== value._id));
            Swal.fire({
              title: "Deleted!",
              text: "Seller has been deleted.",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
          } else {
            throw new Error("Failed to delete seller");
          }
        } catch (error) {
          console.error("Error deleting seller:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete seller. Please try again.",
            icon: "error",
            confirmButtonColor: "#1b639f",
          });
        }
      }
    });
  };

 // Handle status toggle (approve/reject)
const handleToggleStatus = async () => {
  const newStatus = value.approveStatus === "approved" ? "rejected" : "approved";
  Swal.fire({
    title: `Are you sure?`,
    text: `This will ${newStatus === "approved" ? "approve" : "reject"} the seller.`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#1b639f",
    cancelButtonColor: "#000",
    confirmButtonText: `Yes, ${newStatus === "approved" ? "approve" : "reject"} it!`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/sellers/${value._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ approveStatus: newStatus }),
        });

        if (response.ok) {
          setData((prev) =>
            prev.map((item) =>
              item._id === value._id
                ? { ...item, approveStatus: newStatus }
                : item
            )
          );
          Swal.fire({
            title: "Status Updated!",
            text: `Seller status changed to ${newStatus}.`,
            icon: "success",
            confirmButtonColor: "#1b639f",
          });
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update status. Please try again.",
          icon: "error",
          confirmButtonColor: "#1b639f",
        });
      } finally {
        setLoading(false);
      }
    }
  });
};

  // Use approveStatus directly, default to pending
  const displayStatus = value.approveStatus || "pending";

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
      {/* <td className="px-6 py-4 text-center">
        {value.sellerType === "subBroker"
          ? "Sub-Broker"
          : value.sellerType === "individualSeller"
          ? "Individual Seller"
          : "N/A"}
      </td> */}
      <td
        className={`px-6 py-4 text-cente ${
          displayStatus === "approved"
            ? "text-logoColor"
            : displayStatus === "rejected"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        {displayStatus}
      </td>
      <td className="px-6 py-4 text-center">
        {value.createdAt
          ? new Date(value.createdAt).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="flex items-center gap-2 justify-center px-6 py-4">
        <Link
          to={`/admin/seller-details/${value._id}`}
          className="font-medium text-blue-500 p-1 rounded-md bg-blue-100 hover:bg-blue-200 cursor-pointer"
        >
          <FiEye />
        </Link>
        {/* <Link
          to={`/admin/seller-edit/${value._id}`}
          className="font-medium text-black p-1 rounded-md bg-logoBlue/10 hover:bg-logoBlue transition-all duration-700 hover:underline cursor-pointer"
        >
          <MdEdit />
        </Link> */}
        <MdDeleteForever
          onClick={handleDelete}
          className="text-red-500 text-2xl bg-logoBlue/10 p-1 rounded-md cursor-pointer"
        />
       
      </td>
    </tr>
  );
};

export default SellerRow;
