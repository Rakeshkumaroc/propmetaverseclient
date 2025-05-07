import React from "react";
import { Link } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";
import FavoriteCard from "../favorite/FavoriteCard";
import { toast } from "react-toastify";

const SavedPropertiesSection = ({
  savedProperties,
  favoriteDetails,
  editingPropertyId,
  setSavedProperties,
  setFavoriteDetails,
  setEditingPropertyId,
  handleRemoveFavorite,
  handleCardSubmit,
  handleDetailChange,
  toggleEdit,
}) => {
  const sortedProperties = [...savedProperties].sort((a, b) => {
    const rankA = favoriteDetails[a._id]?.numbering
      ? parseInt(favoriteDetails[a._id].numbering)
      : Infinity;
    const rankB = favoriteDetails[b._id]?.numbering
      ? parseInt(favoriteDetails[b._id].numbering)
      : Infinity;
    return rankA - rankB;
  });

  return (
    <section className="mb-8 bg-white shadow rounded p-6">
      <h2 className="text-2xl flex items-center gap-3 font-semibold mb-4">
        Saved Properties{" "}
        <Link to={"/favorites"}>
          <MdOpenInNew className="text-logoBlue text-lg hover:text-logoColor" />
        </Link>
      </h2>
      {savedProperties.length === 0 ? (
        <p className="text-gray-600">No saved properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
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
    </section>
  );
};

export default SavedPropertiesSection;