const OurAchievements = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-24 py-12 bg-white mb-[93px] sm:mb-[60px]">
      {/* Title and Description */}
      <div className="mb-10">
        <h2 className="text-[32px] md:text-[38px] font-bold text-logoBlue mb-4">
          Our Achievements
        </h2>
        <p className="text-base text-black font-medium leading-[150%] max-w-3xl">
          Our story is one of continuous growth and evolution. We started as a
          small team with big dreams, determined to create a real estate
          platform that transcended the ordinary.
        </p>
      </div>

      {/* Achievements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        {/* Card 1 */}
        <div className="bg-[#1865A4] text-white rounded-[10px] p-4 sm:p-6 md:p-[40px] border border-black/50 ">
          <h5 style={{color:'white'}} className="text-[24px] font-bold mb-4">3+ Years of Excellence</h5>
          <p className="text-sm sm:text-base font-medium leading-[150%]">
            With over 3 years in the industry, we've amassed a wealth of
            knowledge and experience.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1865A4] text-white rounded-[10px] p-4 sm:p-6 md:p-[40px] border border-black/50 ">
          <h5 style={{color:'white'}} className="text-[24px] font-bold mb-4">Happy Clients</h5>
          <p className="text-sm sm:text-base font-medium leading-[150%]">
            Our greatest achievement is the satisfaction of our clients. Their
            success stories fuel our passion for what we do.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1865A4] text-white rounded-[10px] p-4 sm:p-6 md:p-[40px] border border-black/50 ">
          <h5 style={{color:'white'}} className="text-[24px] font-bold mb-4">Industry Recognition</h5>
          <p className="text-sm sm:text-base font-medium leading-[150%]">
            We've earned the respect of our peers and industry leaders, with
            accolades and awards that reflect our commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;
