 

import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

 
export default function DescriptionCard({ id, title, description, floorPlan }) {
  // State variables for UI interactions and data management
  const [isCompared, setIsCompared] = useState(false); // Tracks if property is in compare list
  const [isFavorited, setIsFavorited] = useState(false); // Tracks if property is favorited
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks user authentication status
  const [isShareOpen, setIsShareOpen] = useState(false); // Controls visibility of share dropdown

  // useEffect hook to initialize component state based on local storage and authentication
  useEffect(() => {
    // Check user authentication status from local storage
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    const authStatus = !!(customerAuth && customerAuth.token);
    setIsAuthenticated(authStatus);

    // Load compare properties from local storage
    const storedCompare =
      JSON.parse(localStorage.getItem("compareProperties")) || [];
    setIsCompared(storedCompare.some((item) => item.id === id));

    // Load favorited properties from local storage if authenticated
    if (authStatus) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("savedProperties")) || [];
      setIsFavorited(storedFavorites.some((item) => item.id === id));
    }
  }, [id]); // Re-run effect if property ID changes

  /**
   * Handles adding/removing property from the compare list.
   * Allows up to 4 properties to be compared.
   */
  const handleCompare = () => {
    let stored = JSON.parse(localStorage.getItem("compareProperties")) || [];
    const alreadyExists = stored.some((item) => item.id === id);

    if (alreadyExists) {
      // Remove property if already in compare list
      stored = stored.filter((item) => item.id !== id);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Removed "${title}" from Compare`,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    } else {
      // Add property if less than 4 properties are in compare list
      if (stored.length >= 4) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You can only compare up to 4 properties.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1b639f",
        });
        return;
      }
      stored.push({ id });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Added "${title}" to Compare`,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    }

    // Update local storage and component state
    localStorage.setItem("compareProperties", JSON.stringify(stored));
    setIsCompared(!alreadyExists);
  };

  const handleFavorite = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please log in to add to favorites.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    // Validate property ID format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid property ID.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    let stored = JSON.parse(localStorage.getItem("savedProperties")) || [];
    const alreadyExists = stored.some((item) => item.id === id);

    try {
      if (alreadyExists) {
        // API call to remove from saved properties
        await axios.post(
          `${baseUrl}/remove-from-saved-properties`,
          { propertyId: id },
          {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          }
        );
        stored = stored.filter((item) => item.id !== id);
        localStorage.setItem("savedProperties", JSON.stringify(stored));
        setIsFavorited(false);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Removed "${title}" from Favorites`,
          confirmButtonText: "OK",
          confirmButtonColor: "#1b639f",
        });
      } else {
        // API call to add to saved properties
        await axios.post(
          `${baseUrl}/add-to-saved-properties`,
          { propertyId: id },
          {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          }
        );
        stored.push({ id });
        localStorage.setItem("savedProperties", JSON.stringify(stored));
        setIsFavorited(true);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Added "${title}" to Favorites`,
          confirmButtonText: "OK",
          confirmButtonColor: "#1b639f",
        });
      }
    } catch (error) {
      console.error("Error updating saved properties:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      // Handle specific API error responses
      if (error.response?.status === 401) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Session expired. Please log in again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1b639f",
        });
        return;
      }

      if (error.response?.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Property not found in favorites.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1b639f",
        });
        // Clean up local storage if property not found on server
        stored = stored.filter((item) => item.id !== id);
        localStorage.setItem("savedProperties", JSON.stringify(stored));
        setIsFavorited(false);
        return;
      }

      // Generic error message for other API errors
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to update favorites. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    }
  };

  /**
   * Handles sharing property details.
   * Uses Web Share API if available, otherwise shows a custom share dropdown.
   */
  const handleShare = () => {
    const currentUrl = window.location.href;
    const shareTitle = title || "Check out this property!";

    if (navigator.share) {
      // Use Web Share API for native sharing
      navigator
        .share({
          title: shareTitle,
          text: `Check out this property: ${title}`,
          url: currentUrl,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to share. Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1b639f",
          });
        });
    } else {
      // Fallback to custom share dropdown
      setIsShareOpen(!isShareOpen);
    }
  };

  /**
   * Copies the current property URL to the clipboard.
   */
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Link copied to clipboard!",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      setIsShareOpen(false); // Close share dropdown after copying
    });
  };

  // Array of social media share links and copy link option
  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: `https://api.whatsapp.com/send?text=Check%20out%20this%20property:%20${encodeURIComponent(
        title
      )}%20${encodeURIComponent(window.location.href)}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      name: "Copy Link",
      icon: <FaLink size={20} />,
      action: handleCopyLink, // Custom action for copy link
    },
  ];

  /**
   * Extracts the number of bedrooms from a property type string (e.g., "2BHK" -> 2).
   * @param {string} type - The property type string.
   * @returns {string} The number of bedrooms or "N/A" if not found.
   */
  const getBedrooms = (type) => {
    if (!type || typeof type !== "string") return "N/A";
    const match = type.match(/(\d+)BHK/);
    return match ? match[1] : "N/A";
  };

  return (
    // Main container for the description card, responsive flex item
    <div className="flex-1 w-full px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 2xl:p-[40px] border border-gray-300 2xl:border-black shadow-md">
        {/* Title Section */}
        <h2 className="text-xl sm:text-2xl font-semibold text-logoBlue mb-2">
          {title || "Description"}
        </h2>

        {/* Description Content */}
        <p className="text-gray-700 text-sm sm:text-base 2xl:text-[20px] leading-relaxed">
          {description || "No description available."}
        </p>

        {/* Floor Plan Statistics Section */}
        {floorPlan.map((plan, index) => (
          <div
            key={plan._id || index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 mt-6 sm:mt-8 2xl:mt-[40px] pt-4 sm:pt-6 2xl:pt-[16px] border-t border-t-gray-300 2xl:border-t-black"
          >
            {/* Bedrooms Stat */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 mb-1">
                {/* SVG for Bedroom Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1277_4846)">
                    <path
                      d="M10.0119 15.9599C7.01369 15.9599 4.01627 15.9599 1.01806 15.9599C0.714934 15.9599 0.574786 16.0987 0.574786 16.3979C0.574786 16.4754 0.578723 16.553 0.573999 16.6297C0.5677 16.7227 0.558252 16.8157 0.54093 16.9064C0.476368 17.2374 0.159068 17.5026 -0.220432 17.4987C-0.601507 17.4948 -0.917233 17.2119 -0.974709 16.8483C-0.988094 16.763 -0.99518 16.6754 -0.99518 16.5894C-0.995967 14.8281 -1.00778 13.0661 -0.991243 11.3049C-0.981795 10.2785 -0.602295 9.38551 0.125212 8.6421C0.566913 8.19094 1.09207 7.87001 1.69282 7.66536C2.16522 7.50489 2.65338 7.45605 3.15098 7.45605C7.76246 7.45761 12.3739 7.45373 16.9854 7.45915C18.3365 7.46071 19.4309 7.99714 20.2419 9.06381C20.6403 9.58861 20.8781 10.1847 20.9592 10.8359C20.9867 11.0553 20.9985 11.2785 20.9993 11.5002C21.0025 13.2103 21.0017 14.9204 21.0009 16.6305C21.0009 16.8979 20.934 17.1413 20.7104 17.3181C20.4741 17.5049 20.2104 17.5537 19.9293 17.4398C19.66 17.3297 19.49 17.1274 19.4514 16.8382C19.4317 16.6925 19.4341 16.5429 19.4301 16.3956C19.4238 16.1576 19.3238 16.0142 19.1239 15.97C19.0798 15.9599 19.0333 15.9607 18.9876 15.9607C15.9965 15.9607 13.0054 15.9607 10.0135 15.9607L10.0119 15.9599Z"
                      fill="#1865A4"
                    />
                    <path
                      d="M9.90295 0.5C11.8477 0.5 13.7916 0.5 15.7356 0.5C16.3867 0.5 16.9954 0.643411 17.5205 1.03953C18.1961 1.54884 18.5905 2.21938 18.6236 3.06124C18.6519 3.77519 18.6393 4.4907 18.6425 5.20543C18.6448 5.66589 18.6425 6.12636 18.6425 6.58682C18.6425 6.62791 18.6401 6.67132 18.6291 6.71085C18.5952 6.83566 18.5267 6.88527 18.3976 6.86124C18.2567 6.83488 18.1205 6.77829 17.9795 6.76279C17.6481 6.72713 17.3158 6.70233 16.9828 6.68527C16.7607 6.67364 16.6922 6.63411 16.6607 6.41938C16.56 5.73876 15.9198 5.12636 15.101 5.13566C14.1877 5.14574 13.2744 5.13798 12.3618 5.13798C11.6824 5.13798 11.1021 5.53643 10.8714 6.16434C10.8383 6.25426 10.8257 6.35194 10.8084 6.44651C10.7761 6.61628 10.7123 6.67984 10.5407 6.68217C10.1809 6.68605 9.82028 6.68605 9.46046 6.68217C9.29512 6.68062 9.22977 6.61628 9.19985 6.42791C9.15812 6.16357 9.05419 5.92791 8.88413 5.72093C8.57627 5.34574 8.17788 5.14186 7.68657 5.13953C6.74412 5.13488 5.80167 5.13721 4.85843 5.13876C4.06636 5.13953 3.44672 5.74884 3.34594 6.41783C3.31366 6.63411 3.24831 6.67209 3.02628 6.68605C2.65859 6.71008 2.2909 6.74419 1.924 6.78295C1.8114 6.79457 1.70354 6.84264 1.59174 6.86124C1.47127 6.88062 1.41537 6.84031 1.38151 6.72403C1.36813 6.67829 1.36183 6.62946 1.36183 6.5814C1.36104 5.47674 1.34608 4.37209 1.36498 3.26744C1.38466 2.11163 1.92714 1.26202 2.98849 0.748062C3.40893 0.545736 3.8648 0.5 4.32618 0.5C6.18511 0.5 8.04403 0.5 9.90295 0.5Z"
                      fill="#1865A4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1277_4846">
                      <rect
                        width="22"
                        height="17"
                        fill="white"
                        transform="translate(-1 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-xs sm:text-sm text-logoBlue font-medium">
                  Bedrooms
                </p>
              </div>
              <p className="text-base sm:text-lg 2xl:text-[20px] font-semibold">
                {getBedrooms(plan.type)}
              </p>
            </div>

            {/* Balconies Stat */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 mb-1">
                {/* SVG for Balcony Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1277_4855)">
                    <path
                      d="M0.270432 14.2617H10.111V16.0698H16.2625V14.2657H18.7064C18.8646 16.416 18.8771 18.3305 16.6716 19.7899C16.6447 19.8076 16.623 19.8319 16.5633 19.8851C16.8345 20.1104 17.1018 20.333 17.3665 20.5531C17.0092 20.8946 16.7222 21.1691 16.3932 21.4844C16.1029 21.1849 15.7889 20.8374 15.4467 20.5209C15.3462 20.4276 15.1683 20.3895 15.0224 20.3803C14.784 20.3659 14.5423 20.4046 14.302 20.4053C11.1067 20.4072 7.91145 20.4066 4.71554 20.4066C4.56251 20.4066 4.39897 20.4361 4.25777 20.3935C3.83151 20.2654 3.56092 20.4631 3.3074 20.7685C3.09132 21.0286 2.84502 21.263 2.61975 21.5008C2.31566 21.1809 2.04046 20.8919 1.73572 20.5708C1.93998 20.3902 2.19941 20.1603 2.49102 19.9015C2.29004 19.7577 2.13964 19.6579 1.99712 19.5475C0.929186 18.7246 0.351873 17.633 0.276343 16.2925C0.238906 15.6285 0.269775 14.9605 0.269775 14.2617H0.270432Z"
                      fill="#1865A4"
                    />
                    <path
                      d="M0.275543 9.28721C0.270288 9.16834 0.261093 9.06128 0.261093 8.95423C0.260437 7.21375 0.258466 5.47393 0.261093 3.73345C0.26372 1.8209 1.59108 0.486313 3.50101 0.500106C4.14203 0.504703 4.80275 0.491568 5.41882 0.636717C6.5117 0.894833 7.20001 1.65276 7.53235 2.72069C7.59671 2.92824 7.68012 3.02872 7.90803 3.09046C9.19401 3.43921 10.0964 4.64113 10.1128 5.98228C10.1155 6.19836 10.1128 6.41444 10.1128 6.64891H4.02578C3.73548 5.11401 4.56959 3.52985 6.31335 3.03529C6.15573 2.35027 5.48121 1.7723 4.7732 1.74734C4.23792 1.72829 3.70067 1.72632 3.16539 1.74734C2.24261 1.78346 1.50044 2.63071 1.4965 3.64676C1.48994 5.39774 1.49453 7.14938 1.49453 8.90037C1.49453 9.0199 1.49453 9.13944 1.49453 9.28656H0.274229L0.275543 9.28721Z"
                      fill="#1865A4"
                    />
                    <path
                      d="M10.0936 13.0328C9.96484 13.0328 9.8683 13.0328 9.77175 13.0328C6.64415 13.0328 3.51589 13.0335 0.388282 13.0321C-0.284921 13.0321 -0.768971 12.7136 -0.939078 12.1698C-1.19522 11.3514 -0.615283 10.5633 0.268748 10.5515C1.20926 10.539 2.14978 10.5482 3.09029 10.5482C5.29971 10.5482 7.50847 10.5482 9.71789 10.5482C9.83611 10.5482 9.95434 10.5482 10.0936 10.5482V13.0321V13.0328Z"
                      fill="#1865A4"
                    />
                    <path
                      d="M15.0227 14.8712H11.3625C11.3565 14.7556 11.3467 14.6506 11.3467 14.5455C11.3454 13.2772 11.3454 12.0083 11.3467 10.7401C11.3473 9.82254 11.8485 9.31813 12.7621 9.31419C13.101 9.31288 13.4399 9.30565 13.7788 9.31616C14.54 9.34046 15.0372 9.85209 15.0391 10.6153C15.0431 11.9387 15.0404 13.2615 15.0391 14.5849C15.0391 14.6709 15.0299 14.7563 15.0227 14.8712Z"
                      fill="#1865A4"
                    />
                    <path
                      d="M16.2832 13.0208V10.548C16.8782 10.548 17.4648 10.546 18.0506 10.5486C18.356 10.5499 18.668 10.525 18.9668 10.5742C19.619 10.682 20.0433 11.2159 20.0164 11.8392C19.9901 12.4507 19.5389 12.9754 18.8985 13.0089C18.0394 13.0543 17.1764 13.0201 16.2839 13.0201L16.2832 13.0208Z"
                      fill="#1865A4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1277_4855">
                      <rect
                        width="21.0171"
                        height="21"
                        fill="white"
                        transform="translate(-1 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-xs sm:text-sm text-logoBlue font-medium">
                  Balconies
                </p>
              </div>
              <p className="text-base sm:text-lg 2xl:text-[20px] font-semibold">
                {plan.balcony ?? "N/A"}
              </p>
            </div>

            {/* Area Stat */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 mb-1">
                {/* SVG for Area Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1277_4867)">
                    <path
                      d="M0.837286 3.7663C0.612648 4.03046 0.387352 4.29397 0.167984 4.55155C-0.262846 4.11676 -0.63834 3.73863 -1 3.37434C-0.083004 2.45602 0.852437 1.51992 1.77602 0.595682C2.70026 1.5219 3.63505 2.458 4.55072 3.37566C4.19302 3.73336 3.81489 4.11083 3.40382 4.5219C3.16601 4.25642 2.91041 3.97118 2.59025 3.61479V7.40464C4.31555 5.67671 6.08234 3.90859 7.8386 2.1497C7.37549 2.1497 6.85112 2.11742 6.33333 2.15958C5.88472 2.19581 5.57115 2.04825 5.27866 1.71755C4.92358 1.31637 4.51976 0.958001 4.08235 0.527829C4.24769 0.515313 4.33794 0.502797 4.42885 0.502797C8.82148 0.502138 13.2141 0.500162 17.6067 0.502797C19.0086 0.503455 20.0079 1.4804 20.0099 2.87368C20.0171 7.28936 20.0125 11.7044 20.0125 16.1201C20.0125 16.1813 20.0059 16.2432 19.9209 16.3631C19.5231 15.9468 19.143 15.5114 18.72 15.122C18.4453 14.8691 18.3347 14.6056 18.357 14.234C18.3887 13.7143 18.365 13.1912 18.365 12.6747C16.6008 14.4409 14.8544 16.1886 13.112 17.933H16.9091C16.554 17.6431 16.2615 17.4046 15.9743 17.1701C16.4453 16.7169 16.8287 16.348 17.2016 15.9883C18.0837 16.8803 19.0152 17.8216 19.9401 18.7564C19.0441 19.6458 18.1047 20.5786 17.1752 21.5008C16.8261 21.1451 16.4545 20.767 16.0586 20.3638C16.2813 20.1675 16.5349 19.9435 16.7885 19.7195C16.7727 19.6807 16.7569 19.6418 16.7404 19.6036H16.3775C12.0507 19.6036 7.72398 19.6049 3.39723 19.6029C2.21278 19.6029 1.35903 19.0285 1.03294 17.9837C0.943346 17.6965 0.917655 17.3803 0.916996 17.0766C0.90975 12.7709 0.912385 8.46525 0.912385 4.15958C0.912385 4.04364 0.912385 3.92704 0.912385 3.8111C0.886693 3.79595 0.861001 3.78145 0.83531 3.7663H0.837286ZM2.56258 16.6833C7.40975 11.8355 12.249 6.99489 17.0935 2.1497C16.4032 2.1497 15.6937 2.14377 14.9842 2.15695C14.8933 2.15892 14.7879 2.24193 14.7154 2.31439C10.7167 6.30912 6.72003 10.3065 2.72596 14.3065C2.65415 14.379 2.57115 14.4844 2.56917 14.5753C2.55599 15.2841 2.56192 15.9929 2.56192 16.6826L2.56258 16.6833ZM18.365 3.458C13.5296 8.29199 8.69499 13.126 3.86693 17.9527C4.52569 17.9527 5.22464 17.9587 5.92358 17.9455C6.01449 17.9435 6.11858 17.8572 6.19104 17.7841C10.1963 13.7828 14.1996 9.77882 18.1996 5.77289C18.2721 5.70043 18.3557 5.59502 18.357 5.50411C18.3702 4.80583 18.3643 4.10688 18.3643 3.458H18.365ZM18.365 8.08778C15.0758 11.3743 11.7833 14.6642 8.49144 17.9527C9.15876 17.9527 9.85705 17.9587 10.556 17.9455C10.6462 17.9435 10.749 17.8533 10.8221 17.7801C13.2846 15.3223 15.7444 12.8618 18.2016 10.3987C18.2734 10.3262 18.3557 10.2202 18.3577 10.1286C18.3709 9.42967 18.365 8.73073 18.365 8.08712V8.08778ZM2.56258 12.0232C5.861 8.72612 9.14624 5.44153 12.4387 2.1497C11.7793 2.1497 11.1028 2.14377 10.4262 2.15629C10.334 2.15826 10.2266 2.23534 10.1548 2.30649C7.67589 4.78014 5.20026 7.25642 2.72727 9.73534C2.65547 9.8078 2.5718 9.91255 2.56983 10.0041C2.55665 10.682 2.56258 11.3598 2.56258 12.0232Z"
                      fill="#1865A4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1277_4867">
                      <rect
                        width="21.0145"
                        height="21"
                        fill="white"
                        transform="translate(-1 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-xs sm:text-sm text-logoBlue font-medium">
                  Area
                </p>
              </div>
              <p className="text-base sm:text-lg 2xl:text-[20px] font-semibold">
                {plan.carpetArea ? `${plan.carpetArea} Square Feet` : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Section (Favorite, Compare, Share, Download Brochure) */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 md:mt-16 2xl:mt-[71px] gap-4 sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-12 2xl:gap-[56px] relative">
          {/* Favorite Icon (only visible if authenticated) */}
          {isAuthenticated && (
            <svg
              onClick={handleFavorite}
              className={`cursor-pointer w-8 h-8 sm:w-10 sm:h-10 2xl:w-[50px] 2xl:h-[50px] transition-colors duration-200 ${
                isFavorited ? "fill-yellow-500" : "fill-gray-600 hover:fill-black"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.1765 26.3435C41.6496 24.8427 42.4679 22.8271 42.4515 20.7274C42.4351 18.6278 41.5853 16.6207 40.089 15.1476C39.3481 14.4182 38.4708 13.8639 37.5073 13.4516C36.5437 13.0612 35.5126 12.8645 34.473 12.8726C32.3734 12.8891 30.3662 13.7389 28.8932 15.2351C28.4932 15.6351 27.9848 16.1261 27.3682 16.7081L25.6536 18.3226L23.939 16.7081C23.321 16.1247 22.8118 15.6337 22.4119 15.2351C20.9273 13.7505 18.9136 12.9164 16.814 12.9164C14.7144 12.9164 12.7008 13.7505 11.2161 15.2351C8.15778 18.2955 8.12205 23.2435 11.1036 26.3185L25.6536 40.8685L40.1765 26.3435ZM9.44735 13.4685C10.4147 12.5009 11.5631 11.7334 12.8271 11.2097C14.0911 10.6861 15.4458 10.4165 16.814 10.4165C18.1822 10.4165 19.537 10.6861 20.8009 11.2097C22.0649 11.7334 23.2134 12.5009 24.1807 13.4685C24.5599 13.849 25.05 14.3226 25.6536 14.8893C26.2536 14.3226 26.7446 13.8483 27.1247 13.1807C29.0651 11.4985 31.7062 10.3803 34.4688 10.3592C37.2315 10.3381 39.8894 11.4153 41.8578 13.3539C43.8262 15.2924 44.9439 17.9336 44.965 20.6962C44.9861 23.4589 43.9088 26.1167 41.9703 28.0851L27.1247 42.931C26.7358 43.3215 26.206 43.5409 25.6536 43.5409C25.1012 43.5409 24.5714 43.3215 24.1808 42.931 L9.33278 28.083 C7.42868 26.1794 6.37341 23.4854 6.39485 20.7502C6.41629 18.015 7.51272 15.398 9.44735 13.4643V13.4685Z"
                fill="currentColor" // Use currentColor for dynamic fill based on text color
              />
            </svg>
          )}

          {/* Compare Icon */}
          <svg
            onClick={handleCompare}
            className={`cursor-pointer w-8 h-8 sm:w-10 sm:h-10 2xl:w-[52px] 2xl:h-[52px] transition-colors duration-200 ${
              isCompared ? "fill-red-500" : "fill-[#65B137] hover:fill-green-700"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <path d="M19.5007 30.3335H4.33398V34.6668H19.5007V41.1668L28.1673 32.5002L19.5007 23.8335V30.3335ZM32.5006 28.1668V21.6668H47.6673V17.3335H32.5006V10.8335L23.834 19.5002L32.5006 28.1668Z" />
          </svg>

          {/* Share Icon and Dropdown */}
          <svg
            onClick={handleShare}
            className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 2xl:w-[50px] 2xl:h-[50px] fill-gray-600 hover:fill-black transition-colors duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path d="M34.6042 43.75C33.2236 43.75 32.0521 43.2674 31.0896 42.3021C30.1285 41.3354 29.6479 40.1618 29.6479 38.7812C29.6479 38.5729 29.7396 38.0472 29.9229 37.2042L14.9292 28.3021C14.4792 28.8215 13.9285 29.2292 13.2771 29.525C12.6257 29.8208 11.9264 29.9688 11.1792 29.9688C9.80972 29.9688 8.64583 29.4812 7.6875 28.5062C6.72917 27.5312 6.25 26.3625 6.25 25C6.25 23.6375 6.72917 22.4688 7.6875 21.4938C8.64583 20.5188 9.80972 20.0312 11.1792 20.0312C11.925 20.0312 12.6243 20.1792 13.2771 20.475C13.9299 20.7708 14.4806 21.1792 14.9292 21.7L29.925 12.8354C29.8278 12.566 29.7576 12.2986 29.7146 12.0333C29.6701 11.7667 29.6479 11.4944 29.6479 11.2167C29.6479 9.8375 30.1319 8.66458 31.1 7.69792C32.0681 6.73264 33.2431 6.25 34.625 6.25C36.0069 6.25 37.1792 6.73403 38.1417 7.70208C39.1042 8.67014 39.5847 9.84514 39.5833 11.2271C39.5819 12.609 39.0993 13.7812 38.1354 14.7437C37.1715 15.7063 35.9979 16.1868 34.6146 16.1854C33.8618 16.1854 33.1674 16.0312 32.5312 15.7229C31.8951 15.4146 31.3535 15 30.9062 14.4792L15.9083 23.3812C16.0056 23.6507 16.0757 23.9187 16.1187 24.1854C16.1632 24.4507 16.1854 24.7222 16.1854 25C16.1854 25.2778 16.1632 25.5493 16.1187 25.8146C16.0743 26.0799 16.0049 26.3479 15.9104 26.6187L30.9062 35.5208C31.3549 35 31.8965 34.5854 32.5312 34.2771C33.1674 33.9687 33.8618 33.8146 34.6146 33.8146C35.9951 33.8146 37.1687 34.2979 38.1354 35.2646C39.1007 36.234 39.5833 37.4097 39.5833 38.7917C39.5833 40.1736 39.0993 41.3458 38.1312 42.3083C37.1632 43.2708 35.9861 43.7514 34.6042 43.75Z" />
          </svg>
          {isShareOpen && (
            // Share dropdown menu
            <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-200">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  onClick={link.action ? link.action : undefined}
                  target={link.url ? "_blank" : undefined}
                  rel={link.url ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Download Brochure Button */}
        <button
          style={{ fontWeight: "unset" }} // Override Tailwind's default font-weight if needed
          className="bg-white border border-gray-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-sm sm:text-base transition-colors duration-200 mt-4 sm:mt-0"
        >
          <span>
            {/* SVG for Download Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                fill="black"
              />
            </svg>
          </span>
          Download Brochure
        </button>
      </div>
    </div>
  );
}
