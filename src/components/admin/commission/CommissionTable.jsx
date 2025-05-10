import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_APP_URL;

// Sample data (replace with API call)
const sampleCommissions = [
  {
    transactionId: "TX001",
    sellerName: "John Doe",
    propertyId: "PROP001",
    salePrice: 500000,
    commission: 25000, // 5% of 500,000
    status: "Closed",
  },
  {
    transactionId: "TX002",
    sellerName: "Jane Smith",
    propertyId: "PROP002",
    salePrice: 300000,
    commission: 15000, // 5% of 300,000
    status: "Pending",
  },
  // Add more sample data as needed
];

const CommissionTable = ({ commissionRate }) => {
  const [commissions, setCommissions] = useState(sampleCommissions);

  // Fetch commissions from API (replace with actual endpoint)
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await fetch(`${baseUrl}/commissions`);
        if (response.ok) {
          const data = await response.json();
          setCommissions(data);
        } else {
          console.error("Failed to fetch commissions");
        }
      } catch (error) {
        console.error("Error fetching commissions:", error);
      }
    };
    // fetchCommissions(); // Uncomment when API is ready
  }, []);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Transaction ID,Seller Name,Property ID,Sale Price,Commission,Status"];
    const rows = commissions.map((item) => [
      item.transactionId,
      item.sellerName,
      item.propertyId,
      item.salePrice,
      item.commission,
      item.status,
    ].join(","));
    const csvContent = [...headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "commissions.csv";
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Commission Records</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          <FaDownload /> Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-sm font-semibold">Transaction ID</th>
              <th className="p-3 text-sm font-semibold">Seller Name</th>
              <th className="p-3 text-sm font-semibold">Property ID</th>
              <th className="p-3 text-sm font-semibold">Sale Price</th>
              <th className="p-3 text-sm font-semibold">Commission</th>
              <th className="p-3 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {commissions.length > 0 ? (
              commissions.map((item) => (
                <tr key={item.transactionId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.transactionId}</td>
                  <td className="p-3">{item.sellerName}</td>
                  <td className="p-3">{item.propertyId}</td>
                  <td className="p-3">${item.salePrice.toLocaleString()}</td>
                  <td className="p-3">${item.commission.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center">
                  No commission records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionTable;