import { useRef, useState } from "react";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Rakesh Kumar",
    location: "Delhi, India",
    title: "Exceptional Service!",
    message:
      "Our experience with Propmetaverse was outstanding. Their team’s dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Sakshi Shrivastava",
    location: "Bangalore, India",
    title: "Efficient and Reliable",
    message:
      "Propmetaverse provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Priyanshu",
    location: "Bihar, India",
    title: "Trusted Advisors",
    message:
      "The Propmetaverse team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Priyanshu",
    location: "Bihar, India",
    title: "Trusted Advisors",
    message:
      "The Propmetaverse team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Priyanshu",
    location: "Bihar, India",
    title: "Trusted Advisors",
    message:
      "The Propmetaverse team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

const Testimonials = () => {
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
        What Our Clients Say
      </h2>
      <p className="text-sm sm:text-base mb-8 md:mb-[47px]">
        Read the success stories and heartfelt testimonials from our valued
        clients. Discover why they chose Estatein for their real estate needs.
      </p>

      <Slider ref={sliderRef} {...sliderSettings}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#BAD6EB] p-[40px] rounded-[10px] border-[1px] border-[#262626] flex flex-col gap-[30px] shadow-sm"
          >
            {/* Stars */}
            <div className="flex mb-4 space-x-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-black rounded-full p-[8px_9px] flex gap-[10px] items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M8.15861 1.30996C8.55219 0.697193 9.44781 0.697195 9.84139 1.30996L12.1986 4.97987C12.334 5.19071 12.5436 5.34302 12.786 5.40666L17.0047 6.51442C17.7091 6.69938 17.9859 7.55117 17.5247 8.11484L14.7628 11.4907C14.6042 11.6847 14.5241 11.9311 14.5385 12.1813L14.7886 16.5358C14.8303 17.2629 14.1058 17.7893 13.4272 17.5249L9.36304 15.9415C9.12956 15.8505 8.87044 15.8505 8.63696 15.9415L4.57282 17.5249C3.89423 17.7893 3.16966 17.2629 3.21142 16.5358L3.46153 12.1813C3.4759 11.9311 3.39582 11.6847 3.23716 11.4907L0.475274 8.11484C0.0141246 7.55117 0.290888 6.69938 0.995283 6.51442L5.21399 5.40666C5.45636 5.34302 5.66599 5.19071 5.80141 4.97987L8.15861 1.30996Z"
                        fill="#FFE600"
                      />
                    </svg>
                  </div>
                ))}
            </div>
            <div>
              {/* Title */}
              <h3 style={{ color: "#091F5B" }} className="text-[20px]   mb-2">
                {t.title}
              </h3>

              {/* Message */}
              <p className="text-[#091F5B] mb-4">{t.message}</p>
            </div>
            {/* Profile */}
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-[18px] text-[#091F5B]">
                  {t.name}
                </p>
                <p className=" text-black">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Footer with navigation */}
      <div className="  sm:mt-10 flex justify-between items-center text-sm   mt-10 border-t pt-4">
        <span>
          {String(currentSlide + 1).padStart(2, "0")} of{" "}
          {String(filteredProperties.length).padStart(2, "0")}
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

export default Testimonials;
