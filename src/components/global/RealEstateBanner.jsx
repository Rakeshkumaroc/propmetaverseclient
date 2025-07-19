import AbstractDesign from "../../assets/global/Abstract Design.png";
import AbstractDesign2 from "../../assets/global/Abstract Design2.png";
import { Link } from "react-router-dom";

const RealEstateBanner = () => {
  return (
    <section className="w-full relative    border px-4 sm:px-6 overflow-hidden md:px-20 mx-auto max-w-[1920px]  ">
      {/* Background pattern (optional): adjust as needed */}
       <div className="absolute    left-0 top-0 bottom-0">
        <img src={AbstractDesign} alt="AbstractDesign" className="h-full" />
      </div>
      <div className="absolute hidden md:block  right-0 top-0 bottom-0">
        <img src={AbstractDesign2} alt="AbstractDesign" className="h-full" />
      </div>
     
      <div className="relative z-10 flex py-10 min-h-[259px] flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-[38px] text-logoBlue mb-[10px]">
            Start Your Real Estate Journey Today
          </h2>
          <p>
            Your dream property is just a click away. Whether you’re looking for
            a new home, a strategic investment, or expert real estate advice,
            Propmetaverse is here to assist you every step of the way. Take the
            first step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized
            assistance.
          </p>
        </div>

        <div>
          <Link
            to={"/projects"}
            className="bg-logoColor hover:bg-logoColor/90 text-white font-[700] text-[20px] py-3 px-6 rounded-md transition"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RealEstateBanner;
