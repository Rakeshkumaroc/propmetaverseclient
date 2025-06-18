import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerNavbar from "../global/CustomerNavbar";
import CustomerSidebar from "../global/CustomerSidebar"; 
import { handleDetailChange, toggleEdit } from "../../../utils/utils";
import SavedPropertiesSection from "../../customerDashboard/SavedPropertiesSection";
const baseUrl = import.meta.env.VITE_APP_URL;

const SavedPropertiesPage = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([]);
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to view saved properties", { position: "top-left" });
      navigate("/customer-sign-in");
      return;
    }

    const fetchSavedProperties = async () => {
      try {
        const token = customerAuth.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch saved properties
        const savedRes = await axios.get(`${baseUrl}/customer-saved-properties`, config);
        setSavedProperties(savedRes.data.savedProperties || []);
        const favoriteIds = savedRes.data.savedProperties.map((prop) => ({
          id: prop._id,
        }));
        localStorage.setItem("savedProperties", JSON.stringify(favoriteIds));

        const storedDetails = JSON.parse(localStorage.getItem("favoriteDetails")) || {};
        setFavoriteDetails(storedDetails);

        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("customerAuth");
          localStorage.removeItem("savedProperties");
          toast.error("Session expired. Please log in again.", { position: "top-left" });
          navigate("/customer-sign-in");
        }
        toast.error("Failed to fetch saved properties", { position: "top-left" });
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, [navigate]);

  const handleRemoveFavorite = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to remove favorites.", { position: "top-left" });
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

      setSavedProperties((prev) => prev.filter((prop) => prop._id !== propertyId));

      const stored = JSON.parse(localStorage.getItem("savedProperties")) || [];
      const updatedStored = stored.filter((item) => item.id !== propertyId);
      localStorage.setItem("savedProperties", JSON.stringify(updatedStored));

      setFavoriteDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[propertyId];
        localStorage.setItem("favoriteDetails", JSON.stringify(newDetails));
        return newDetails;
      });

      setEditingPropertyId(null);
      toast.success("Property removed from favorites", { position: "top-left" });
    } catch (error) {
      toast.error("Failed to remove favorite. Please try again.", { position: "top-left" });
    }
  };

  const handleCardSubmit = async (propertyId) => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (!customerAuth || !customerAuth.token) {
      toast.error("Please log in to save preferences.", { position: "top-left" });
      return;
    }

    const details = favoriteDetails[propertyId];
    if (!details || (!details.numbering && !details.notes)) {
      toast.error("Please enter a rank or notes before submitting.", { position: "top-left" });
      return;
    }

    const numberings = Object.entries(favoriteDetails)
      .filter(([id]) => id !== propertyId)
      .map(([, detail]) => detail.numbering)
      .filter((num) => num !== "" && num !== undefined);
    if (details.numbering && numberings.includes(details.numbering)) {
      toast.error("This preference rank is already used.", { position: "top-left" });
      return;
    }

    try {
      localStorage.setItem("favoriteDetails", JSON.stringify(favoriteDetails));
      toast.success(
        `Preferences for ${
          savedProperties.find((p) => p._id === propertyId).title
        } saved!`,
        { position: "top-left" }
      );
      setEditingPropertyId(null);
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.", { position: "top-left" });
    }
  };

 
  return (
    <>
      <CustomerNavbar />
      <div className="flex flex-1 min-h-screen">
        <CustomerSidebar />
        <main className="px-3 md:px-10 w-full mt-12">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Saved Properties</h1>
            
          </header>
          <section className="bg-white shadow rounded p-6 my-8">
            <SavedPropertiesSection
              savedProperties={savedProperties}
              favoriteDetails={favoriteDetails}
              editingPropertyId={editingPropertyId}
              setFavoriteDetails={setFavoriteDetails}
              setEditingPropertyId={setEditingPropertyId}
              handleRemoveFavorite={handleRemoveFavorite}
              handleCardSubmit={handleCardSubmit}
              handleDetailChange={handleDetailChange}
              toggleEdit={toggleEdit}
            />
          </section>
        </main>
      </div>
    </>
  );
};

export default SavedPropertiesPage;
