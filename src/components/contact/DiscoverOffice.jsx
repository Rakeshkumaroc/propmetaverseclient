 import OfficeCard from "./OfficeCard"; // Assuming OfficeCard is in the same directory

const DiscoverOffice = () => {
  return (
    <section className="w-full    py-10 md:py-16 2xl:py-20  mb-12 sm:mb-16 md:mb-24 2xl:mb-[93px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-20 mx-auto max-w-[1920px]">
      <div>
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
       Discover Our Office Locations
      </h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-[47px] 2xl:mb-[47px]">
        Propmetaverse is here to serve you across multiple locations. Whether
          you're looking to meet our team, discuss real estate opportunities, or
          simply drop by for a chat, we have offices conveniently located to
          serve your needs. Explore the categories below to find the
          Propmetaverse office nearest to you.
      </p>


       
      </div>

      {/* Grid of OfficeCards: Adjusted column layout and gap for all breakpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 2xl:gap-8">
        <OfficeCard
          type="Main Headquarters"
          address="123 Propmetaverse Plaza, City Center, Metropolis"
          description="Our main headquarters serve as the heart of Propmetaverse. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us."
          email="info@estatein.com"
          phone="+1 (123) 456-7890"
          city="Metropolis"
        />

        <OfficeCard
          type="Regional Offices"
          address="456 Urban Avenue, Downtown District, Metropolis"
          description="Propmetaverse presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets."
          email="info@restatein.com"
          phone="+1 (123) 628-7890"
          city="Metropolis"
        />
      </div>
    </section>
  );
};

export default DiscoverOffice;