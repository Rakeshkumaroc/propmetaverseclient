import AbstractDesign from "../../assets/global/Abstract Design.png";
import AbstractDesign2 from "../../assets/global/Abstract Design2.png";
import { Link } from "react-router-dom";

const RealEstateBanner = () => {
  return (
    <section className="w-full relative border px-4 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-20 mx-auto max-w-[1920px]">
      <div className="absolute left-0 top-0 bottom-0">
        <img
          src={AbstractDesign}
          alt="AbstractDesign"
          className="h-full w-auto"
        />
      </div>
      <div className="absolute hidden sm:block md:block lg:block xl:block 2xl:block right-0 top-0 bottom-0">
        <img
          src={AbstractDesign2}
          alt="AbstractDesign2"
          className="h-full w-auto"
        />
      </div>

      <div className="relative z-10 flex py-6 sm:py-8 md:py-10 lg:py-10 xl:py-10 2xl:py-10 min-h-[150px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[259px] xl:min-h-[259px] 2xl:min-h-[259px] flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-8 2xl:gap-8">
        <div className="max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl  ">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[38px] 2xl:text-[38px] text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-[10px] xl:mb-[10px] 2xl:mb-[10px]">
            Start Your Real Estate Journey Today
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
            Your dream property is just a click away. Whether you’re looking for
            a new home, a strategic investment, or expert real estate advice,
            Propmetaverse is here to assist you every step of the way. Take the
            first step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized assistance.
          </p>
        </div>

       
          <Link
            to="/projects"
            className="bg-logoColor hover:bg-logoColor/90 text-white font-[700] text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] 2xl:text-[20px] py-2 sm:py-2 md:py-3 lg:py-3 xl:py-3 2xl:py-3 px-4 sm:px-5 md:px-6 lg:px-6 xl:px-6 2xl:px-6 rounded-md transition"
          >
            Explore Properties
          </Link>
       
      </div>
    </section>
  );
};

export default RealEstateBanner;