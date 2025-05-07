import { useEffect, useState } from "react";
import CardContainer from "../dashboard/CardContainer";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Get user from localStorage
    let result = JSON.parse(localStorage.getItem("user"));
    if (result && result.username) {
      let firstName = result.username.split(" ")[0];
      setUserName(firstName);
    }

    // Update date and time every second
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-gray-100 text-black sm:px-8 px-3 2xl:px-16 mt-5 md:mt-36 w-full">
      <div className="space-y-1">
        <p className="text-[30px] font-semibold leading-[45px]">Welcome, {userName}!</p>
        <p className="text-sm leading-[25.9px]">We are glad to see you again!</p>
        <p className=" font-medium text-gray-600">
          📅 {dateTime.toLocaleDateString()} 🕒 {dateTime.toLocaleTimeString()}
        </p>
      </div>
      <CardContainer />
    </div>
  );
};

export default Dashboard;
