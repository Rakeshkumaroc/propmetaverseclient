import HandImage from "../../assets/about/hand.png";

const OurJourney = () => {
  return (
    <div className="w-full relative mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px] mt-16 sm:mt-20 md:mt-24 lg:mt-[150px] xl:mt-[150px] 2xl:mt-[200px]">
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-12 2xl:py-12 px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-20 grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-8 2xl:gap-8">
        {/* Left Section - Text & Buttons */}
        <div className="w-full md:w-[400px] lg:w-[500px] xl:w-[610px] 2xl:w-[610px]">
          <div className="w-full flex flex-col items-start gap-2 sm:gap-3 md:gap-4 lg:gap-[20px] xl:gap-[20px] 2xl:gap-[20px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we’ve
              earned the trust of countless clients.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-[89px] xl:mt-[89px] 2xl:mt-[89px] flex gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 flex-wrap">
            <div className="bg-logoBlue space-y-1 sm:space-y-[2px] md:space-y-[2px] lg:space-y-[2px] xl:space-y-[2px] 2xl:space-y-[2px] text-white rounded-[10px] p-4 sm:p-3 md:p-[10px_16px] lg:p-[14px_20px] xl:p-[14px_20px] 2xl:p-[14px_20px] w-full sm:w-[150px] md:w-[180px] lg:w-[192.6667px] xl:w-[192.6667px] 2xl:w-[192.6667px] text-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] xl:text-[30px] 2xl:text-[30px] font-[700]">
                200+
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
                Happy Customers
              </p>
            </div>
            <div className="bg-logoBlue space-y-1 sm:space-y-[2px] md:space-y-[2px] lg:space-y-[2px] xl:space-y-[2px] 2xl:space-y-[2px] text-white rounded-[10px] p-4 sm:p-3 md:p-[10px_16px] lg:p-[14px_20px] xl:p-[14px_20px] 2xl:p-[14px_20px] w-full sm:w-[150px] md:w-[180px] lg:w-[192.6667px] xl:w-[192.6667px] 2xl:w-[192.6667px] text-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] xl:text-[30px] 2xl:text-[30px] font-[700]">
                10k+
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
                Properties For Clients
              </p>
            </div>
            <div className="bg-logoBlue space-y-1 sm:space-y-[2px] md:space-y-[2px] lg:space-y-[2px] xl:space-y-[2px] 2xl:space-y-[2px] text-white rounded-[10px] p-4 sm:p-3 md:p-[10px_16px] lg:p-[14px_20px] xl:p-[14px_20px] 2xl:p-[14px_20px] w-full sm:w-[150px] md:w-[180px] lg:w-[192.6667px] xl:w-[192.6667px] 2xl:w-[192.6667px] text-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] xl:text-[30px] 2xl:text-[30px] font-[700]">
                3+
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
                Years of Experience
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full sm:w-[80%] md:w-[400px] lg:w-[600px] xl:w-[45vw]  h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[500px] rounded-xl bg-black flex justify-center md:justify-end items-center md:items-end">
          <img
            src={HandImage}
            alt="House in hand"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default OurJourney;
