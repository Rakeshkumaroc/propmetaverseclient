import React, { useContext, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import { BsList } from "react-icons/bs";  
import { MyContext } from "../../App";

const ActionsBtn = () => {
  const { enquiryRef } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false); // State to toggle icons
  const phone = "8055098000";
  const links = {
    phone: `tel:${phone}`,
    contact: "/contact-us",
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    linkedin: "https://in.linkedin.com",
  };

  const iconClass =
    "bg-white rounded-full p-1 border hover:bg-logoBlue cursor-pointer hover:text-white text-2xl";

  const handleClick = (action) => {
    if (typeof action === "function") {
      action();
    } else {
      window.open(action);
    }
  };

  return (
    <>
      <div className="fixed md:hidden left-1 sm:left-2 md:left-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 sm:gap-3 md:gap-5 z-50 ">
        <BsList
          className={iconClass}
          onClick={() => setIsOpen(!isOpen)} // Toggle visibility
        />
        {isOpen && (
          <>
            <FaPhone
              className={iconClass}
              onClick={() => handleClick(links.phone)}
            />
            <MdPermContactCalendar
              className={iconClass}
              onClick={() => handleClick(links.contact)}
            />
            <FaFacebook
              className={iconClass}
              onClick={() => handleClick(links.facebook)}
            />
            <FaInstagram
              className={iconClass}
              onClick={() => handleClick(links.instagram)}
            />
            <FaLinkedin
              className={iconClass}
              onClick={() => handleClick(links.linkedin)}
            />
          </>
        )}
      </div>
      <div className="fixed hidden left-1 sm:left-2 md:left-5 top-1/2 transform -translate-y-1/2 md:flex flex-col gap-2 sm:gap-3 md:gap-5 z-50 ">
        <FaPhone
          className={iconClass}
          onClick={() => handleClick(links.phone)}
        />
        <MdPermContactCalendar
          className={iconClass}
          onClick={() => handleClick(links.contact)}
        />
        <FaFacebook
          className={iconClass}
          onClick={() => handleClick(links.facebook)}
        />
        <FaInstagram
          className={iconClass}
          onClick={() => handleClick(links.instagram)}
        />
        <FaLinkedin
          className={iconClass}
          onClick={() => handleClick(links.linkedin)}
        />
      </div>
    </>
  );
};

export default ActionsBtn;
