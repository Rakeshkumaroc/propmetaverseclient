import React from "react";
import { Link } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";
import FavoriteCard from "../favorite/FavoriteCard";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";

const SavedPropertiesSection = ({
  savedProperties,
  favoriteDetails,
  editingPropertyId, 
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
      <div>
     
      {savedProperties.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <FiHeart
            className="text-2xl mr-2 text-logoBlue"
            aria-hidden="true"
          />
          <p className="text-lg">No saved properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default SavedPropertiesSection;