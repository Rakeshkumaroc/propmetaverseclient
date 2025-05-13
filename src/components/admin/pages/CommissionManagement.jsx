import { useState } from "react";
import CommissionTable from "../commission/CommissionTable";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const CommissionManagement = () => {
  const [commissionRate, setCommissionRate] = useState(5); // Default rate: 5%
  const [error, setError] = useState("");

  // Handle commission rate update
  const handleRateChange = async (e) => {
    e.preventDefault();
    const newRate = parseFloat(e.target.rate.value);
    if (isNaN(newRate) || newRate < 0 || newRate > 100) {
      setError("Please enter a valid commission rate (0-100%)");
      return;
    }
    setError("");
    setCommissionRate(newRate);

    // API call to save commission rate (replace with actual endpoint)
    try {
      const response = await fetch(`${baseUrl}/set-commission-rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rate: newRate }),
      });
      if (!response.ok) throw new Error("Failed to save commission rate");
     
        Swal.fire({
              title: "Updated!",
              text: "Commission rate updated successfully!",
              icon: "success",
              confirmButtonColor: "#1b639f",
            });
    } catch (err) {
      setError("Error saving commission rate");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            Commission Management
          </p>
          <p className="text-sm leading-[25.9px]">
            Manage commission rates and track earnings for all sellers.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4"></div>
      </div>

      {/* Commission Rate Form */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Set Commission Rate</h2>
        <form onSubmit={handleRateChange} className="flex flex-col gap-4 max-w-md">
          <div>
            <label htmlFor="rate" className="block text-sm font-medium">
              Commission Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              name="rate"
              defaultValue={commissionRate}
              step="0.1"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter commission rate (e.g., 5)"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Save Rate
          </button>
        </form>
      </div>

      {/* Commission Table */}
      <div className="mt-6">
        <CommissionTable commissionRate={commissionRate} />
      </div>
    </div>
  );
};

export default CommissionManagement;