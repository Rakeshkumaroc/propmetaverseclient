import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import FavoriteCard from "../components/favorite/FavoriteCard";
import { handleDetailChange, toggleEdit } from "../utils/utils";

const baseUrl = import.meta.env.VITE_APP_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  const refreshFavorites = async () => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (customerAuth && customerAuth.token) {
      try {
        const res = await axios.get(`${baseUrl}/customer-saved-properties`, {
          headers: { Authorization: `Bearer ${customerAuth.token}` },
        });
        setFavorites(res.data.savedProperties);
        const details = res.data.savedProperties.reduce((acc, prop) => {
          acc[prop._id] = { numbering: prop.numbering || "", notes: prop.notes || "" };
          return acc;
        }, {});
        setFavoriteDetails(details);
      } catch (err) {
        console.error("Error refreshing favorites:", err.response?.data || err.message);
        toast.error("Failed to refresh favorites.", { position: "top-left" });
      }
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  const handleRemoveFavorite = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to remove favorites.", {
        position: "top-left",
      });
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/remove-from-saved-properties`,
        { propertyId },
        {
          headers: { Authorization: `Bearer ${customerAuth.token}` },
        }
      );

      setFavorites((prev) => prev.filter((prop) => prop._id !== propertyId));
      setFavoriteDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[propertyId];
        return newDetails;
      });

      setEditingPropertyId(null);
      toast.success("Property removed from favorites", {
        position: "top-left",
      });
    } catch (error) {
      console.error(
        "Error removing favorite:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to remove favorite. Please try again.", {
        position: "top-left",
      });
    }
  };

  const handleCardSubmit = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to save preferences.", {
        position: "top-left",
      });
      return;
    }

    const details = favoriteDetails[propertyId];
    if (!details || (!details.numbering && !details.notes)) {
      toast.error("Please enter a rank or notes before submitting.", {
        position: "top-left",
      });
      return;
    }

    // Validate propertyId format and existence
    if (!/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      toast.error("Invalid property ID.", {
        position: "top-left",
      });
      return;
    }

    const property = favorites.find((p) => p._id === propertyId);
    if (!property) {
      toast.error("Property not found in favorites.", {
        position: "top-left",
      });
      return;
    }

    // Validate numbering for duplicates
    const numberings = Object.entries(favoriteDetails)
      .filter(([id]) => id !== propertyId)
      .map(([, detail]) => detail.numbering)
      .filter((num) => num !== "" && num !== undefined);
    if (details.numbering && numberings.includes(details.numbering)) {
      toast.error("This preference rank is already used.", {
        position: "top-left",
      });
      return;
    }

    try {
      const payload = {
        propertyId,
        numbering: details.numbering || "",
        notes: details.notes || "",
      };
      console.log("Sending payload to update-favorite-details:", payload);

      const response = await axios.post(
        `${baseUrl}/update-favorite-details`,
        payload,
        {
          headers: { Authorization: `Bearer ${customerAuth.token}` },
        }
      );

      // Refresh favorites to ensure state is in sync
      await refreshFavorites();

      toast.success(
        `Preferences for ${property.title} saved!`,
        {
          position: "top-left",
        }
      );
      setEditingPropertyId(null);
    } catch (error) {
      console.error("Error saving favorite details:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
        request: {
          url: `${baseUrl}/update-favorite-details`,
          payload: { propertyId, numbering: details.numbering, notes: details.notes },
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

      toast.error(
        error.response?.data?.message || "Failed to save preferences. Please try again.",
        {
          position: "top-left",
        }
      );
    }
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    const rankA = favoriteDetails[a._id]?.numbering
      ? parseInt(favoriteDetails[a._id].numbering)
      : Infinity;
    const rankB = favoriteDetails[b._id]?.numbering
      ? parseInt(favoriteDetails[b._id].numbering)
      : Infinity;
    return rankA - rankB;
  });

  return (
    <>
      <Navbar />
      <div className="md:py-28 mt-10 py-10 px-6 md:px-16 lg:px-40 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Your Favorites</h1>
        </div>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorite properties yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFavorites.map((property) => (
              <FavoriteCard
                key={property._id}
                property={property}
                favoriteDetails={favoriteDetails}
                editingPropertyId={editingPropertyId}
                handleRemoveFavorite={handleRemoveFavorite}
                handleDetailChange={(propertyId, field, value) =>
                  handleDetailChange(
                    propertyId,
                    field,
                    value,
                    setFavoriteDetails,
                    toast
                  )
                }
                handleCardSubmit={handleCardSubmit}
                toggleEdit={(propertyId) =>
                  toggleEdit(propertyId, setEditingPropertyId)
                }
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;