import HandImage from "../../assets/about/hand.png";
const OurJourney = () => {
  return (
    <div className="w-full relative mb-[93px]">
      <section className="w-full   md:py-12 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2  items-center justify-between  gap-8">
        {/* Left Section - Text & Buttons */}
        <div className="md:w-[610px] w-full">
          <div className="w-full flex flex-col items-start gap-[10px] md:gap-[20px]">
            <h1 className="text-3xl md:text-[46px] "> Our Journey</h1>
            <p className="text-gray-600 mt-4 ">
              {" "}
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary. Over the years, we’ve
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </p>
          </div>

          {/* Stats */}
          <div className="md:mt-[89px] mt-[29px] flex gap-4 flex-wrap">
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">200+</p>
              <p className="">Happy Customers</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">10k+</p>
              <p className="">Properties For Clients</p>
            </div>
            <div className="bg-logoBlue space-y-[2px] text-white rounded-[10px]  p-[14px_20px] w-full md:w-[192.6667px]   text-start">
              <p className="text-[30px] font-[700]">3+</p>
              <p className="">Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-[817px] h-[500px] rounded-xl   bg-black hidden md:flex justify-end items-end     ">
          <img
            src={HandImage} // Replace with your actual image path
            alt="House in hand"
            className="w-full h-full object-cover"
          />
        </div>

        {/* <div className="flex-1 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg w-[435px]  bg-black p-4">
            <img
              src={HouseImage}
              alt="House in hand"
              className="rounded-md w-full object-cover"
            />
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default OurJourney;
