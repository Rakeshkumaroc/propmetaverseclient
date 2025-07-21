import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_APP_URL;

const CompareProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removedProperties, setRemovedProperties] = useState([]);
  const [favoritePropertyIds, setFavoritePropertyIds] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const removeProperty = (propertyId) => {
    const updatedCompare = JSON.parse(
      localStorage.getItem("compareProperties") || "[]"
    ).filter((item) => item.id !== propertyId);
    localStorage.setItem("compareProperties", JSON.stringify(updatedCompare));
    setProperties(properties.filter((prop) => prop._id !== propertyId));
    toast.success("Property removed from comparison", { position: "top-left" });
  };

  const handleFavoriteToggle = async (e, propertyId, propertyTitle) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please log in as a customer to add to favorites.", {
        position: "top-left",
      });
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      toast.error("Invalid property ID.", { position: "top-left" });
      return;
    }

    try {
      let storedFavorites =
        JSON.parse(localStorage.getItem("savedProperties")) || [];
      const isCurrentlyFavorited = storedFavorites.some(
        (item) => item.id === propertyId
      );
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));

      if (isCurrentlyFavorited) {
        await axios.post(
          `${baseUrl}/remove-from-saved-properties`,
          { propertyId: propertyId },
          { headers: { Authorization: `Bearer ${customerAuth.token}` } }
        );
        storedFavorites = storedFavorites.filter(
          (item) => item.id !== propertyId
        );
        toast.success(`Removed "${propertyTitle}" from Favorites`, {
          position: "top-left",
        });
      } else {
        await axios.post(
          `${baseUrl}/add-to-saved-properties`,
          { propertyId: propertyId },
          { headers: { Authorization: `Bearer ${customerAuth.token}` } }
        );
        storedFavorites.push({ id: propertyId });
        toast.success(`Added "${propertyTitle}" to Favorites`, {
          position: "top-left",
        });
      }

      localStorage.setItem("savedProperties", JSON.stringify(storedFavorites));
      setFavoritePropertyIds(storedFavorites.map((item) => item.id));
    } catch (error) {
      console.error("Error updating favorites:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-left",
        });
      } else if (error.response?.status === 404) {
        toast.error("Property not found in favorites.", {
          position: "top-left",
        });
        let storedFavorites =
          JSON.parse(localStorage.getItem("savedProperties")) || [];
        storedFavorites = storedFavorites.filter(
          (item) => item.id !== propertyId
        );
        localStorage.setItem(
          "savedProperties",
          JSON.stringify(storedFavorites)
        );
        setFavoritePropertyIds(storedFavorites.map((item) => item.id));
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to update favorites. Please try again.",
          { position: "top-left" }
        );
      }
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const ids = JSON.parse(localStorage.getItem("compareProperties")) || [];
      if (!ids.length) {
        setLoading(false);
        return;
      }

      try {
        const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
        setIsAuthenticated(!!(customerAuth && customerAuth.token));

        const storedFavorites =
          JSON.parse(localStorage.getItem("savedProperties")) || [];
        setFavoritePropertyIds(storedFavorites.map((item) => item.id));

        const fetchedProperties = await Promise.all(
          ids.map(async (item) => {
            try {
              const res = await fetch(`${baseUrl}/single-property/${item.id}`);
              if (!res.ok) throw new Error(`Property ${item.id} not found`);
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
    <section className="w-full max-w-[1200px] mx-auto px-4 py-12 bg-white mb-[60px]">
      <div className="mb-10">
        <h2
          style={{ color: "black" }}
          className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 font-bold"
        >
          Compare Properties
        </h2>
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 shadow-sm">
          <thead>
            <tr>
              <th className="bg-white border px-4 py-4"></th>
              {properties.map((property, index) => (
                <th key={index} className="bg-white border">
                  <div className="relative p-4 sm:p-6">
                    <img
                      src={property.galleryImg ? property.galleryImg[0] : ""}
                      alt={property.title}
                      className="rounded-lg mx-auto w-full max-w-[200px] h-[150px] object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span
                        onClick={() => removeProperty(property._id)}
                        className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1341_3685)">
                            <path
                              d="M0.824885 11.6267C0.682622 11.6267 0.54036 11.5726 0.432272 11.4637C0.215284 11.2467 0.215284 10.8949 0.432272 10.6779L10.1208 0.989401C10.3378 0.772413 10.6896 0.772413 10.9066 0.989401C11.1236 1.20639 11.1236 1.55818 10.9066 1.7753L1.21818 11.4637C1.10928 11.5719 0.967013 11.6267 0.824885 11.6267Z"
                              fill="white"
                            />
                            <path
                              d="M10.5141 11.6267C10.3718 11.6267 10.2297 11.5726 10.1215 11.4637L0.432272 1.7753C0.215284 1.55818 0.215284 1.20639 0.432272 0.989401C0.649261 0.772413 1.00105 0.772413 1.21818 0.989401L10.9066 10.6779C11.1236 10.8949 11.1236 11.2467 10.9066 11.4637C10.7977 11.5719 10.6555 11.6267 10.5141 11.6267Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1341_3685">
                              <rect
                                width="10.8"
                                height="10.8"
                                fill="white"
                                transform="translate(0.267578 0.82666)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {isAuthenticated && (
                        <span
                          onClick={(e) =>
                            handleFavoriteToggle(
                              e,
                              property._id,
                              property.title
                            )
                          }
                          className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill={
                              favoritePropertyIds.includes(property._id)
                                ? "red"
                                : "white"
                            }
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </span>
                      )}
                      <Link
                        to={`/projects/${property.title
                          .replaceAll(" ", "-")
                          .toLowerCase()}/${property._id}`}
                      >
                        <span className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Title", key: "title" },
              { label: "Discount", key: "discount" },
              { label: "Property Type", key: "propertyType" },
              { label: "Status", key: "status" },
              { label: "Construction Year", key: "constructionYear" },
              { label: "City", key: "city" },
              { label: "Address", key: "address" },
              { label: "Developer", key: "developer" },
              {
                label: "Amenities",
                key: "amenities",
                render: (val) =>
                  val?.length
                    ? val.slice(0, 5).join(", ") + (val.length > 5 ? "..." : "")
                    : "N/A",
              },
              { label: "Year Built", key: "constructionYear" },
            ].map((row, i) => (
              <tr
                key={i}
                className={`${
                  row.label === "Title"
                    ? "bg-whitey  font-bold text-base sm:text-lg"
                    : i % 2
                    ? "bg-white"
                    : "bg-[#BAD6EB]"
                }`}
              >
                <td className="border px-4 py-2 text-center font-bold text-base sm:text-lg">
                  {row.label}
                </td>
                {properties.map((property, j) => (
                  <td
                    key={j}
                    className="border px-4 py-2 text-center text-sm sm:text-base"
                  >
                    {row.render
                      ? row.render(property[row.key])
                      : property[row.key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stacked Cards */}
      <div className="md:hidden space-y-6">
        {properties.map((property, index) => (
          <div key={index} className="border rounded-lg shadow-sm p-4 bg-white">
            <div className="relative mb-4">
              <img
                src={property.galleryImg ? property.galleryImg[0] : ""}
                alt={property.title}
                className="rounded-lg w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <span
                  onClick={() => removeProperty(property._id)}
                  className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1341_3685)">
                      <path
                        d="M0.824885 11.6267C0.682622 11.6267 0.54036 11.5726 0.432272 11.4637C0.215284 11.2467 0.215284 10.8949 0.432272 10.6779L10.1208 0.989401C10.3378 0.772413 10.6896 0.772413 10.9066 0.989401C11.1236 1.20639 11.1236 1.55818 10.9066 1.7753L1.21818 11.4637C1.10928 11.5719 0.967013 11.6267 0.824885 11.6267Z"
                        fill="white"
                      />
                      <path
                        d="M10.5141 11.6267C10.3718 11.6267 10.2297 11.5726 10.1215 11.4637L0.432272 1.7753C0.215284 1.55818 0.215284 1.20639 0.432272 0.989401C0.649261 0.772413 1.00105 0.772413 1.21818 0.989401L10.9066 10.6779C11.1236 10.8949 11.1236 11.2467 10.9066 11.4637C10.7977 11.5719 10.6555 11.6267 10.5141 11.6267Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1341_3685">
                        <rect
                          width="10.8"
                          height="10.8"
                          fill="white"
                          transform="translate(0.267578 0.82666)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                {isAuthenticated && (
                  <span
                    onClick={(e) =>
                      handleFavoriteToggle(e, property._id, property.title)
                    }
                    className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill={
                        favoritePropertyIds.includes(property._id)
                          ? "red"
                          : "white"
                      }
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                )}
                <Link
                  to={`/projects/${property.title
                    .replaceAll(" ", "-")
                    .toLowerCase()}/${property._id}`}
                >
                  <span className="flex items-center justify-center bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Title", key: "title" },
                { label: "Discount", key: "discount" },
                { label: "Property Type", key: "propertyType" },
                { label: "Status", key: "status" },
                { label: "Construction Year", key: "constructionYear" },
                { label: "City", key: "city" },
                { label: "Address", key: "address" },
                { label: "Developer", key: "developer" },
                {
                  label: "Amenities",
                  key: "amenities",
                  render: (val) =>
                    val?.length
                      ? val.slice(0, 5).join(", ") +
                        (val.length > 5 ? "..." : "")
                      : "N/A",
                },
                { label: "Year Built", key: "constructionYear" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span className="font-bold text-sm">{row.label}:</span>
                  <span className="text-sm">
                    {row.render
                      ? row.render(property[row.key])
                      : property[row.key] || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareProperties;
