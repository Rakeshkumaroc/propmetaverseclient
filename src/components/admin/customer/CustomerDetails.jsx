import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`${baseUrl}/view-customers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer");
        }
        const result = await response.json();
        setCustomer(result);
      } catch (error) {
        console.error("Error fetching customer:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch customer details. Please try again.",
          icon: "error",
          confirmButtonColor: "#1b639f",
        });
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) {
    return (
      <div className="bg-gray-100 overflow-y-auto text-gray-800 sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
        <div className="w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Customer not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 overflow-y-auto text-gray-800 sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Customer Details
        </h1>
        <div className="bg-white shadow rounded p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
            <img
              src={customer.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {customer.fullName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-700">
                <div className="space-y-5">
                  <p>
                    <strong className="font-medium text-gray-800">ID:</strong>{" "}
                    {customer._id}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Email:
                    </strong>{" "}
                    {customer.email || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Phone:
                    </strong>{" "}
                    {customer.number || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Google User:
                    </strong>{" "}
                    {customer.isGoogleUser ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Google Verified:
                    </strong>{" "}
                    {customer.isGoogleVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Location:
                    </strong>{" "}
                    {customer.preferences?.location || "N/A"}
                  </p>
                </div>
                <div className="space-y-5">
                  <p>
                    <strong className="font-medium text-gray-800">
                      Property Type:
                    </strong>{" "}
                    {customer.preferences?.propertyType || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Min Budget:
                    </strong>{" "}
                    ₹
                    {customer.preferences?.minBudget?.toLocaleString() || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Max Budget:
                    </strong>{" "}
                    ₹
                    {customer.preferences?.maxBudget?.toLocaleString() || "N/A"}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Created At:
                    </strong>{" "}
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-800">
                      Updated At:
                    </strong>{" "}
                    {new Date(customer.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Search History:
                </h3>
                {customer.searchHistory?.length > 0 ? (
                  <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customer.searchHistory.map((search, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <FaSearch className="text-logoBlue" />
                        <span className="text-sm">
                          <span className="font-medium text-gray-800">
                            {search.query}
                          </span>
                          <span className="text-gray-500">
                            {" ("}
                            {new Date(search.timestamp).toLocaleDateString()}
                            {")"}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">None</p>
                )}
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Saved Properties:
                </h3>
                {customer.savedProperties?.length > 0 ? (
                  <div className="  grid grid-cols-1 md:grid-cols-2  gap-4">
                    {customer.savedProperties.map((property, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                      >
                        <img
                          src={
                            property.galleryImg
                              ? `${baseUrl}${property.galleryImg}`
                              : "https://via.placeholder.com/300x200"
                          }
                          alt={property.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {property.title || "Untitled Property"}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {property.address || "No address provided"}
                        </p>
                        <p className="text-sm font-medium text-logoBlue mt-1">
                          ₹{property.price?.toLocaleString() || "N/A"}
                        </p>
                        {property.numbering && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Rank:</strong> {property.numbering}
                          </p>
                        )}
                        {property.notes && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            <strong>Notes:</strong> {property.notes}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          <strong>Saved:</strong>{" "}
                          {new Date(property.savedAt).toLocaleDateString()}
                        </p>
                        <Link
                          to={`/property/${property._id}`}
                          className="mt-3 text-logoBlue text-sm font-semibold hover:underline self-start"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">None</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end items-center gap-4">
            <Link
              to="/admin/view-customers"
              className="bg-logoBlue text-white py-2 px-6 rounded text-base font-semibold shadow-md"
            >
              Back to Customers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
