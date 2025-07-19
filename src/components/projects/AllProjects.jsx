import TrendingProjectCard from "../TrendingProjectCard";

const AllProjects = ({ properties }) => {
  return (
    <section className="w-full md:py-12 px-4 sm:px-6 overflow-hidden md:px-20 mx-auto   max-w-[1920px] mb-[93px]">
      <h2 className="text-2xl sm:text-3xl md:text-[38px] text-logoBlue mb-2">
        Discover a World of Possibilities
      </h2>
      <p className="text-sm sm:text-base mb-8 md:mb-[32px]">
        Our portfolio of properties is as diverse as your dreams. Explore the
        following categories to find the perfect property that resonates with
        your vision of home
      </p>
      <div className="grid grid-cols-3 gap-[20px]">
        {properties.map((prop, i) => (
          <TrendingProjectCard prop={prop} key={i} />
        ))}
      </div>
    </section>
  );
};

export default AllProjects;
