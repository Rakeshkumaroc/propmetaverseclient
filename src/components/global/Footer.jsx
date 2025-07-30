import { Link } from "react-router-dom";
import Logo from "../../assets/footerlogopng.png";
import { useState } from "react";
import Swal from "sweetalert2";
import { BiLogoInstagramAlt } from "react-icons/bi";
const baseUrl = import.meta.env.VITE_APP_URL;

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { email };
      const response = await fetch(`${baseUrl}/add-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEmail("");
        // Show success SweetAlert
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Email submitted successfully!",
          confirmButtonText: "OK",
          confirmButtonColor: "#1865a4",
        });
      } else {
        // Show error SweetAlert
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit email. Please try again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1865a4",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "API error: " + (error.message || "An unknown error occurred."), // Improved error message
        confirmButtonText: "OK",
        confirmButtonColor: "#1865a4",
      });
    }
  };

  return (
    <>
      {/* Footer Top Section */}
      {/* Padding adjusted for all screen sizes, 2xl:px-20 and 2xl:py-20 preserved */}
      <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20 2xl:py-20 px-4 sm:px-6 md:px-10 lg:px-20 2xl:px-20 mx-auto overflow-hidden">
        <div className="w-full">
          {/* Logo & Email Form and Navigation Links Grid */}
          {/* Gap adjusted for responsiveness, lg:grid-cols-7 for 2xl preserved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 md:gap-6 2xl:gap-4">
            {/* Logo and Email Form Column */}
            {/* Column span adjusted for responsiveness */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start gap-4 w-full">
              <img
                src={Logo}
                alt="Prop Metaverse"
                // Width and margin adjusted for responsiveness, 2xl:w-[158px] and 2xl:mb-[50px] preserved
                className="w-[120px] sm:w-[140px] 2xl:w-[158px] mb-4 sm:mb-6 2xl:mb-[40px] mx-auto md:mx-0"
              />
              <form
                onSubmit={handleSubmit}
                // Width and padding adjusted for responsiveness, 2xl:w-[305px] and 2xl:px-4 preserved
                className="flex px-2 sm:px-3 2xl:px-4 mx-auto md:mx-0 items-center w-full max-w-[305px] bg-logoColor rounded-md overflow-hidden"
              >
                {/* Email SVG Icon - size slightly smaller on mobile */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[24px] sm:size-[28px] 2xl:size-[30px]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14.167 5.83333H15.0003V6.66667C15.0003 6.88768 15.0881 7.09964 15.2444 7.25592C15.4007 7.4122 15.6126 7.5 15.8337 7.5C16.0547 7.5 16.2666 7.4122 16.4229 7.25592C16.5792 7.09964 16.667 6.88768 16.667 6.66667V5.83333H17.5003C17.7213 5.83333 17.9333 5.74554 18.0896 5.58926C18.2459 5.43298 18.3337 5.22101 18.3337 5C18.3337 4.77899 18.2459 4.56702 18.0896 4.41074C17.9333 4.25446 17.7213 4.16667 17.5003 4.16667H16.667V3.33333C16.667 3.11232 16.5792 2.90036 16.4229 2.74408C16.2666 2.5878 16.0547 2.5 15.8337 2.5C15.6126 2.5 15.4007 2.5878 15.2444 2.74408C15.0881 2.90036 15.0003 3.11232 15.0003 3.33333V4.16667H14.167C13.946 4.16667 13.734 4.25446 13.5777 4.41074C13.4215 4.56702 13.3337 4.77899 13.3337 5C13.3337 5.22101 13.4215 5.43298 13.5777 5.58926C13.734 5.74554 13.946 5.83333 14.167 5.83333ZM17.5003 9.16667C17.2793 9.16667 17.0673 9.25446 16.9111 9.41074C16.7548 9.56702 16.667 9.77899 16.667 10V15C16.667 15.221 16.5792 15.433 16.4229 15.5893C16.2666 15.7455 16.0547 15.8333 15.8337 15.8333H4.16699C3.94598 15.8333 3.73402 15.7455 3.57774 15.5893C3.42146 15.433 3.33366 15.221 3.33366 15V7.00833L8.23366 11.9167C8.70241 12.3848 9.33782 12.6478 10.0003 12.6478C10.6628 12.6478 11.2982 12.3848 11.767 11.9167L13.8253 9.85833C13.9822 9.70141 14.0704 9.48858 14.0704 9.26667C14.0704 9.04475 13.9822 8.83192 13.8253 8.675C13.6684 8.51808 13.4556 8.42992 13.2337 8.42992C13.0117 8.42992 12.7989 8.51808 12.642 8.675L10.5837 10.7333C10.4279 10.886 10.2185 10.9715 10.0003 10.9715C9.7822 10.9715 9.57276 10.886 9.41699 10.7333L4.50866 5.83333H10.8337C11.0547 5.83333 11.2666 5.74554 11.4229 5.58926C11.5792 5.43298 11.667 5.22101 11.667 5C11.667 4.77899 11.5792 4.56702 11.4229 4.41074C11.2666 4.25446 11.0547 4.16667 10.8337 4.16667H4.16699C3.50395 4.16667 2.86807 4.43006 2.39923 4.8989C1.93038 5.36774 1.66699 6.00363 1.66699 6.66667V15C1.66699 15.663 1.93038 16.2989 2.39923 16.7678C2.86807 17.2366 3.50395 17.5 4.16699 17.5H15.8337C16.4967 17.5 17.1326 17.2366 17.6014 16.7678C18.0703 16.2989 18.3337 15.663 18.3337 15V10C18.3337 9.77899 18.2459 9.56702 18.0896 9.41074C17.9333 9.25446 17.7213 9.16667 17.5003 9.16667Z"
                    fill="white"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-white placeholder-white bg-logoColor outline-none text-sm sm:text-base"
                />
                <button className="">
                  {/* Send SVG Icon - size slightly smaller on mobile */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-[20px] sm:size-[22px] 2xl:size-[24px]"
                  >
                    <path
                      d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M9.45139 19.1418C9.74339 19.4348 9.74339 19.9098 9.45139 20.2028L8.08539 21.5678C7.93939 21.7148 7.74739 21.7878 7.55539 21.7878C7.36339 21.7878 7.17139 21.7148 7.02539 21.5678C6.73239 21.2748 6.73239 20.8008 7.02539 20.5078L8.39039 19.1418C8.68339 18.8498 9.15839 18.8498 9.45139 19.1418ZM8.66769 15.3538C8.95969 15.6468 8.95969 16.1218 8.66769 16.4148L7.30169 17.7798C7.15569 17.9268 6.96369 17.9998 6.77169 17.9998C6.57969 17.9998 6.38769 17.9268 6.24169 17.7798C5.94869 17.4868 5.94869 17.0128 6.24169 16.7198L7.60669 15.3538C7.89969 15.0618 8.37469 15.0618 8.66769 15.3538ZM4.90649 14.1614C5.19849 14.4544 5.19849 14.9294 4.90649 15.2224L3.54049 16.5874C3.39449 16.7344 3.20249 16.8074 3.01049 16.8074C2.81849 16.8074 2.62649 16.7344 2.48049 16.5874C2.18749 16.2944 2.18749 15.8204 2.48049 15.5274L3.84549 14.1614C4.13849 13.8694 4.61349 13.8694 4.90649 14.1614Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </form>
            </div>

            {/* Navigation Link Columns */}
            {/* Text alignment adjusted for responsiveness, md:text-start for 2xl preserved */}
            {/* Margin bottom for h3 adjusted, 2xl:mb-[16px] preserved */}
            {/* space-y and text-base adjusted for responsiveness */}
            <div className="col-span-1 text-center md:text-start">
              <h3 className="font-bold md:font-[500] text-lg 2xl:text-lg text-logoBlue mb-3 2xl:mb-[16px]">
                Home
              </h3>
              <ul className="space-y-2 sm:space-y-3 2xl:space-y-[16px] font-[500] text-sm sm:text-base 2xl:text-base">
                <li>
                  <Link to="#">Hero Section</Link>
                </li>
                <li>
                  <Link to="#">Features</Link>
                </li>
                <li>
                  <Link to="#">Properties</Link>
                </li>
                <li>
                  <Link to="#">Testimonials</Link>
                </li>
                <li>
                  <Link to="#">FAQ's</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1 text-center md:text-start">
              <h3 className="font-bold md:font-[500] text-lg 2xl:text-lg text-logoBlue mb-3 2xl:mb-[16px]">
                About Us
              </h3>
              <ul className="space-y-2 sm:space-y-3 2xl:space-y-[16px] font-[500] text-sm sm:text-base 2xl:text-base">
                <li>
                  <Link to="#">Our Story</Link>
                </li>
                <li>
                  <Link to="#">Our Works</Link>
                </li>
                <li>
                  <Link to="#">How it Works</Link>
                </li>
                <li>
                  <Link to="#">Our Team</Link>
                </li>
                <li>
                  <Link to="#">Our Clients</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1 text-center md:text-start">
              <h3 className="font-bold md:font-[500] text-lg 2xl:text-lg text-logoBlue mb-3 2xl:mb-[16px]">
                Properties
              </h3>
              <ul className="space-y-2 sm:space-y-3 2xl:space-y-[16px] font-[500] text-sm sm:text-base 2xl:text-base">
                <li>
                  <Link to="#">Portfolio</Link>
                </li>
                <li>
                  <Link to="#">Categories</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1 text-center md:text-start">
              <h3 className="font-bold md:font-[500] text-lg 2xl:text-lg text-logoBlue mb-3 2xl:mb-[16px]">
                Services
              </h3>
              <ul className="space-y-2 sm:space-y-3 2xl:space-y-[16px] font-[500] text-sm sm:text-base 2xl:text-base">
                <li>
                  <Link to="#">Valuation Mastery</Link>
                </li>
                <li>
                  <Link to="#">Strategic Marketing</Link>
                </li>
                <li>
                  <Link to="#">Negotiation Wizardry</Link>
                </li>
                <li>
                  <Link to="#">Closing Success</Link>
                </li>
                <li>
                  <Link to="#">Property Management</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1 text-center md:text-start">
              <h3 className="font-bold md:font-[500] text-lg 2xl:text-lg text-logoBlue mb-3 2xl:mb-[16px]">
                Contact Us
              </h3>
              <ul className="space-y-2 sm:space-y-3 2xl:space-y-[16px] font-[500] text-sm sm:text-base 2xl:text-base">
                <li>
                  <Link to="#">Contact Form</Link>
                </li>
                <li>
                  <Link to="#">Our Offices</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Section (Copyright & Socials) */}
      {/* Padding adjusted for responsiveness, 2xl:px-20 preserved */}
      <div className="bg-logoBlue py-4 w-full px-4 sm:px-6 md:px-10 lg:px-20 2xl:px-20 mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Copyright text size adjusted for responsiveness */}
            <span className="text-white text-xs sm:text-sm 2xl:text-sm text-center sm:text-left">
              ©2025 Propmetaverse. All Rights Reserved.
            </span>
            <Link
              to="#"
              className="text-white text-xs sm:text-sm 2xl:text-sm hover:text-blue-200 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          {/* Social Icons */}
          {/* Size and padding adjusted for responsiveness, 2xl:size-[40px] and 2xl:p-[10px] preserved */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="https://www.facebook.com/PropMetaverse/"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center p-[8px] size-[36px] sm:p-[10px] sm:size-[40px] 2xl:p-[10px] 2xl:size-[40px] rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="size-[18px] sm:size-[20px]" // SVG size adjusted
              >
                <path
                  d="M13.1203 3.32002H15.0003V0.14003C14.0901 0.0453769 13.1755 -0.00135428 12.2603 2.98641e-05C9.54034 2.98641e-05 7.68035 1.66003 7.68035 4.70002V7.32002H4.61035V10.88H7.68035V20H11.3603V10.88H14.4203L14.8803 7.32002H11.3603V5.05002C11.3603 4.00002 11.6403 3.32002 13.1203 3.32002Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link
              to="https://www.linkedin.com/company/prop-metaverse/?viewAsMember=true"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center p-[8px] size-[36px] sm:p-[10px] sm:size-[40px] 2xl:p-[10px] 2xl:size-[40px] rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="size-[18px] sm:size-[20px]" // SVG size adjusted
              >
                <path
                  d="M17.0585 1.66711H2.9418C2.78311 1.6649 2.62555 1.69398 2.4781 1.75268C2.33066 1.81138 2.19622 1.89854 2.08246 2.0092C1.96871 2.11986 1.87786 2.25185 1.81512 2.39762C1.75238 2.54339 1.71897 2.70009 1.7168 2.85878V17.1421C1.71897 17.3008 1.75238 17.4575 1.81512 17.6033C1.87786 17.749 1.96871 17.881 2.08246 17.9917C2.19622 18.1023 2.33066 18.1895 2.4781 18.2482C2.62555 18.3069 2.78311 18.336 2.9418 18.3338H17.0585C17.2171 18.336 17.3747 18.3069 17.5222 18.2482C17.6696 18.1895 17.804 18.1023 17.9178 17.9917C18.0316 17.881 18.1224 17.749 18.1851 17.6033C18.2479 17.4575 18.2813 17.3008 18.2835 17.1421V2.85878C18.2813 2.70009 18.2479 2.54339 18.1851 2.39762C18.1224 2.25185 18.0316 2.11986 17.9178 2.0092C17.804 1.89854 17.6696 1.81138 17.5222 1.75268C17.3747 1.69398 17.2171 1.6649 17.0585 1.66711ZM6.7418 15.6171H4.2418V8.11711H6.7418V15.6171ZM5.4918 7.06711C5.14702 7.06711 4.81636 6.93014 4.57256 6.68635C4.32876 6.44255 4.1918 6.11189 4.1918 5.76711C4.1918 5.42233 4.32876 5.09167 4.57256 4.84787C4.81636 4.60407 5.14702 4.46711 5.4918 4.46711C5.67488 4.44635 5.86028 4.46449 6.03586 4.52034C6.21144 4.5762 6.37325 4.66852 6.51068 4.79124C6.64811 4.91397 6.75807 5.06434 6.83336 5.23251C6.90864 5.40068 6.94756 5.58286 6.94756 5.76711C6.94756 5.95136 6.90864 6.13354 6.83336 6.30171C6.75807 6.46988 6.64811 6.62025 6.51068 6.74297C6.37325 6.8657 6.21144 6.95801 6.03586 7.01387C5.86028 7.06973 5.67488 7.08787 5.4918 7.06711ZM15.7585 15.6171H13.2585V11.5921C13.2585 10.5838 12.9001 9.92544 11.9918 9.92544C11.7107 9.9275 11.437 10.0157 11.2075 10.1781C10.978 10.3405 10.8039 10.5693 10.7085 10.8338C10.6433 11.0296 10.615 11.2359 10.6251 11.4421V15.6088H8.12513C8.12513 15.6088 8.12513 8.79211 8.12513 8.10878H10.6251V9.16711C10.8522 8.77303 11.1826 8.44838 11.5805 8.22811C11.9784 8.00785 12.4289 7.90032 12.8835 7.91711C14.5501 7.91711 15.7585 8.99211 15.7585 11.3004V15.6171Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link
              to="https://x.com/prop_metaverse"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center p-[8px] size-[36px] sm:p-[10px] sm:size-[40px] 2xl:p-[10px] 2xl:size-[40px] rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="size-[18px] sm:size-[20px]" // SVG size adjusted
              >
                <path
                  d="M18.3337 4.83351C17.7073 5.10525 17.0448 5.28489 16.367 5.36684C17.0821 4.93961 17.6181 4.26749 17.8753 3.47517C17.2033 3.87523 16.4676 4.15709 15.7003 4.30851C15.1874 3.75232 14.5045 3.38209 13.7585 3.25588C13.0125 3.12968 12.2458 3.25464 11.5785 3.61117C10.9112 3.96769 10.3811 4.53562 10.0714 5.22587C9.76162 5.91613 9.68974 6.68967 9.86699 7.42517C8.50818 7.35645 7.17903 7.00264 5.96587 6.38673C4.75272 5.77082 3.6827 4.90659 2.82533 3.85017C2.52461 4.37532 2.36659 4.97003 2.36699 5.57517C2.36593 6.13716 2.50384 6.69069 2.76845 7.18648C3.03307 7.68227 3.41617 8.10493 3.88366 8.41684C3.34031 8.40206 2.80856 8.25626 2.33366 7.99184V8.03351C2.33773 8.82092 2.61365 9.58275 3.11475 10.1901C3.61585 10.7975 4.31137 11.2132 5.08366 11.3668C4.78637 11.4573 4.47772 11.505 4.16699 11.5085C3.9519 11.506 3.73734 11.4865 3.52533 11.4502C3.74525 12.1275 4.17084 12.7195 4.74289 13.1436C5.31493 13.5678 6.00497 13.8031 6.71699 13.8168C5.51466 14.7629 4.03023 15.2792 2.50033 15.2835C2.22177 15.2844 1.94344 15.2677 1.66699 15.2335C3.22902 16.2421 5.04934 16.7774 6.90866 16.7752C8.19174 16.7885 9.4646 16.546 10.6529 16.0619C11.8412 15.5778 12.9212 14.8617 13.8297 13.9556C14.7381 13.0494 15.457 11.9713 15.9441 10.7843C16.4313 9.59719 16.677 8.32495 16.667 7.04184C16.667 6.90017 16.667 6.75017 16.667 6.60017C17.3209 6.11252 17.8849 5.5147 18.3337 4.83351Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link
              to="https://youtube.com/@propmetaverse?si=g6XtmSsu9DzjYwqm"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center p-[8px] size-[36px] sm:p-[10px] sm:size-[40px] 2xl:p-[10px] 2xl:size-[40px] rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="size-[18px] sm:size-[20px]" // SVG size adjusted
              >
                <path
                  d="M19.1669 8.0919C19.2081 6.89911 18.9472 5.71525 18.4085 4.65023C18.043 4.21323 17.5358 3.91832 16.9752 3.8169C14.6565 3.6065 12.3281 3.52027 10.0002 3.55856C7.68072 3.51853 5.36078 3.60198 3.05019 3.80856C2.59337 3.89166 2.17062 4.10593 1.83352 4.42523C1.08352 5.1169 1.00019 6.30023 0.916852 7.30023C0.795945 9.0982 0.795945 10.9023 0.916852 12.7002C0.94096 13.2631 1.02476 13.8218 1.16685 14.3669C1.26733 14.7878 1.47062 15.1772 1.75852 15.5002C2.09791 15.8364 2.53051 16.0629 3.00019 16.1502C4.79678 16.372 6.60703 16.4639 8.41685 16.4252C11.3335 16.4669 13.8919 16.4252 16.9169 16.1919C17.3981 16.1099 17.8428 15.8832 18.1919 15.5419C18.4252 15.3085 18.5994 15.0228 18.7002 14.7086C18.9982 13.7941 19.1446 12.837 19.1335 11.8752C19.1669 11.4086 19.1669 8.5919 19.1669 8.0919ZM8.11685 12.3752V7.2169L13.0502 9.80856C11.6669 10.5752 9.84185 11.4419 8.11685 12.3752Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link
              to="https://www.instagram.com/propmetaverse/"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center p-[8px] size-[36px] sm:p-[10px] sm:size-[40px] 2xl:p-[10px] 2xl:size-[40px] rounded-full transition-colors"
            >
              <BiLogoInstagramAlt className="size-[18px] sm:size-[20px]" />{" "}
              {/* Icon size adjusted */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;