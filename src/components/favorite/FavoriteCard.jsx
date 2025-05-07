import { MdOutlineStar } from "react-icons/md";
import { FiEdit, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_APP_URL;

const formatPrice = (value) => {
  const num = Number(value);
  if (isNaN(num)) return value;
  if (num >= 1e7) return `${(num / 1e7).toFixed(2)} Cr`;
  if (num >= 1e5) return `${(num / 1e5).toFixed(2)} Lakh`;
  return num.toLocaleString("en-IN");
};

const FavoriteCard = ({
  property,
  favoriteDetails,
  editingPropertyId,
  handleRemoveFavorite,
  handleDetailChange,
  handleCardSubmit,
  toggleEdit,
}) => {
  return (
    <Link
      to={
        editingPropertyId === property._id
          ? null
          : `/projects/${property.title.replaceAll(" ", "-")}/${property._id}`
      }
      className="border rounded-lg shadow-md relative overflow-hidden bg-white"
    >
      {property.galleryImg?.[0] ? (
        <img
          src={`${baseUrl}/Uploads/property/${property.galleryImg[0]}`}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      {favoriteDetails[property._id]?.numbering && (
        <span className="bg-logoBlue absolute top-2 right-2 text-white text-xs text-nowrap font-medium px-2 py-1 rounded">
          Rank {favoriteDetails[property._id].numbering}
        </span>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {property.title}
          </h2>
        </div>
        <p className="text-gray-600 mt-1">
          {property.address || property.location}
        </p>
        <p className="text-gray-800 font-medium mt-2">
          Price: {formatPrice(property.price)}
        </p>
        {editingPropertyId === property._id ? (
          <>
            <div className="mt-3">
              <label className="text-sm text-gray-600 font-medium">
                Preference Rank
              </label>
              <input
                type="number"
                min="1"
                value={favoriteDetails[property._id]?.numbering || ""}
                onChange={(e) =>
                  handleDetailChange(property._id, "numbering", e.target.value)
                }
                className="w-full mt-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-logoBlue"
                placeholder="e.g., 1, 2, 3"
              />
            </div>
            <div className="mt-3">
              <label className="text-sm text-gray-600 font-medium">
                Short Notes
              </label>
              <textarea
                value={favoriteDetails[property._id]?.notes || ""}
                onChange={(e) =>
                  handleDetailChange(property._id, "notes", e.target.value)
                }
                maxLength={100}
                rows={3}
                className="w-full mt-1 p-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-logoBlue"
                placeholder="Why you favorited this property..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {(favoriteDetails[property._id]?.notes || "").length}/100
                characters
              </p>
            </div>
          </>
        ) : (
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Rank:</span>{" "}
              {favoriteDetails[property._id]?.numbering || "Not set"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Notes:</span>{" "}
              {favoriteDetails[property._id]?.notes || "None"}
            </p>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFavorite(property._id);
            }}
            className="text-sm px-4 py-1.5 rounded font-medium flex items-center gap-1 bg-red-500/50 text-white hover:opacity-90 transition"
          >
            <MdOutlineStar size={16} />
            Remove
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleEdit(property._id);
            }}
            className="text-sm px-4 py-1.5 rounded font-medium flex items-center gap-1 bg-gray-500 text-white hover:bg-gray-600 transition"
          >
            {editingPropertyId === property._id ? (
              <>
                <FiX size={16} />
                Cancel
              </>
            ) : (
              <>
                <FiEdit size={16} />
                Edit
              </>
            )}
          </button>
          {editingPropertyId === property._id && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCardSubmit(property._id);
              }}
              className="text-sm px-4 py-1.5 rounded font-medium bg-logoBlue text-white hover:bg-logoBlue/90 transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FavoriteCard;