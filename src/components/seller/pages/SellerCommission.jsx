import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const SellerCommission = () => {
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const sellerId = localStorage.getItem("sellerId");
        if (!sellerId) {
          return Swal.fire("Error", "Seller not found.", "error");
        }

        const res = await axios.get(`${baseUrl}/commissions/by-seller/${sellerId}`);
        setCommissions(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch commissions.", "error");
        console.error(err);
      }
    };

    fetchCommissions();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${newStatus}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
      });

      if (!result.isConfirmed) return;

      await axios.put(`${baseUrl}/update-commission-status/${id}`, {
        status: newStatus,
      });

      Swal.fire("Success", "Commission status updated", "success");

      setCommissions((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: newStatus, updatedAt: new Date().toISOString() }
            : item
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
      console.error(error);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getStatusBadge = (status) => {
    const color =
      status === "accepted"
        ? "bg-green-100 text-green-700"
        : status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {capitalize(status)}
      </span>
    );
  };

  return (
    <div className="bg-gray-100 text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="mb-6">
        <h2 className="text-[26px] md:text-[30px] font-semibold">My Commissions</h2>
        <p className="text-sm text-gray-600">View your commission slabs and validity period</p>
      </div>

      {commissions.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No commission data found.</p>
      ) : (
        <div className="overflow-y-auto max-h-[calc(100vh-240px)] pr-1 scrollbar-thin scrollbar-thumb-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
            {commissions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-lg font-semibold">{item.sellerId?.fullName}</p>
                  </div>
                  <div className="text-sm flex items-center gap-1">
                    <span className="font-semibold text-gray-600">Status:</span>
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4 leading-6">
                  <p>Valid From: <strong>{item.validFrom?.slice(0, 10)}</strong></p>
                  <p>Valid To: <strong>{item.validTo?.slice(0, 10)}</strong></p>
                </div>

                <div>
                  <p className="font-medium text-sm mb-2">Commission Ranges:</p>
                  <ul className="space-y-2 text-sm">
                    {item.ranges.map((r, idx) => (
                      <li
                        key={r._id || idx}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                      >
                        <span>₹{r.minValue} - ₹{r.maxValue}</span>
                        <span className="font-semibold">{r.rate}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {item.status === "pending" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(item._id, "accepted")}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(item._id, "rejected")}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                    >
                      Rejected
                    </button>
                  </div>
                )}

                <p className="mt-4 text-xs text-gray-400">
                  Last updated: {new Date(item.updatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCommission;
