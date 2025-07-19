import TrendingProjectCard from "../TrendingProjectCard";

const AllProjects = ({ properties }) => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12 mx-auto max-w-[1920px] mb-10 sm:mb-12 md:mb-[93px]">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-bold text-logoBlue mb-2 sm:mb-4">
        Discover a World of Possibilities
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-6 sm:mb-8 md:mb-[32px] leading-relaxed">
        Our portfolio of properties is as diverse as your dreams. Explore the
        following categories to find the perfect property that resonates with
        your vision of home
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {properties.map((prop, i) => (
          <TrendingProjectCard prop={prop} key={i} />
        ))}
      </div>
    </section>
  );
};

export default AllProjects;