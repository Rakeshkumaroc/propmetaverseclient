import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/global/Sidebar'  
import Navbar from '../components/global/Navbar'

const Admin = () => {
  return (
    <>
    <Navbar/>
    <div
    style={{ overflowx: "hidden" }}
    className="  flex lg:flex-row flex-col   w-full h-screen    relative  mt-[120px] md:mt-[150px] xl:mt-[150px] 2xl:mt-[200px]"
  >
    <Sidebar />
    <Outlet />
  </div>
  </>
  )
}

export default Admin