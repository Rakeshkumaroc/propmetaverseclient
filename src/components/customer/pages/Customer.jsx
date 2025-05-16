import { Outlet } from "react-router-dom"; 
import CustomerSidebar from "../global/CustomerSidebar";

const Customer = () => {
  return (
    <div
      style={{ overflowX: "hidden" }}
      className="bg-gray-100 flex lg:flex-row flex-col w-full h-screen"
    >
      <CustomerSidebar />
      <Outlet />
    </div>
  );
};

export default Customer;