import { useEffect, useState } from "react";
import CardContainer from "../card/SellerCardContainer";
import { HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";

const SellerDashboard = () => {
  const [userName, setUserName] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [data, setData] = useState();
  const [status, setStatus] = useState("approved"); // Change to "approved" or "rejected" to test

  useEffect(() => {
    const result = localStorage.getItem("sellerFullName");
    if (result) {
      let firstName = result.split(" ")[0];
      setUserName(firstName);
    }

    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper: Get badge styles based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          text: "Status: Approved",
          bg: "bg-green-100",
          textColor: "text-green-700",
          border: "border-green-300",
          icon: <HiCheckCircle className="inline mr-1 text-green-600" />,
        };
      case "rejected":
        return {
          text: "Status: Rejected",
          bg: "bg-red-100",
          textColor: "text-red-700",
          border: "border-red-300",
          icon: <HiXCircle className="inline mr-1 text-red-600" />,
        };
      default:
        return {
          text: "Status: Pending Approval",
          bg: "bg-yellow-100",
          textColor: "text-yellow-700",
          border: "border-yellow-300",
          icon: <HiClock className="inline mr-1 text-yellow-600" />,
        };
    }
  };

  const badge = getStatusBadge(status);

  return (
    <div className="bg-gray-100 text-black sm:px-8 px-3 2xl:px-16 mt-5 md:mt-36 w-full">
      {/* Welcome Section */}
      <div className="space-y-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-[30px] font-semibold leading-[45px] text-gray-800">
            Welcome, {userName}!
          </p>
          <p
            className={`text-sm font-medium px-3 py-1 rounded-md border flex items-center ${badge.bg} ${badge.textColor} ${badge.border}`}
          >
            {badge.icon}
            {badge.text}
          </p>
        </div>
        <p className="text-sm leading-[25.9px] text-gray-600">
          We're glad to see you again!
        </p>
        <p className="text-sm font-medium text-gray-600">
          📅 {dateTime.toLocaleDateString()} 🕒 {dateTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Dashboard Content */}
      {status === "approved" ? (
        <CardContainer />
      ) : (
        <div className={`mt-10 p-6 ${badge.bg} border-l-4 ${badge.border} ${badge.textColor} rounded-md`}>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            {badge.icon}
            {badge.text}
          </h2>
          <p>
            {status === "rejected"
              ? "Unfortunately, your seller profile was not approved. Please review your submission or contact support."
              : "Your profile is under review. You'll be notified once it's approved."}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Need help?{" "}
            <a href="/contact-us" className="text-blue-600 underline hover:text-blue-800">
              Contact support
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
