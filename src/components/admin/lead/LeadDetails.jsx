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
import { TbStatusChange } from "react-icons/tb";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

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

  const [selectedSeller, setSelectedSeller] = useState(seller_id || "");
  const [seller, setSeller] = useState([]);

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
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
      }
    };

    fetchSellers();
  }, []);

  const currentSeller = seller.find((s) => s._id === seller_id)?.fullName || "No Seller Assigned";

  const handleUpdateSeller = async () => {
    if (!selectedSeller) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Please select a seller.",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
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
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
        setIsOpenLead(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorData.message || "Failed to update seller. Please try again.",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      console.error("Error updating seller:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="w-[90vw] max-w-[800px] bg-white rounded-xl shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Lead Details</h2>
          <p className="text-base text-gray-600 mt-2">
            Review the details of the lead below
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          {[
            { icon: FiUser, label: "Name", value: name || "No name" },
            { icon: FiMail, label: "Email", value: email || "No email" },
            { icon: FiPhone, label: "Phone", value: phone || "No phone" },
            {
              icon: FiCalendar,
              label: "Date",
              value: created_at
                ? new Date(created_at).toLocaleDateString("en-GB").replace(/\//g, "-")
                : "No date",
            },
            { icon: FiFileText, label: "Notes", value: notes || "No notes" },
            {
              icon: FiUsers,
              label: "Customer",
              value: customer_id ? (
                <Link
                  className="text-purple-600 hover:text-purple-800 transition font-medium"
                  target="_blank"
                  to={`/admin/customer-details/${customer_id}`}
                >
                  View
                </Link>
              ) : (
                <span className="text-gray-400">No customer</span>
              ),
            },
            {
              icon: FiHome,
              label: "Property",
              value: property_id ? (
                <Link
                  className="text-purple-600 hover:text-purple-800 transition font-medium"
                  target="_blank"
                  to={`/projects/property-details/${property_id}`}
                >
                  View
                </Link>
              ) : (
                <span className="text-gray-400">No property</span>
              ),
            },
            {
              icon: TbStatusChange,
              label: "Status",
              value: status || <span className="text-gray-400">No status</span>,
            },
            {
              icon: FiUserPlus,
              label: "Assign Seller",
              value: (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-base text-gray-600">
                      Current Seller: <span className="font-medium text-gray-800">{currentSeller}</span>
                    </p>
                    {seller_id && currentSeller !== "No Seller Assigned" && (
                      <Link
                        className="text-purple-600 hover:text-purple-800 transition text-base font-medium"
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
                    className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                  >
                    <option value="" className="text-gray-600">Select Seller</option>
                    {seller?.map(({ _id, fullName }) => (
                      <option
                        key={_id}
                        value={_id}
                        className={`p-2 ${
                          _id === seller_id
                            ? "bg-purple-100 text-purple-800 font-medium"
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
                <Icon className="text-gray-700 bg-gray-100 p-1.5 rounded-md text-xl" />
                <p className="text-base font-medium text-gray-800">{label}:</p>
              </div>
              <div className="mt-1 text-base text-gray-700">{value}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setIsOpenLead(false)}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition text-base font-medium"
          >
            Close
          </button>
          <button
            onClick={handleUpdateSeller}
            className="px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            Update Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;