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
      Swal.fire("Error", "Please select a seller", "error");
      return;
    }
    if (!validFrom || !validTo) {
      Swal.fire("Error", "Please select validFrom and validTo", "error");
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

      Swal.fire("Success", "Commission range saved", "success");

      // Reset
      setSelectedSeller("");
      setValidFrom("");
      setValidTo("");
      setInputRanges([{ minValue: "", maxValue: "", rate: "" }]);
      setIsFormOpen(false);

      const updated = await axios.get(`${baseUrl}/commissions`);
      setCommissions(updated.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Error saving commission", "error");
    }
  };

  return (
    <div className="bg-gray-100 text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div>
          <p className="text-[30px] font-semibold leading-[45px]">Commission Management</p>
          <p className="text-sm leading-[25.9px]">
            Manage commission rates and track earnings for sellers
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-3 border rounded-lg">
            <CiSearch className="text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search commissions"
              className="outline-none text-sm"
            />
          </div>
          <button
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              setSelectedSeller("");
              setInputRanges([{ minValue: "", maxValue: "", rate: "" }]);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg"
          >
            <FaPlus /> New Commission Range
          </button>
        </div>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-6 p-6 rounded-lg shadow-md space-y-6"
        >
          <h3 className="text-xl font-semibold">Set Commission Range</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Select Seller</label>
              <select
                value={selectedSeller}
                onChange={(e) => setSelectedSeller(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg outline-none"
                required
              >
                <option value="">-- Select Seller --</option>
                {sellers.map((seller) => (
                  <option key={seller._id} value={seller._id}>
                    {seller.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Valid From</label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Valid To</label>
              <input
                type="date"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg outline-none"
              />
            </div>
          </div>

          {inputRanges.map((range, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Min Value (₹)</label>
                <input
                  type="number"
                  value={range.minValue}
                  onChange={(e) =>
                    handleInputChange(index, "minValue", e.target.value)
                  }
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Max Value (₹)</label>
                <input
                  type="number"
                  value={range.maxValue}
                  onChange={(e) =>
                    handleInputChange(index, "maxValue", e.target.value)
                  }
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Rate (%)</label>
                <input
                  type="number"
                  value={range.rate}
                  onChange={(e) =>
                    handleInputChange(index, "rate", e.target.value)
                  }
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={addNewRange}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Range
            </button>

            {inputRanges.length > 1 && (
              <button
                type="button"
                onClick={removeLastRange}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                - Remove Range
              </button>
            )}

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
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
