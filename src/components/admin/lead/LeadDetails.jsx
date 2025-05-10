import React, { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiMessageSquare } from "react-icons/fi";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
import { TbStatusChange } from "react-icons/tb";

const LeadDetails = ({ setIsOpenLead, isOpenLead }) => {
  const { _id, name, email, phone, date, notes, status } = isOpenLead;
  const [selectedStatus, setSelectedStatus] = useState(status || "pending");

  // Handle status change locally
  const handleCheckboxChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  // Update status
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`${baseUrl}/update-lead-status/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Status updated successfully.",
          confirmButtonColor: "#1b639f",
        });
        setIsOpenLead(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update status. Please try again.",
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
      console.error("Error updating status:", error);
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
            { icon: FiMail, label: "Name", value: name },
            { icon: FiMail, label: "Email", value: email },
            { icon: FiPhone, label: "Phone", value: phone },
            {
              icon: FiCalendar,
              label: "Date",
              value: date ? new Date(date).toLocaleDateString() : "No date",
            },
            { icon: FiMessageSquare, label: "Notes", value: notes },
          ].map(({ icon: Icon, label, value }, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                <Icon className="text-black bg-gray-200 p-1 rounded-md text-2xl" />
                <p>
                  <strong className="block font-medium">{label}:</strong>
                </p>
              </div>
              <p>{value || "No value"}</p>
            </div>
          ))}

          {/* Status Checkboxes */}
          <div className="space-y-2 w-full col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <TbStatusChange className="text-black bg-gray-200 p-1 rounded-md text-2xl" />
              <strong className="block font-medium">Status:</strong>
            </div>
            <div className="flex gap-5 border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 justify-between">
              {["pending", "Responded", "Closed"].map((statusOption) => (
                <label
                  key={statusOption}
                  className="flex items-center gap-2 w-[30%]"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatus === statusOption}
                    onChange={() => handleCheckboxChange(statusOption)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  {statusOption}
                </label>
              ))}
            </div>
          </div>
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
            onClick={handleStatusUpdate}
            className="px-6 py-2 rounded-md cursor-pointer shadow-md bg-black hover:bg-black/90 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
