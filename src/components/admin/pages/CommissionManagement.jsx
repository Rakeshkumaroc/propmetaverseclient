import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import CommissionTable from "../commission/CommissionTable";

const baseUrl = import.meta.env.VITE_APP_URL;

const CommissionManagement = () => {
  const [commissions, setCommissions] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [inputRanges, setInputRanges] = useState([
    { minValue: "", maxValue: "", rate: "" },
  ]);

  useEffect(() => {
    axios.get(`${baseUrl}/commissions`).then((res) => setCommissions(res.data));
    axios.get(`${baseUrl}/sellers`).then((res) => setSellers(res.data));
  }, []);

  const handleInputChange = (index, field, value) => {
    const updated = [...inputRanges];
    updated[index][field] = value;
    setInputRanges(updated);
  };

  const addNewRange = () => {
    setInputRanges([...inputRanges, { minValue: "", maxValue: "", rate: "" }]);
  };

  const removeLastRange = () => {
    if (inputRanges.length > 1) {
      setInputRanges(inputRanges.slice(0, -1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSeller) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select a seller",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      return;
    }
    if (!validFrom || !validTo) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select validFrom and validTo",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      return;
    }

    const payload = {
      sellerId: selectedSeller,
      validFrom,
      validTo,
      ranges: inputRanges.map((r) => ({
        minValue: parseFloat(r.minValue),
        maxValue: parseFloat(r.maxValue),
        rate: parseFloat(r.rate),
      })),
    };

    try {
      await axios.post(`${baseUrl}/set-commission-range`, payload);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Commission range saved",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });

      // Reset
      setSelectedSeller("");
      setValidFrom("");
      setValidTo("");
      setInputRanges([{ minValue: "", maxValue: "", rate: "" }]);
      setIsFormOpen(false);

      const updated = await axios.get(`${baseUrl}/commissions`);
      setCommissions(updated.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.response?.data?.error || "Error saving commission",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Commission Management
          </h2>
          <p className="text-base text-gray-600">
            Manage commission rates and track earnings for sellers
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex w-full md:w-fit items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-md transition">
            <CiSearch className="text-2xl text-gray-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search commissions..."
              className="w-48 outline-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              setSelectedSeller("");
              setInputRanges([{ minValue: "", maxValue: "", rate: "" }]);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            <FaPlus className="text-lg" />
            New Commission Range
          </button>
        </div>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-6 p-6 rounded-lg shadow-md space-y-6 z-[9999] relative"
        >
          <h3 className="text-2xl font-bold text-gray-800">
            Set Commission Range
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Select Seller
              </label>
              <select
                value={selectedSeller}
                onChange={(e) => setSelectedSeller(e.target.value)}
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                required
              >
                <option value="" className="text-gray-600">
                  -- Select Seller --
                </option>
                {sellers.map((seller) => (
                  <option key={seller._id} value={seller._id}>
                    {seller.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Valid From
              </label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                required
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Valid To
              </label>
              <input
                type="date"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                required
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
            </div>
          </div>

          {inputRanges.map((range, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Min Value (₹)
                </label>
                <input
                  type="number"
                  value={range.minValue}
                  onChange={(e) =>
                    handleInputChange(index, "minValue", e.target.value)
                  }
                  step="0.01"
                  required
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Max Value (₹)
                </label>
                <input
                  type="number"
                  value={range.maxValue}
                  onChange={(e) =>
                    handleInputChange(index, "maxValue", e.target.value)
                  }
                  step="0.01"
                  required
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Rate (%)
                </label>
                <input
                  type="number"
                  value={range.rate}
                  onChange={(e) =>
                    handleInputChange(index, "rate", e.target.value)
                  }
                  step="0.1"
                  required
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={addNewRange}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-base font-medium"
            >
              + Add Range
            </button>

            {inputRanges.length > 1 && (
              <button
                type="button"
                onClick={removeLastRange}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition text-base font-medium"
              >
                - Remove Range
              </button>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
            >
              Save Commission
            </button>
          </div>
        </form>
      )}

      <CommissionTable
        searchValue={search}
        commissions={commissions}
        setCommissions={setCommissions}
      />
    </div>
  );
};

export default CommissionManagement;