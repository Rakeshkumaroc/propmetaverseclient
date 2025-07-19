// src/components/RealEstateBanner.jsx

const RealEstateBanner = () => {
  return (
    <section className="w-full bg-[url('/your-bg-image.png')] bg-cover bg-center bg-no-repeat py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Text */}
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-4xl font-semibold text-blue-800 mb-4">
            Start Your Real Estate Journey Today
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, 
            or expert real estate advice, Promptverse is here to assist you every step of the way. Take the first step 
            towards your real estate goals and explore our available properties or get in touch with our team for 
            personalized assistance.
          </p>
        </div>

        {/* Right Button */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition">
            Explore Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default RealEstateBanner;
