const OurAchievements = () => {
  return (
    <section className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-12 2xl:py-12 bg-white mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px]">
      {/* Title and Description */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-10 xl:mb-10 2xl:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
          Our Achievements
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base text-black font-medium leading-[150%] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-3xl 2xl:max-w-3xl">
          Our story is one of continuous growth and evolution. We started as a
          small team with big dreams, determined to create a real estate
          platform that transcended the ordinary.
        </p>
      </div>

      {/* Achievements Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[30px] xl:gap-[30px] 2xl:gap-[30px]">
        {/* Card 1 */}
        <div className="bg-[#1865A4] text-white rounded-[10px]  p-4 sm:p-4 md:p-6 lg:p-8 xl:p-[40px] 2xl:p-[40px] border border-black/50">
          <h5 style={{ color: "white" }} className="text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[24px] 2xl:text-[24px] font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
            3+ Years of Excellence
          </h5>
          <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-medium leading-[150%]">
            With over 3 years in the industry, we've amassed a wealth of
            knowledge and experience.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1865A4] text-white rounded-[10px] p-2 sm:p-4 md:p-6 lg:p-8 xl:p-[40px] 2xl:p-[40px] border border-black/50">
          <h5 style={{ color: "white" }} className="text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[24px] 2xl:text-[24px] font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
            Happy Clients
          </h5>
          <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-medium leading-[150%]">
            Our greatest achievement is the satisfaction of our clients. Their
            success stories fuel our passion for what we do.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1865A4] text-white rounded-[10px] p-2 sm:p-4 md:p-6 lg:p-8 xl:p-[40px] 2xl:p-[40px] border border-black/50">
          <h5 style={{ color: "white" }} className="text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[24px] 2xl:text-[24px] font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
            Industry Recognition
          </h5>
          <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-medium leading-[150%]">
            We've earned the respect of our peers and industry leaders, with
            accolades and awards that reflect our commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;