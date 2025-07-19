import HandImage from "../../assets/about/hand.png";

const OurJourney = () => {
  return (
    <div className="w-full relative mb-[93px] sm:mb-[60px] mt-[120px] md:mt-[150px] xl:mt-[150px] 2xl:mt-[200px]">
      {/* Reduced bottom margin on mobile for better spacing */}
      <section className="w-full md:py-12 px-4 sm:px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-8">
        {/* Left Section - Text & Buttons */}
        <div className="md:w-[610px] w-full">
          <div className="w-full flex flex-col items-start gap-[10px] md:gap-[20px]">
            <h2 className="text-[32px] md:text-[38px] font-bold text-logoBlue mb-4">
              Our Journey
            </h2>
            {/* Adjusted heading size for smaller screens */}
            <p className="text-gray-600 text-sm sm:text-base ">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we’ve
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </p>
            {/* Scaled text size for better readability on mobile */}
          </div>

          {/* Stats */}
          <div className="mt-[20px] sm:mt-[29px] md:mt-[89px] flex gap-4 flex-wrap">
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px] p-[10px_16px] sm:p-[14px_20px] w-full sm:w-[192.6667px] md:w-[192.6667px] text-start">
              <p className="text-[24px] sm:text-[30px] font-[700]">200+</p>
              <p className="text-sm sm:text-base">Happy Customers</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px] p-[10px_16px] sm:p-[14px_20px] w-full sm:w-[192.6667px] md:w-[192.6667px] text-start">
              <p className="text-[24px] sm:text-[30px] font-[700]">10k+</p>
              <p className="text-sm sm:text-base">Properties For Clients</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px] p-[10px_16px] sm:p-[14px_20px] w-full sm:w-[192.6667px] md:w-[192.6667px] text-start">
              <p className="text-[24px] sm:text-[30px] font-[700]">3+</p>
              <p className="text-sm sm:text-base">Years of Experience</p>
            </div>
            {/* Reduced padding and font sizes on mobile for better fit */}
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full sm:w-[80%] md:w-[817px] h-[300px] sm:h-[400px] md:h-[500px] rounded-xl bg-black flex justify-center md:justify-end items-center md:items-end">
          <img
            src={HandImage}
            alt="House in hand"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Made image visible on mobile with smaller size, centered */}
      </section>
    </div>
  );
};

export default OurJourney;
