import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/global/Sidebar'  

const Admin = () => {
  return (
    <div
    style={{ overflowx: "hidden" }}
    className="bg-gray-100 flex lg:flex-row flex-col   w-full h-screen"
  >
    {/* <Navbar/> */}
    <Sidebar />
    <Outlet />
  </div>
  )
}

export default Admin