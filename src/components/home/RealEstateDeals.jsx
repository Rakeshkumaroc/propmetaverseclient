import WorkInProcess from "../WorkInProcess";

const RealEstateDeals = () => {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Villa with 6 Rooms in Dorobanti Area",
      description:
        "Located in a very elite & stylish area, near famous clubs, cafes, restaurants, and schools.",
      price: "$220,000",
    },
    {
      id: 2,
      title: "Apartment with 3 Rooms in Grunopolis",
      description:
        "Modern apartment in the heart of Grunopolis, featuring state-of-the-art facilities.",
      price: "$140,000",
    },
    {
      id: 3,
      title: "Garsonier with 2 Rooms in Uniri Area",
      description:
        "This property is well located, offering proximity to top shopping centers and business districts.",
      price: "$90,000",
    },
  ];

  return (
    <div className="px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-logoColor">
        We are Offering the Best Real Estate Deals
      </h2>
      {/* Subtitle */}
      <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
        Look at our latest listed properties and check out the facilities on
        them. We have already sold more than 5,000 homes and continue at a great
        pace.
      </p>

      <WorkInProcess />
      {/* Property Cards */}
      <div className="hidden grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Placeholder for Image */}
            <div className="w-full h-48 bg-gray-300"></div>

            {/* Property Info */}
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-gray-600 mt-2">{property.description}</p>

              {/* Buttons & Price */}
              <div className="flex justify-between items-center mt-4">
                <button className="text-green-700 border border-green-700 px-4 py-2 rounded-md hover:bg-green-700 hover:text-white transition">
                  ★ Favorite
                </button>
                <span className="text-white bg-blue-600 px-4 py-2 rounded-md">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateDeals;
