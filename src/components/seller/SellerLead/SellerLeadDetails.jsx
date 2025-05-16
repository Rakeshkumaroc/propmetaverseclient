import React, { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiMessageSquare } from "react-icons/fi";
import Swal from "sweetalert2";
import { TbStatusChange } from "react-icons/tb";

const baseUrl = import.meta.env.VITE_APP_URL;

const SellerLeadDetails = ({ setIsOpenLead, isOpenLead }) => {
  const { _id, name, email, phone, date, notes, status, property_id } = isOpenLead;
  const [selectedStatus, setSelectedStatus] = useState(status || "pending");

  const [showCloseForm, setShowCloseForm] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [commission, setCommission] = useState(0);

  const handleCheckboxChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleStatusUpdate = async () => {
    if (selectedStatus === "Closed") {
      setShowCloseForm(true);
      return;
    }

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
        window.location.reload();
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
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40">
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
              {
                icon: FiMessageSquare,
                label: "Properties",
                value: (
                  <a
                    href={`/projects/property-details/${property_id}`}
                    className="text-blue-600 underline"
                  >
                    View Property
                  </a>
                ),
              },
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
              <div className="flex gap-5 border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 justify-between ">
                {["pending", "Responded", "Closed", "Negotiation", "Loss"].map(
                  (statusOption) => (
                    <label
                      key={statusOption}
                      className="flex items-center gap-2 w-[45%] md:w-[30%]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatus === statusOption}
                        onChange={() => handleCheckboxChange(statusOption)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      {statusOption}
                    </label>
                  )
                )}
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

      {/* Selling Price Popup Form */}
      {showCloseForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Close Lead</h3>

            <label className="block mb-3">
              Selling Price:
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => {
                  setSellingPrice(e.target.value);
                  setCommission((e.target.value * 0.02).toFixed(2));
                }}
                placeholder="Enter selling price"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            {commission > 0 && (
              <p className="mb-3">
                <strong>Commission (2%): ₹{commission}</strong>
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCloseForm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!sellingPrice) {
                    return Swal.fire("Please enter a selling price");
                  }

                  try {
                    const response = await fetch(
                      `${baseUrl}/update-lead-status/${_id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          status: "Closed",
                          sellingPrice,
                          commission,
                        }),
                      }
                    );

                    if (response.ok) {
                      Swal.fire({
                        icon: "success",
                        title: "Lead Closed",
                        text: `Status updated to 'Closed'. Commission: ₹${commission}`,
                        confirmButtonColor: "#1b639f",
                      });
                      setShowCloseForm(false);
                      setIsOpenLead(false);
                      window.location.reload();
                    } else {
                      Swal.fire("Failed to update lead status.");
                    }
                  } catch (error) {
                    console.error(error);
                    Swal.fire("Something went wrong.");
                  }
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-black/80"
              >
                Confirm Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerLeadDetails;
