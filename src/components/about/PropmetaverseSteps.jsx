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
    <section className="px-2 sm:px-4 md:px-10 lg:px-24 py-10 sm:py-14 bg-white w-full mb-[93px] sm:mb-[60px]">
      {/* Reduced padding for mobile */}

      {/* Title Section */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-bold text-logoBlue mb-4">
          Navigating the Propmetaverse Experience
        </h2>
        <p className="text-black text-xs sm:text-sm md:text-base font-medium max-w-4xl leading-[150%]">
          At Propmetaverse, we've designed a straightforward process to help you
          find and purchase your dream property with ease. Here's a step-by-step
          guide to how it all works.
        </p>
        {/* Scaled heading and paragraph text for mobile */}
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((item, index) => (
          <div key={index}>
            <p className="text-black border-l border-black/40 p-[10px] sm:p-[15px] font-semibold text-xs sm:text-sm md:text-base">
              {item.step}
            </p>
            <div
              style={{
                background:
                  "linear-gradient(121deg, #1865A4 -49.01%, rgba(24, 101, 164, 0.00) 13.65%)",
              }}
              className="border border-black/40 rounded-lg rounded-tl-none p-3 sm:p-4 md:p-[40px] relative shadow-sm"
            >
              <div className="pt-3 sm:pt-4">
                <h5 className="text-[18px] sm:text-[20px] text-[#1865A4] mb-2">
                  {item.title}
                </h5>
                <p className="text-black leading-[150%] font-medium text-xs sm:text-sm md:text-base">
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