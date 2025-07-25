import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiFlag,
} from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";
import { LuMapPinned } from "react-icons/lu";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const EnquiryDetails = ({ setIsOpenEnquiry, isOpenEnquiry }) => {
  const {
    _id,
    name,
    email,
    phone,
    gender,
    dob,
    city,
    pincode,
    workExperience,
    status,
  } = isOpenEnquiry;

  const [selectedStatus, setSelectedStatus] = useState(status || "Pending");

  // Handle status change (radio-like behavior for single selection)
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  // Update status
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`${baseUrl}/edit-enquiry/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: selectedStatus,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Enquiry updated successfully.",
          confirmButtonColor: "#000",
        });
        setIsOpenEnquiry(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update enquiry. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again later.",
      });
      console.error("Error updating enquiry:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      <div className="w-[90vw] max-w-[900px] bg-white rounded-xl shadow-2xl p-6 md:p-8 m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Enquiry Details
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Review and update the enquiry details below
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          {[
            { icon: FiFlag, label: "Name", value: name },
            { icon: FiMail, label: "Email", value: email },
            { icon: FiPhone, label: "Phone", value: phone },
            { icon: FiCalendar, label: "Gender", value: gender },
            { icon: FiClock, label: "DOB", value: dob },
            {
              icon: FiMessageSquare,
              label: "Work Experience",
              value: workExperience,
            },
            { icon: LuMapPinned, label: "City", value: city },
            { icon: IoLocationOutline, label: "Pincode", value: pincode },
          ].map(({ icon: Icon, label, value }, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon className="text-gray-700 bg-gray-100 p-2 rounded-md text-2xl flex-shrink-0" />
              <div>
                <strong className="block font-medium text-base text-gray-800">
                  {label}:
                </strong>
                <p className="text-base text-gray-600">
                  {value || <span className="text-gray-400">N/A</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Status Selection */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3">
            <TbStatusChange className="text-gray-700 bg-gray-100 p-2 rounded-md text-2xl" />
            <strong className="font-medium text-base text-gray-800">Status:</strong>
          </div>
          <div className="flex flex-wrap gap-4 border-[1px] border-gray-300 rounded-lg p-4 bg-gray-50">
            {["Pending", "Responded", "Closed"].map((statusOption) => (
              <label
                key={statusOption}
                className="flex items-center gap-2 text-base cursor-pointer"
              >
                <input
                  type="radio"
                  name="status"
                  checked={selectedStatus === statusOption}
                  onChange={() => handleStatusChange(statusOption)}
                  className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                />
                <span
                  className={`${
                    selectedStatus === statusOption
                      ? "text-purple-700 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {statusOption}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
          <button
            onClick={() => setIsOpenEnquiry(false)}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition text-base font-medium"
          >
            Close
          </button>
          <button
            onClick={handleStatusUpdate}
            className="px-6 py-2.5 bg-black text-white rounded-md shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            Update Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetails;