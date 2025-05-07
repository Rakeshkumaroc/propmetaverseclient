import React, { useEffect, useState } from "react";
import {
  IndianRupee,
  Gift,
  Home,
  BarChart2,
  Hammer,
  MapPin,
  Building,
  Sparkles,
  Ruler,
  Image as ImageIcon,
  Heart,
  Eye,
  Trash2,
} from "lucide-react";

const baseUrl = import.meta.env.VITE_APP_URL;

const formatPrice = (value) => {
  const num = Number(value);
  if (isNaN(num)) return value;
  if (num >= 1e7) return `${(num / 1e7).toFixed(2)} Cr`;
  if (num >= 1e5) return `${(num / 1e5).toFixed(2)} Lakh`;
  return num.toLocaleString("en-IN");
};

const CompareTable = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteProperties")) || [];
  });
  const [removedProperties, setRemovedProperties] = useState([]);

  const toggleFavorite = (propertyId) => {
    const updatedFavorites = favorites.includes(propertyId)
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favoriteProperties",
      JSON.stringify(updatedFavorites)
    );
  };

  const removeProperty = (propertyId) => {
    const updatedCompare = JSON.parse(
      localStorage.getItem("compareProperties") || "[]"
    ).filter((item) => item.id !== propertyId);
    localStorage.setItem("compareProperties", JSON.stringify(updatedCompare));
    setProperties(properties.filter((prop) => prop._id !== propertyId));
  };
  useEffect(() => {
    const fetchProperties = async () => {
      const ids = JSON.parse(localStorage.getItem("compareProperties")) || [];
      if (!ids.length) return setLoading(false);

      try {
        const fetchedProperties = await Promise.all(
          ids.map(async (item) => {
            try {
              const res = await fetch(`${baseUrl}/single-property/${item.id}`);
              if (!res.ok) {
                throw new Error(`Property ${item.id} not found`);
              }
              const data = await res.json();
              return data || null;
            } catch (err) {
              console.error(`Failed to fetch property ${item.id}:`, err);
              return null;
            }
          })
        );

        const validProperties = fetchedProperties.filter(Boolean);
        const fetchedIds = validProperties.map((prop) => prop._id);
        const invalidIds = ids
          .filter((item) => !fetchedIds.includes(item.id))
          .map((item) => item.id);

        // Update localStorage to keep only valid property IDs
        const updatedIds = ids.filter((item) => fetchedIds.includes(item.id));
        localStorage.setItem("compareProperties", JSON.stringify(updatedIds));

        setProperties(validProperties);
        setRemovedProperties(invalidIds);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading comparison data...
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="md:text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-logoColor">
          Property Comparison
        </h2>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Compare top real estate listings side-by-side to make informed
          decisions. Evaluate price, location, property type, and more in one
          clear view. Make smarter choices with detailed comparisons at your
          fingertips.
        </p>
      </div>

      {removedProperties.length > 0 && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg text-center">
          {removedProperties.length} property(ies) removed as they could not be
          found.
        </div>
      )}

      {properties.length === 0 && removedProperties.length === 0 ? (
        <div className="p-6 text-center text-gray-600 text-lg">
          No properties added to compare.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded shadow-lg">
            <table className="w-full text-left border-none bg-white rounded text-logoBlue">
              <thead className="bg-logoBlue">
                <tr>
                  <th className="p-4 text-base text-white font-semibold sticky left-0 bg-logoBlue">
                    Feature
                  </th>
                  {properties.map((prop) => (
                    <th
                      key={prop._id}
                      className="p-4 text-base font-semibold text-white"
                    >
                      {prop.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr className="hover:bg-gray-50">
                  <td
                    className="p-4 font-medium text-gray-800 sticky left-0 bg-white"
                    style={{ backgroundColor: "#fff" }}
                  >
                    Actions
                  </td>
                  {properties.map((prop) => (
                    <td key={prop._id} className="p-4 text-gray-700">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(prop._id)}
                          className="p-2 rounded-full hover:bg-gray-100"
                          aria-label={
                            favorites.includes(prop._id)
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(prop._id)
                                ? "text-logoColor fill-logoColor"
                                : "text-logoBlue"
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => removeProperty(prop._id)}
                          className="p-2 rounded-full hover:bg-gray-100"
                          aria-label="Remove from comparison"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                        <a
                          href={
                            "/projects/" +
                            prop.title.replaceAll(" ", "-") +
                            "/" +
                            prop._id
                          }
                          className="flex items-center px-3 py-1 bg-logoBlue text-white rounded hover:bg-logoColor"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
                {[
                  {
                    label: "Price",
                    key: "price",
                    icon: <IndianRupee className="w-5 h-5" />,
                    render: (val) => formatPrice(val),
                  },
                  {
                    label: "Discount",
                    key: "discount",
                    icon: <Gift className="w-5 h-5" />,
                    render: (val) => formatPrice(val),
                  },
                  {
                    label: "Property Type",
                    key: "propertyType",
                    icon: <Home className="w-5 h-5" />,
                  },
                  {
                    label: "Status",
                    key: "status",
                    icon: <BarChart2 className="w-5 h-5" />,
                  },
                  {
                    label: "Construction Year",
                    key: "constructionYear",
                    icon: <Hammer className="w-5 h-5" />,
                  },
                  {
                    label: "City",
                    key: "city",
                    icon: <MapPin className="w-5 h-5" />,
                  },
                  {
                    label: "Address",
                    key: "address",
                    icon: <MapPin className="w-5 h-5" />,
                  },
                  {
                    label: "Developer",
                    key: "developer",
                    icon: <Building className="w-5 h-5" />,
                  },
                  {
                    label: "Amenities",
                    key: "amenities",
                    icon: <Sparkles className="w-5 h-5" />,
                    render: (val) =>
                      val?.length
                        ? val.slice(0, 5).join(", ") +
                          (val.length > 5 ? "..." : "")
                        : "N/A",
                  },
                  {
                    label: "Floor Plan",
                    key: "floorPlan",
                    icon: <Ruler className="w-5 h-5" />,
                    render: (val) =>
                      val
                        ?.map((fp) => `${fp.type} - ${fp.carpetArea} sqft`)
                        .join(", ") || "N/A",
                  },
                  {
                    label: "Image",
                    key: "galleryImg",
                    icon: <ImageIcon className="w-5 h-5" />,
                    render: (val) =>
                      val?.[0] ? (
                        <img
                          src={`${baseUrl}/Uploads/property/${val[0]}`}
                          alt="Property"
                          className="w-28 h-20 object-cover rounded border border-gray-200 hover:scale-105 transition-transform"
                        />
                      ) : (
                        "No Image"
                      ),
                  },
                ].map((feature) => (
                  <tr key={feature.label} className="hover:bg-gray-50">
                    <td
                      className="p-4 font-medium text-gray-800 sticky left-0 bg-white"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <div className="flex items-center">
                        {feature.icon}
                        <span className="ml-2">{feature.label}</span>
                      </div>
                    </td>
                    {properties.map((prop) => (
                      <td key={prop._id} className="p-4 text-gray-700">
                        {feature.render
                          ? feature.render(prop[feature.key])
                          : prop[feature.key] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-16">
            {properties.map((prop) => (
              <div
                key={prop._id}
                className="border rounded bg-white transition-shadow transform hover:-translate-y-1"
              >
                <div className="bg-logoBlue p-2">
                  <h3 className="text-xl font-bold text-white">{prop.title}</h3>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => toggleFavorite(prop._id)}
                      className="p-2 rounded-full bg-white hover:bg-gray-100"
                      aria-label={
                        favorites.includes(prop._id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(prop._id)
                            ? "text-logoColor fill-logoColor"
                            : "text-logoBlue"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => removeProperty(prop._id)}
                      className="p-2 rounded-full bg-white hover:bg-gray-100"
                      aria-label="Remove from comparison"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <a
                      href={
                        "/projects/" +
                        prop.title.replaceAll(" ", "-") +
                        "/" +
                        prop._id
                      }
                      className="flex items-center px-3 py-1 bg-white text-logoBlue rounded hover:bg-logoColor hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </a>
                  </div>
                </div>
                <div className="space-y-3 text-sm p-2">
                  <div className="flex items-center">
                    <span>
                      <IndianRupee className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">Price:</span>
                    <span className="ml-2">{formatPrice(prop.price)}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Gift className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">Discount:</span>
                    <span className="ml-2">{formatPrice(prop.discount)}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Home className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">
                      Property Type:
                    </span>
                    <span className="ml-2">{prop.propertyType}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <BarChart2 className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">Status:</span>
                    <span className="ml-2">{prop.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Hammer className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">
                      Construction Year:
                    </span>
                    <span className="ml-2">{prop.constructionYear}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <MapPin className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">City:</span>
                    <span className="ml-2">{prop.city}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <MapPin className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">Address:</span>
                    <span className="ml-2">{prop.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Building className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">
                      Developer:
                    </span>
                    <span className="ml-2">{prop.developer}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Sparkles className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">
                      Amenities:
                    </span>
                    <span className="ml-2">
                      {prop.amenities?.length
                        ? prop.amenities.slice(0, 5).join(", ") +
                          (prop.amenities.length > 5 ? "..." : "")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      <Ruler className="w-5 h-5 mr-2 text-logoBlue" />
                    </span>
                    <span className="font-medium text-logoBlue">
                      Floor Plan:
                    </span>
                    <span className="ml-2">
                      {prop.floorPlan
                        ?.map((fp) => `${fp.type} - ${fp.carpetArea} sqft`)
                        .join(", ") || "N/A"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span>
                        <ImageIcon className="w-5 h-5 mr-2 text-logoBlue" />
                      </span>
                      <span className="font-medium text-logoBlue">Image:</span>
                    </div>
                    <div className="mt-3">
                      {prop.galleryImg?.[0] ? (
                        <img
                          src={`${baseUrl}/Uploads/property/${prop.galleryImg[0]}`}
                          alt="Property"
                          className="w-full max-w-[250px] h-auto rounded-lg border border-gray-200 hover:scale-105 transition-transform"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompareTable;
