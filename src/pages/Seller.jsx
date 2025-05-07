import { Outlet } from 'react-router-dom'  
import SellerSidebar from '../components/seller/global/SellerSidebar';

const Seller = () => {
  return (
    <div
    style={{ overflowx: "hidden" }}
    className="bg-gray-100 flex lg:flex-row flex-col   w-full h-screen"
  >
    {/* <Navbar/> */}
    <SellerSidebar />
    
    <Outlet />
  </div>
  )
}

export default Seller;