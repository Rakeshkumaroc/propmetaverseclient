const Header = ({title,para}) => {
  return (
    <div className=" mt-[70px]  xl:mt-[120px] 2xl:mt-[160px]">
      {/* Header Text */}
      <div className="md:py-30 py-10 px-3 md:px-0 mt-1 text-[#000] bg-gradient-to-r from-[#74aedd] via-[#f9f9f9] to-white">
        <div className="md:pl-[80px] md:pr-[200px]">
          <h2 className="text-[24px] md:text-[40px] font-semibold">
            {title}
          </h2>
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
