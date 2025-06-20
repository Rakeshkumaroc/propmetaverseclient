import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const SellerDetails = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/single-sellers/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch seller");
        }
        const data = await response.json();
        console.log(data);
        if (!data.sellerData) {
          throw new Error("Seller not found");
        }
        setSeller(data.sellerData); 
        
      } catch (error) {
        console.error("Error fetching seller:", error);
        Swal.fire({
          title: "Error!",
          text:
            error.message || "Failed to fetch seller data. Please try again.",
          icon: "error",
          confirmButtonColor: "#1b639f",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  // Handle status toggle (approve/reject)
  const handleToggleStatus = async () => {
    const newStatus =
      seller.approveStatus === "approved" ? "rejected" : "approved";
    Swal.fire({
      title: `Are you sure?`,
      text: `This will ${
        newStatus === "approved" ? "approve" : "reject"
      } the seller.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1b639f",
      cancelButtonColor: "#000",
      confirmButtonText: `Yes, ${
        newStatus === "approved" ? "approve" : "reject"
      } it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await fetch(`${baseUrl}/update-seller-status/${seller._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ approveStatus: newStatus }),
          });

          if (response.ok) {
            setSeller((prev) => ({
              ...prev,
              approveStatus: newStatus,
            }));
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

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-gray-600 text-base font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-gray-600 text-base font-medium">
          Seller not found
        </div>
      </div>
    );
  }

  // Use approveStatus directly, default to pending
  const displayStatus = seller.approveStatus || "pending";

  return (
    <div className="bg-gray-100 overflow-y-auto text-gray-800 sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Seller Details
        </h1>
        <div className="bg-white shadow rounded p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
            <img
              src={seller.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {seller.fullName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-700">
                <div className="space-y-5">
                  <p>
                    <strong className="font-medium text-gray-800">
                      Email:
                    </strong>{" "}
                    {seller.email}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Phone:
                    </strong>{" "}
                    {seller.number || "N/A"}
                  </p>
                  {/* <p>
                    <strong className="font-medium text-gray-800">Role:</strong>{" "}
                    {seller.sellerType === "subBroker"
                      ? "Sub-Broker"
                      : seller.sellerType === "individualSeller"
                      ? "Individual Seller"
                      : "N/A"}
                  </p> */}
                  <p className="flex items-center gap-4">
                    <span>
                      <strong className="font-medium text-gray-800">
                        Status:
                      </strong>{" "}
                      <span
                        className={`capitalize ${
                          displayStatus === "approved"
                            ? "text-green-600"
                            : displayStatus === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {displayStatus}
                      </span>
                    </span>
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Created At:
                    </strong>{" "}
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Updated At:
                    </strong>{" "}
                    {new Date(seller.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-5">
                  <p>
                    <strong className="font-medium text-gray-800">Bio:</strong>{" "}
                    {seller.bio || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Address:
                    </strong>{" "}
                    {seller.fullAddress || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      District:
                    </strong>{" "}
                    {seller.district || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      State:
                    </strong>{" "}
                    {seller.state || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Pincode:
                    </strong>{" "}
                    {seller.pincode || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Google User:
                    </strong>{" "}
                    {seller.isGoogleUser ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end items-center gap-4">
            <button
              onClick={handleToggleStatus}
              className={`  rounded text-base font-semibold text-white shadow-md py-2 px-6  ${
                displayStatus === "approved"
                  ? "bg-red-500  "
                  : "bg-logoColor "
              }`}
            >
              {displayStatus === "approved" ? "Reject" : "Approve"}
            </button>
            <Link
              to="/admin/manage-sellers"
              className="bg-logoBlue text-white py-2 px-6 rounded text-base font-semibold  shadow-md"
            >
              Back to Sellers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
