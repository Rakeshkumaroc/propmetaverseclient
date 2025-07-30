const steps = [
  {
    step: "Step 01",
    title: "Discover a World of Possibilities",
    desc: "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location.",
  },
  {
    step: "Step 02",
    title: "Narrowing Down Your Choices",
    desc: "Once you’ve found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    step: "Step 03",
    title: "Personalized Guidance",
    desc: "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
  },
  {
    step: "Step 04",
    title: "RERA Approved Properties",
    desc: "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
  },
  {
    step: "Step 05",
    title: "Making Informed Decisions",
    desc: "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
  },
  {
    step: "Step 06",
    title: "Getting the Best Deal",
    desc: "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
  },
];

const PropmetaverseSteps = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-14 bg-white w-full mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px]">
      {/* Title Section */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-12 2xl:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">

          Navigating the Propmetaverse Experience
        </h2>
        <p className="text-black text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-medium max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-[150%]">
          At Propmetaverse, we've designed a straightforward process to help you
          find and purchase your dream property with ease. Here's a step-by-step
          guide to how it all works.
        </p>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
        {steps.map((item, index) => (
          <div key={index}>
            <p className="text-black border-l border-black/40 p-[6px] sm:p-[8px] md:p-[10px] lg:p-[12px] xl:p-[15px] 2xl:p-[15px] font-semibold text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
              {item.step}
            </p>
            <div
              style={{
                background:
                  "linear-gradient(121deg, #1865A4 -49.01%, rgba(24, 101, 164, 0.00) 13.65%)",
              }}
              className="border border-black/40 rounded-lg rounded-tl-none p-4 sm:p-3 md:p-4 lg:p-6 xl:p-[40px] 2xl:p-[40px] relative shadow-sm"
            >
              <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-4 2xl:pt-4">
                <h5 className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[20px] 2xl:text-[20px] text-[#1865A4] mb-1 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
                  {item.title}
                </h5>
                <p className="text-black line-clamp-3 leading-[150%] font-medium text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropmetaverseSteps;