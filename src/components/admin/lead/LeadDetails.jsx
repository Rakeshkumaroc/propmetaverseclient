import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiUser,
  FiFileText,
  FiUsers,
  FiHome,
  FiUserPlus,
} from "react-icons/fi";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
import { TbStatusChange } from "react-icons/tb";

const LeadDetails = ({ setIsOpenLead, isOpenLead }) => {
  const {
    _id,
    name,
    email,
    phone,
    notes,
    status,
    customer_id,
    seller_id,
    property_id,
    created_at,
  } = isOpenLead;

  // State for selected seller and seller data
  const [selectedSeller, setSelectedSeller] = useState(seller_id || "");
  const [seller, setSeller] = useState([]);

  // Fetch sellers from the server
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch(`${baseUrl}/sellers`);
        const data = await response.json();
        setSeller(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch sellers. Please try again later.",
          confirmButtonColor: "#1b639f",
        });
      }
    };

    fetchSellers();
  }, []);

  // Find the current seller's name
  const currentSeller = seller.find((s) => s._id === seller_id)?.fullName || "No Seller Assigned";

  // Update seller
  const handleUpdateSeller = async () => {
    if (!selectedSeller) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Please select a seller.",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/update-lead-seller/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerId: selectedSeller }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Seller updated successfully.",
          confirmButtonColor: "#1b639f",
        });
        setIsOpenLead(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorData.message || "Failed to update seller. Please try again.",
          confirmButtonColor: "#1b639f",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#1b639f",
      });
      console.error("Error updating seller:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="w-[70vw] max-w-[800px] bg-white rounded-lg shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Lead Details</h2>
          <p className="text-black">Review the details of the lead below</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          {[
            { icon: FiUser, label: "Name", value: name },
            { icon: FiMail, label: "Email", value: email },
            { icon: FiPhone, label: "Phone", value: phone },
            {
              icon: FiCalendar,
              label: "Date",
              value: created_at
                ? new Date(created_at)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")
                : "No date",
            },
            { icon: FiFileText, label: "Notes", value: notes },
            {
              icon: FiUsers,
              label: "Customer",
              value: (
                <Link
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  to={`/admin/customer-details/${customer_id}`}
                >
                  View
                </Link>
              ),
            },
            {
              icon: FiHome,
              label: "Property",
              value: (
                <Link
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  to={`/projects/property-details/${property_id}`}
                >
                  View
                </Link>
              ),
            },
            { icon: TbStatusChange, label: "Status", value: status },
            {
              icon: FiUserPlus,
              label: "Assign Seller",
              value: (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Current Seller: <span className="font-semibold text-gray-800">{currentSeller}</span>
                    </p>
                    {seller_id && currentSeller !== "No Seller Assigned" && (
                      <Link
                        className="text-blue-500 hover:underline text-sm"
                        target="_blank"
                        to={`/admin/seller-details/${seller_id}`}
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                  <select
                    value={selectedSeller}
                    onChange={(e) => setSelectedSeller(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700"
                  >
                    <option value="">Select Seller</option>
                    {seller?.map(({ _id, fullName }) => (
                      <option
                        key={_id}
                        value={_id}
                        className={`p-2 ${
                          _id === seller_id
                            ? "bg-blue-100 text-blue-800 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {fullName}
                      </option>
                    ))}
                  </select>
                </div>
              ),
              isFullWidth: true,
            },
          ].map(({ icon: Icon, label, value, isFullWidth }, index) => (
            <div key={index} className={isFullWidth ? "sm:col-span-2" : ""}>
              <div className="flex items-center gap-3">
                <Icon className="text-black bg-gray-200 p-1 rounded-md text-2xl" />
                <p>
                  <strong className="block font-medium">{label}:</strong>
                </p>
              </div>
              <div>{value || "No value"}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setIsOpenLead(false)}
            className="bg-gray-600 cursor-pointer text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700"
          >
            Close
          </button>
          <button
            onClick={handleUpdateSeller}
            className="px-6 py-2 rounded-md cursor-pointer shadow-md bg-black hover:bg-black/90 text-white"
          >
            Update Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;