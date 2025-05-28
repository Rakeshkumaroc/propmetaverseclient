import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const formatPrice = (value) => {
  const num = Number(value);
  if (isNaN(num)) return value;
  if (num >= 1e7) return `${(num / 1e7).toFixed(2)} Cr`;
  if (num >= 1e5) return `${(num / 1e5).toFixed(2)} Lakh`;
  return num.toLocaleString("en-IN");
};

const PropertyHeader = ({
  status,
  price,
  title,
  address,
  constructionYear,
  id,
}) => {
  const [isCompared, setIsCompared] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    const authStatus = !!(customerAuth && customerAuth.token);
    setIsAuthenticated(authStatus);

    const storedCompare =
      JSON.parse(localStorage.getItem("compareProperties")) || [];
    setIsCompared(storedCompare.some((item) => item.id === id));

    if (authStatus) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("savedProperties")) || [];
      setIsFavorited(storedFavorites.some((item) => item.id === id));
    }
  }, [id]);

  const handleCompare = () => {
    let stored = JSON.parse(localStorage.getItem("compareProperties")) || [];
    const alreadyExists = stored.some((item) => item.id === id);

    if (alreadyExists) {
      stored = stored.filter((item) => item.id !== id);
      toast.success(`Removed "${title}" from Compare`, {
        position: "top-left",
      });
    } else {
      if (stored.length >= 4) {
        toast.error("You can only compare up to 4 properties.", {
          position: "top-left",
        });
        return;
      }
      stored.push({ id });
      toast.success(`Added "${title}" to Compare`, {
        position: "top-left",
      });
    }

    localStorage.setItem("compareProperties", JSON.stringify(stored));
    setIsCompared(!alreadyExists);
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to favorites.", { position: "top-left" });
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      toast.error("Invalid property ID.", { position: "top-left" });
      return;
    }

    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    let stored = JSON.parse(localStorage.getItem("savedProperties")) || [];
    const alreadyExists = stored.some((item) => item.id === id);

    try {
      if (alreadyExists) {
        console.log("Sending remove-from-saved-properties request:", { propertyId: id });
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
        toast.success(`Removed "${title}" from Favorites`, {
          position: "top-left",
        });
      } else {
        console.log("Sending add-to-saved-properties request:", { propertyId: id });
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
        toast.success(`Added "${title}" to Favorites`, {
          position: "top-left",
        });
      }
    } catch (error) {
      console.error("Error updating saved properties:", {
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
        // window.location.href = "/login";
        return;
      }

      if (error.response?.status === 404) {
        toast.error("Property not found in favorites.", {
          position: "top-left",
        });
        // Remove from localStorage to sync state
        stored = stored.filter((item) => item.id !== id);
        localStorage.setItem("savedProperties", JSON.stringify(stored));
        setIsFavorited(false);
        return;
      }

      toast.error(
        error.response?.data?.message || "Failed to update favorites. Please try again.",
        { position: "top-left" }
      );
    }
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    const shareTitle = title || "Check out this property!";

    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: `Check out this property: ${title} at ${address}`,
          url: currentUrl,
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

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-left",
      });
      setIsShareOpen(false);
    });
  };

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
      action: handleCopyLink,
    },
  ];

  return (
    <div className="w-full bg-white/50 backdrop-blur-lg px-4 md:px-8 py-6 rounded">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-logoBlue text-white text-xs font-medium px-3 py-1 rounded inline-block mb-2">
            {status}
          </span>
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>

        <div className="mt-2 md:mt-0 flex items-end gap-3">
          <p className="text-black font-semibold">Pricing:</p>
          <span className="text-2xl md:text-4xl font-semibold text-gray-900">
           {formatPrice(price)}
          </span>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm md:text-base text-gray-800">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-logoBlue" />
            <span className="font-semibold">Completion Date:</span>
            <span className="ml-1">{constructionYear}</span>
          </div>

          <div className="flex items-center gap-2 sm:ml-6">
            <MapPin size={18} className="text-logoBlue" />
            <span>{address}</span>
          </div>
        </div>

        <div className="flex gap-3 relative">
          <button
            onClick={handleCompare}
            className={`text-sm px-4 py-1.5 rounded font-medium ${
              isCompared ? "bg-red-500/50 text-white" : "bg-logoColor text-white"
            } hover:opacity-90 transition`}
          >
            {isCompared ? "Remove from Compare" : "Add to Compare"}
          </button>

          {isAuthenticated && (
            <button
              onClick={handleFavorite}
              className={`text-sm px-4 py-1.5 rounded font-medium flex items-center gap-1 ${
                isFavorited
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-600 text-white"
              } hover:opacity-90 transition`}
            >
              <MdOutlineStar size={16} />
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

          <button
            onClick={handleShare}
            className="text-sm px-4 py-1.5 rounded font-medium bg-gray-600 text-white hover:opacity-90 transition"
          >
            Share
          </button>

          {/* Share Dropdown */}
          {isShareOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  onClick={link.action ? link.action : undefined}
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
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;