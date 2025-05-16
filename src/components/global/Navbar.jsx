import { useState, useEffect, useContext } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdEmail, MdHome, MdOutlineStar } from "react-icons/md";
import { VscDiff } from "react-icons/vsc"; // Added for Compare icon
import { Link } from "react-router-dom";
import Logo from "../../assets/logopng.png";
import { RiLoginBoxFill, RiUserFill } from "react-icons/ri";
import { MyContext } from "../../App";
// import Popup from "./Popup";
// import DamacPopUp from "./DamacPopUp";
import ChatBot from "./ChatBot";
import ActionsBtn from "./ActionsBtn";

const Navbar = ({ isGlass }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isPopUpOpen, setIsPopUpOpen, damacIsPopUpOpen, setDamacIsPopUpOpen } =
    useContext(MyContext);

  useEffect(() => {
    // Check authentication status on mount
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    setIsAuthenticated(!!(customerAuth && customerAuth.token));

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setDamacIsPopUpOpen(true);
    }, 10000);
    setTimeout(() => {
      setIsPopUpOpen(true);
    }, 15000);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsPopUpOpen, setDamacIsPopUpOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out 
      ${
        scrolled || !isGlass
          ? "bg-[#061a33] shadow-lg"
          : "bg-transparent backdrop-blur-xl"
      } text-white `}
      >
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 text-[18px] border-b border-gray-600">
          <div className="flex items-center space-x-4 py-1">
            <span className="flex items-center space-x-1">
              <FaPhoneAlt />
              <span>+91 80 5509 8000</span>
            </span>
            <span className="flex items-center space-x-1">
              <MdEmail />
              <span>support@propmetaverse.com</span>
            </span>
          </div>
          <div className="space-x-8 flex items-center">
            <Link
              to="/compare"
              className="hover:text-logoColor flex items-center gap-1"
            >
              <VscDiff /> Compare
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  className="hover:text-logoColor flex items-center gap-1"
                >
                  <MdOutlineStar /> Favorites
                </Link>
              </>
            )}
            <div className="flex items-center gap-1">
              {isAuthenticated ? (
                <Link
                  to="/customer"
                  className="hover:text-logoColor flex items-center gap-1"
                >
                  <RiUserFill /> Profile
                </Link>
              ) : (
                <>
                  <RiLoginBoxFill />
                  <Link className="hover:text-logoColor" to="/customer-sign-up">
                    Client  Register
                  </Link>
                  /
                  <Link className="hover:text-logoColor" to="/customer-sign-in" >
                    Login
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center">
              <FaFacebookF className="border-l p-3 text-4xl border-gray-600" />
              <FaTwitter className="border-l p-3 text-4xl border-gray-600" />
              <FaLinkedinIn className="border-x p-3 text-4xl border-gray-600" />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="flex justify-between items-center px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 py-4">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="logo" className="w-32 md:w-40" />
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center absolute md:static top-[60px] left-0 w-full md:w-auto 
        bg-[#061a33] md:bg-transparent md:space-x-5 lg:space-x-10 space-y-6 md:space-y-0 p-6 md:p-0`}
          >
            <li>
              <Link to="/" className="hover:text-logoColor flex items-center">
                <MdHome />
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-logoColor">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-logoColor">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-logoColor">
                Contact
              </Link>
            </li>
            <li>
              <button className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 rounded w-full md:w-auto">
                <Link to="/seller-sign-up">Partner With Us</Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {/* {isPopUpOpen ? <Popup /> : null}
      {damacIsPopUpOpen ? <DamacPopUp /> : null} */}
      <ChatBot />
      <ActionsBtn />
    </>
  );
};

export default Navbar;
