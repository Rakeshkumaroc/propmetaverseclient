import { useEffect, useState } from "react";
import CardContainer from "../dashboard/CardContainer";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const navigater = useNavigate(null);
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("user"));
    if (result?.username) {
      setUserName(result.username.split(" ")[0]);
    }
    const today = new Date();
    setDate(
      today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-20 mt-10  md:mt-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-2xl md:text-[48px] ">
            Welcome to your dashboard, {userName || "Admin"}!
          </h1>
          <div className="flex items-center  justify-between gap-2 mt-4 md:mt-0 text-sm text-gray-700">
            <p className="text-gray-600 mt-1">We are glad to see you again!</p>
            <div className="flex items-center">
              <CalendarDays size={20} />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Property Button */}
      <div className="mb-8">
        <button
          onClick={() => {
            navigater("/admin/my-profile");
          }}
          className="flex items-center gap-2 bg-logoBlue hover:bg-logoBlue/90 text-white font-semibold py-2 px-4 rounded-full transition"
        >
          My Profile
          <span className="bg-white text-logoBlue rounded-full px-[10px] font-bold text-lg">
            +
          </span>
        </button>
      </div>

      <CardContainer />
    </div>
  );
};

export default Dashboard;
