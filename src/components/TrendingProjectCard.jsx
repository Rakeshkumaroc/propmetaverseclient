import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { VscDiff } from "react-icons/vsc";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { IoShareSocialOutline } from "react-icons/io5";

const baseUrl = import.meta.env.VITE_APP_URL;

const TrendingProjectCard = ({
  id,
  propertyType,
  title,
  location,
  price,
  date,
  developer,
  image,
}) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const shareDropdownRef = useRef(null);

  const propertyUrl = `${window.location.origin}/projects/${title
    .replaceAll(" ", "-")
    .toLowerCase()}/${id}`;

  useEffect(() => {
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      const authStatus = !!(customerAuth && customerAuth.token);
      setIsAuthenticated(authStatus);

      const storedFavorites = JSON.parse(localStorage.getItem("savedProperties")) || [];
      setIsFavorited(storedFavorites.some((item) => item.id === id));

      const storedCompare = JSON.parse(localStorage.getItem("compareProperties")) || [];
      setIsCompared(storedCompare.some((item) => item.id === id));
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      toast.error("Failed to load saved data.", { position: "top-left" });
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please log in to add to favorites.", { position: "top-left" });
      return;
    }

    // Validate id
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      toast.error("Invalid property ID.", { position: "top-left" });
      return;
    }

    try {
      let storedFavorites = JSON.parse(localStorage.getItem("savedProperties")) || [];
      const alreadyExists = storedFavorites.some((item) => item.id === id);
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

      if (alreadyExists) {
        // Remove from favorites
        console.log("Sending remove-from-saved-properties request:", { propertyId: id });
        await axios.post(
          `${baseUrl}/remove-from-saved-properties`,
          { propertyId: id },
          {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          }
        );
        storedFavorites = storedFavorites.filter((item) => item.id !== id);
        localStorage.setItem("savedProperties", JSON.stringify(storedFavorites));
        setIsFavorited(false);
        toast.success(`Removed "${title}" from Favorites`, { position: "top-left" });
      } else {
        // Add to favorites
        console.log("Sending add-to-saved-properties request:", { propertyId: id });
        await axios.post(
          `${baseUrl}/add-to-saved-properties`,
          { propertyId: id },
          {
            headers: { Authorization: `Bearer ${customerAuth.token}` },
          }
        );
        storedFavorites.push({ id });
        localStorage.setItem("savedProperties", JSON.stringify(storedFavorites));
        setIsFavorited(true);
        toast.success(`Added "${title}" to Favorites`, { position: "top-left" });
      }
    } catch (error) {
      console.error("Error updating favorites:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
        request: {
          url: alreadyExists
            ? `${baseUrl}/remove-from-saved-properties`
            : `${baseUrl}/add-to-saved-properties`,
          payload: { propertyId: id },
        },
      });

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-left",
        });
        // Optionally redirect to login
        // navigate("/login");
        return;
      }

      if (error.response?.status === 404) {
        toast.error("Property not found in favorites.", {
          position: "top-left",
        });
        // Remove from localStorage to sync state
        let storedFavorites = JSON.parse(localStorage.getItem("savedProperties")) || [];
        storedFavorites = storedFavorites.filter((item) => item.id !== id);
        localStorage.setItem("savedProperties", JSON.stringify(storedFavorites));
        setIsFavorited(false);
        return;
      }

      toast.error(
        error.response?.data?.message || "Failed to update favorites. Please try again.",
        { position: "top-left" }
      );
    }
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    try {
      let storedCompare = JSON.parse(localStorage.getItem("compareProperties")) || [];
      const alreadyExists = storedCompare.some((item) => item.id === id);

      if (alreadyExists) {
        storedCompare = storedCompare.filter((item) => item.id !== id);
        toast.success(`Removed "${title}" from Compare`, { position: "top-left" });
      } else {
        if (storedCompare.length >= 4) {
          toast.error("You can only compare up to 4 properties.", {
            position: "top-left",
          });
          return;
        }
        storedCompare.push({ id });
        toast.success(`Added "${title}" to Compare`, { position: "top-left" });
      }

      localStorage.setItem("compareProperties", JSON.stringify(storedCompare));
      setIsCompared(!alreadyExists);
    } catch (error) {
      console.error("Error updating compare:", error);
      toast.error("Failed to update compare.", { position: "top-left" });
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareTitle = title || "Check out this property!";

    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: `Check out this property: ${title} at ${location}`,
          url: propertyUrl,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          toast.error("Failed to share. Please try again.", {
            position: "top-left",
          });
        });
    } else {
      setIsShareOpen(!isShareOpen);
    }
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(propertyUrl).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-left",
      });
      setIsShareOpen(false);
    }).catch((error) => {
      console.error("Error copying link:", error);
      toast.error("Failed to copy link.", { position: "top-left" });
    });
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: `https://api.whatsapp.com/send?text=Check%20out%20this%20property:%20${encodeURIComponent(
        title
      )}%20${encodeURIComponent(propertyUrl)}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        propertyUrl
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      name: "Copy Link",
      icon: <FaLink size={20} />,
      action: handleCopyLink,
    },
  ];

  return (
    <div
      onClick={() => {
        navigate(`/projects/${title.replaceAll(" ", "-").toLowerCase()}/${id}`);
      }}
      className="group cursor-pointer w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm mx-auto"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-black/80 to-black/60 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
          {propertyType}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold text-xl text-gray-800 group-hover:text-logoBlue transition-colors duration-200">
          {title.length > 30 ? title.slice(0, 30) + ".." : title}
        </h3>
        <p className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-logoBlue" />
          <span className="line-clamp-1">{location}</span>
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
          <div>
            <p className="text-gray-500 text-xs">Starting Price</p>
            <p className="font-semibold text-gray-800">{price}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Completion</p>
            <p className="font-semibold text-gray-800">{date}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">By: </span>
          <span className="italic">{developer}</span>
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 relative">
          <div className="flex gap-2" ref={shareDropdownRef}>
            <button
              onClick={handleFavoriteToggle}
              className="group focus:outline-none"
              title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
              aria-label={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            >
              {isFavorited ? (
                <MdFavorite className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
              ) : (
                <AiOutlineHeart className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
              )}
            </button>

            <button
              onClick={handleCompareToggle}
              className="group focus:outline-none"
              title={isCompared ? "Remove from Compare" : "Add to Compare"}
              aria-label={isCompared ? "Remove from Compare" : "Add to Compare"}
            >
              <VscDiff
                className={`h-6 w-6 bg-logoBlue/10 rounded p-1 transition-all duration-300 ${
                  isCompared
                    ? "text-red-500 group-hover:bg-red-500 group-hover:text-white"
                    : "text-logoBlue group-hover:bg-logoBlue group-hover:text-white"
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="group focus:outline-none"
              title="Share Property"
              aria-label="Share Property"
            >
              <IoShareSocialOutline className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
            </button>
          </div>

          {isShareOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  onClick={(e) => {
                    if (link.action) {
                      link.action(e);
                    } else {
                      e.stopPropagation();
                    }
                    setIsShareOpen(false);
                  }}
                  target={link.url ? "_blank" : undefined}
                  rel={link.url ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          )}

          <button className="flex items-center gap-2 bg-logoBlue text-white px-5 py-2 rounded hover:bg-logoBlue/90 font-medium transition-all duration-200 transform hover:scale-105">
            <span className="font-medium">Read More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingProjectCard;