import TrendingProjectCard from "../TrendingProjectCard";

const AllProjects = ({ properties, loading = false }) => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12 mx-auto max-w-[1920px] mb-10 sm:mb-12 md:mb-[93px]">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
        Discover a World of Possibilities
      </h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-[47px] 2xl:mb-[47px]">
        Our portfolio of properties is as diverse as your dreams. Explore the
        following categories to find the perfect property that resonates with
        your vision of home
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {loading
          ? // Render skeleton cards when loading
            [...Array(6)].map((_, i) => (
              <TrendingProjectCard key={i} loading={true} />
            ))
          : // Render actual project cards when not loading
            properties.map((prop, i) => (
              <TrendingProjectCard prop={prop} key={i} />
            ))}
      </div>
    </section>
  );
};

export default AllProjects;
