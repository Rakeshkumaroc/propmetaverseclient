import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import CommissionTable from "../commission/CommissionTable";

const baseUrl = import.meta.env.VITE_APP_URL;

const CommissionManagement = () => {
  const [inputSet, setInputSet] = useState({ minValue: "", maxValue: "", rate: "" });
  const [commissions, setCommissions] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCommission, setEditingCommission] = useState(null);

  // Fetch existing commissions
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/commissions`);
        setCommissions(response.data);
      } catch (err) {
        toast.error("Failed to fetch commissions", { position: "top-right" });
        console.error(err);
      }
    };
    fetchCommissions();
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setInputSet((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const range = {
        minValue: parseFloat(inputSet.minValue),
        maxValue: parseFloat(inputSet.maxValue),
        rate: parseFloat(inputSet.rate),
      };

      if (editingCommission) {
        // Update existing commission
        const response = await axios.put(`${baseUrl}/commissions/${editingCommission.setId}`, {
          ranges: [range],
        });

        // Refresh commissions list
        const updatedCommissions = await axios.get(`${baseUrl}/commissions`);
        setCommissions(updatedCommissions.data);

        toast.success("Commission range updated successfully!", { position: "top-right" });
      } else {
        // Add new commission
        const response = await axios.post(`${baseUrl}/set-commission-range`, {
          ranges: [range],
        });

        // Refresh commissions list
        const updatedCommissions = await axios.get(`${baseUrl}/commissions`);
        setCommissions(updatedCommissions.data);

        toast.success("Commission range added successfully!", { position: "top-right" });
      }

      // Reset form
      setInputSet({ minValue: "", maxValue: "", rate: "" });
      setIsFormOpen(false);
      setEditingCommission(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save commission range", {
        position: "top-right",
      });
      console.error(err);
    }
  };

  // Handle edit button click
  const handleEdit = (commission) => {
    setEditingCommission(commission);
    setInputSet({
      minValue: commission.minValue.toString(),
      maxValue: commission.maxValue.toString(),
      rate: commission.rate.toString(),
    });
    setIsFormOpen(true);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setInputSet({ minValue: "", maxValue: "", rate: "" });
    setIsFormOpen(false);
    setEditingCommission(null);
  };

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            Commission Management
          </p>
          <p className="text-sm leading-[25.9px]">
            Manage commission rates and track earnings for all sellers
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-lg py-4 border-[1px] border-gray-300">
            <CiSearch className="text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search commissions"
              className="w-40 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => {
              setEditingCommission(null);
              setInputSet({ minValue: "", maxValue: "", rate: "" });
              setIsFormOpen(!isFormOpen);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaPlus /> New Commission Range
          </button>
        </div>
      </div>

      {/* Commission Range Form */}
      {isFormOpen && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {editingCommission ? "Edit Commission Range" : "Set Commission Range"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Minimum Value ($)</label>
                <input
                  type="number"
                  value={inputSet.minValue}
                  onChange={(e) => handleInputChange("minValue", e.target.value)}
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  placeholder="Enter minimum value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Maximum Value ($)</label>
                <input
                  type="number"
                  value={inputSet.maxValue}
                  onChange={(e) => handleInputChange("maxValue", e.target.value)}
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  placeholder="Enter maximum value"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
              <input
                type="number"
                value={inputSet.rate}
                onChange={(e) => handleInputChange("rate", e.target.value)}
                step="0.1"
                required
                className="w-full md:w-1/2 px-3 py-2 border rounded-lg outline-none"
                placeholder="Enter commission rate (e.g., 5)"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {editingCommission ? "Update Range" : "Add Range"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <CommissionTable
        searchValue={search}
        commissions={commissions}
        setCommissions={setCommissions}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CommissionManagement;