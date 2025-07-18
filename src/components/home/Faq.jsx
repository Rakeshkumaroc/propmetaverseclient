import { useRef, useState } from "react"; 
import Slider from "react-slick";

const testimonials = [
  {
    title: "How do I search for properties on PropMetaVerse?",
    message:
      "Learn how to use our user-friendly search tools to find properties that match your criteria.",
  },
  {
    title: "What documents do I need to sell my property through PropMetaVerse?",
    message:
      "Find out about the necessary documentation for listing your property with us.",
  },
  {
    title: "How can I contact a PropMetaVerse agent?",
    message:
      "Discover the different ways you can get in touch with our experienced agents.",
  },
  {
    title: "What are the benefits of using PropMetaVerse for property investment?",
    message:
      "Explore the advantages of our platform, including market insights and investment opportunities.",
  },
];

const Faq = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState(testimonials);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "slick-slider-custom",
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
  return (
    <section className="w-full md:py-12 px-4 sm:px-6 overflow-hidden md:px-20 mx-auto   max-w-[1920px] mb-[93px]">
      <h2 className="text-2xl sm:text-3xl md:text-[38px] text-logoBlue mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-sm sm:text-base mb-8 md:mb-[47px]">
        Find answers to common questions about Propmetaverse services, property
        listings, and the real estate process. We're here to provide clarity and
        assist you every step of the way.
      </p>

      <Slider ref={sliderRef} {...sliderSettings}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#BAD6EB] p-[40px] rounded-[10px] border-[1px] border-[#262626]  shadow-sm"
          >
           
          
              {/* Title */}
              <div className="flex flex-col gap-[24px]">
              <h3 style={{ color: "#091F5B" }} className="text-[20px]    ">
                {t.title}
              </h3>

              {/* Message */}
              <p className="text-[#091F5B]  ">{t.message}</p>
              </div>
            
          
            
          </div>
        ))}
      </Slider>

      {/* Footer with navigation */}
      <div className="  sm:mt-10 flex justify-between items-center text-sm   mt-10 border-t pt-4">
        <span>
          {String(currentSlide + 1).padStart(2, "0")} of{" "}
          {String(testimonials.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2 justify-end  items-center">
          <div
            onClick={handlePrev}
            className="p-2 size-10 sm:size-[44px] rounded-full border border-gray-300 cursor-pointer"
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
          <div
            onClick={handleNext}
            className="p-2 size-10 sm:size-[44px] rounded-full bg-logoBlue cursor-pointer"
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
    </section>
  );
};

export default Faq;
