import HeaderText from "../HeaderText";
import WorkInProcess from "../WorkInProcess";

const PopularProperties = () => {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Apartment for Sale with 3 Rooms",
      location: "Tuzant Village, Ilfov County",
    },
    {
      id: 2,
      title: "House for Sale with 5 Rooms",
      location: "Pipera-Baneasa Area, Bucharest 310 sqm",
    },
    {
      id: 3,
      title: "Duplex Apartment for Sale",
      location: "Dorobanti-Capitale Area",
    },
    {
      id: 4,
      title: "Villa for Rent with 6 Rooms",
      location: "Snagov Ilfov Area",
    },
    {
      id: 5,
      title: "Apartment for Rent with 4 Rooms",
      location: "Eminescu-Romana Area",
    },
  ];

  return (
    <div className="md:py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40  bg-white text-center">
      {/* Section Title */}
     

     <HeaderText title={'Popular Properties'}/>
    
      <WorkInProcess />
      {/* Property Grid */}
      <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full mx-auto">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`bg-gray-900 text-white p-6 rounded-lg flex items-center justify-center text-center 
              ${index === 2 ? "md:col-span-2" : "md:col-span-1"}`}
          >
            <div>
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm mt-1">{property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProperties;
