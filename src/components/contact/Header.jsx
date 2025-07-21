 

const Header = ({title,para}) => {
  return (
    <div className=" mt-[70px]  xl:mt-[120px] 2xl:mt-[160px]">
      {/* Header Text */}
      <div className="py-30 px-3 md:px-0 mt-1 text-[#000] bg-gradient-to-r from-[#74aedd] via-[#f9f9f9] to-white">
        <div className="md:pl-[80px] md:pr-[200px]">
          <h1 className="text-[25px] md:text-[40px] font-semibold">
            {title}
          </h1>
          <p className="mt-4 md:text-[18px] leading-relaxed text-black font-medium">
           {para}
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
    </div>
  );
};

export default Header;
