 
import   { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FAQSlider = ({ faqs }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for larger screens (lg and up, including 2xl)
    slidesToScroll: 1,
    className: "slick-slider-custom",
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280, // For screens smaller than 2xl (e.g., xl)
        settings: {
          slidesToShow: 3, // Maintain 3 slides for xl
        },
      },
      {
        breakpoint: 1024, // For screens smaller than lg (e.g., md, lg)
        settings: {
          slidesToShow: 2, // Show 2 slides for md and lg
        },
      },
      {
        breakpoint: 768, // For screens smaller than md (e.g., sm)
        settings: {
          slidesToShow: 1, // Show 1 slide for sm
        },
      },
      {
        breakpoint: 640, // For screens smaller than sm (e.g., mobile)
        settings: {
          slidesToShow: 1, // Show 1 slide for mobile
        },
      },
    ],
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Check if faqs is an array and has more than 3 items to show slider
  // This condition should ideally be based on the largest slidesToShow setting (3 for 2xl)
  const showSlider = Array.isArray(faqs) && faqs.length > 3;

  return (
    // Main container for the FAQ section
    // Responsive padding and margin-bottom applied
    <div className="w-full   mb-16 sm:mb-20 md:mb-24 lg:mb-28 2xl:mb-[135px]">
      {/* FAQ section title */}
      {/* Responsive font size and margin-bottom applied */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[32px] font-semibold mb-4 sm:mb-5 2xl:mb-6 text-gray-800">
        Frequently Asked Questions
      </h3>
      {/* Descriptive text for the FAQ section */}
      {/* Responsive font size and margin-bottom applied */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-5 2xl:mb-6 max-w-full md:max-w-xl 2xl:max-w-2xl">
        Find answers to common questions about Propmetaverse services, property
        listings, and the real estate process. We're here to provide clarity and
        assist you every step of the way.
      </p>

      {showSlider ? (
        <>
          {/* Slider for FAQs if there are more than 3 items */}
          <Slider ref={sliderRef} {...settings}>
            {faqs.map((faq, index) => (
              <div key={index} className="px-2 sm:px-3 md:px-4 2xl:px-2"> {/* Responsive horizontal padding for slider items */}
                <div className="border border-blue-300 bg-[#BAD6EB] p-6 sm:p-8 md:p-10 2xl:p-[40px] h-full rounded-lg shadow-sm"> {/* Responsive padding and rounded corners */}
                  <h3 className="text-lg sm:text-xl md:text-2xl 2xl:text-[20px] font-semibold text-logoBlue mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation controls for the slider */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex justify-between items-center text-xs sm:text-sm md:text-base border-t pt-3 sm:pt-4">
            <span>
              {String(currentSlide + 1).padStart(2, "0")} of{" "}
              {String(faqs.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2 justify-end items-center">
              {/* Previous button */}
              <div
                onClick={handlePrev}
                className="p-2 size-8 sm:size-10 2xl:size-[44px] rounded-full border border-gray-300 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-gray-100"
                aria-label="Previous FAQ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.4004 11.9998C20.4004 12.4969 19.9974 12.8998 19.5004 12.8998L6.73489 12.8998L11.7242 17.6511C12.0825 17.9956 12.0937 18.5653 11.7491 18.9236C11.4046 19.2819 10.8349 19.2931 10.4766 18.9486L3.87659 12.6486C3.70012 12.4789 3.60039 12.2446 3.60039 11.9998C3.60039 11.755 3.70012 11.5207 3.87659 11.3511L10.4766 5.05106C10.8349 4.70654 11.4046 4.71771 11.7491 5.07601C12.0937 5.4343 12.0825 6.00404 11.7242 6.34856L6.73489 11.0998L19.5004 11.0998C19.9974 11.0998 20.4004 11.5027 20.4004 11.9998Z"
                    fill="#808080"
                  />
                </svg>
              </div>
              {/* Next button */}
              <div
                onClick={handleNext}
                className="p-2 size-8 sm:size-10 2xl:size-[44px] rounded-full bg-logoBlue cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="Next FAQ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-white"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.59961 12.0002C3.59961 11.5031 4.00255 11.1002 4.49961 11.1002L17.2651 11.1002L12.2758 6.34894C11.9175 6.00443 11.9063 5.43469 12.2509 5.0764C12.5954 4.7181 13.1651 4.70693 13.5234 5.05144L20.1234 11.3514C20.2999 11.5211 20.3996 11.7554 20.3996 12.0002C20.3996 12.245 20.2999 12.4793 20.1234 12.6489L13.5234 18.9489C13.1651 19.2935 12.5954 19.2823 12.2509 18.924C11.9063 18.5657 11.9175 17.996 12.2758 17.6514L17.2651 12.9002L4.49961 12.9002C4.00255 12.9002 3.59961 12.4973 3.59961 12.0002Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Grid layout for FAQs if there are 3 or fewer items
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-4"> {/* Responsive gap */}
          {faqs.map((faq, index) => (
            <div key={index} className="px-2 sm:px-3 md:px-4 2xl:px-2"> {/* Responsive horizontal padding */}
              <div className="border border-blue-300 bg-[#BAD6EB] p-6 sm:p-8 md:p-10 2xl:p-[40px] h-full rounded-lg shadow-sm"> {/* Responsive padding and rounded corners */}
                <h3 className="text-lg sm:text-xl md:text-2xl 2xl:text-[20px] font-semibold text-logoBlue mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQSlider;
