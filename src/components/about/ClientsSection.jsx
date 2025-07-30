import { useRef, useState } from "react";
import Slider from "react-slick"; 

const clients = [
  {
    since: "Since 2019",
    name: "ABC Corporation",
    domain: "Commercial Real Estate",
    category: "Luxury Home Development",
    feedback:
      "Propmetaverse expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    since: "Since 2018",
    name: "GreenTech Enterprises",
    domain: "Commercial Real Estate",
    category: "Retail Space",
    feedback:
      "Propmetaverse ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
  },
  {
    since: "Since 2019",
    name: "ABC Corporation",
    domain: "Commercial Real Estate",
    category: "Luxury Home Development",
    feedback:
      "Propmetaverse expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    since: "Since 2018",
    name: "GreenTech Enterprises",
    domain: "Commercial Real Estate",
    category: "Retail Space",
    feedback:
      "Propmetaverse ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
  } 
];

const ClientsSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "slick-slider-custom",
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280,
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
      {
        breakpoint: 640,
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
    <section className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-12 2xl:py-12 overflow-hidden mx-auto max-w-[1920px] mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px]">
      {/* Title and Description */}
      <div className="mb-6 sm:mb-8 md:mb-8 lg:mb-10 xl:mb-10 2xl:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
          Our Valued Clients
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base text-black font-medium leading-[150%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-3xl line-clamp-3">
          At Propmetaverse, we have had the privilege of working with a diverse
          range of clients across various industries. Here are some of the
          clients we've had the pleasure of serving.
        </p>
      </div>

      {/* Clients Slider */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {clients.map((client, index) => (
          <div key={index} className="pr-2 sm:pr-3 md:pr-4 lg:pr-5 xl:pr-5 2xl:pr-5">
            <div className="bg-[#BAD6EB] border border-black/30 rounded-xl p-4 sm:p-3 md:p-4 lg:p-6 xl:p-[40px] 2xl:p-[40px] flex flex-col justify-between">
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
                <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base text-black font-medium mb-1 sm:mb-1 md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1">
                  {client.since}
                </p>
                <h5 className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[24px] 2xl:text-[24px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-[30px] 2xl:mb-[30px]">
                  {client.name}
                </h5>
                <div className="flex flex-col sm:flex-row sm:items-center divide-x sm:gap-3 md:gap-4 lg:gap-6 xl:gap-[40px] 2xl:gap-[40px] text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium text-black mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-6 2xl:mb-6">
                  <div className="pr-0 sm:pr-3 md:pr-4 lg:pr-6 xl:pr-[40px] 2xl:pr-[40px]">
                    <p className="text-logoBlue mb-1 flex items-center gap-1 text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 20 21"
                        fill="none"
                        className="size-3 sm:size-4 md:size-4 lg:size-5 xl:size-5 2xl:size-5"
                      >
                        <path
                          d="M3.125 5.5C3.125 4.46447 3.96447 3.625 5 3.625H6.875C7.91053 3.625 8.75 4.46447 8.75 5.5V7.375C8.75 8.41053 7.91053 9.25 6.875 9.25H5C3.96447 9.25 3.125 8.41053 3.125 7.375V5.5Z"
                          stroke="#1865A4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.125 13.625C3.125 12.5895 3.96447 11.75 5 11.75H6.875C7.91053 11.75 8.75 12.5895 8.75 13.625V15.5C8.75 16.5355 7.91053 17.375 6.875 17.375H5C3.96447 17.375 3.125 16.5355 3.125 15.5V13.625Z"
                          stroke="#1865A4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.25 5.5C11.25 4.46447 12.0895 3.625 13.125 3.625H15C16.0355 3.625 16.875 4.46447 16.875 5.5V7.375C16.875 8.41053 16.0355 9.25 15 9.25H13.125C12.0895 9.25 11.25 8.41053 11.25 7.375V5.5Z"
                          stroke="#1865A4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.25 13.625C11.25 12.5895 12.0895 11.75 13.125 11.75H15C16.0355 11.75 16.875 12.5895 16.875 13.625V15.5C16.875 16.5355 16.0355 17.375 15 17.375H13.125C12.0895 17.375 11.25 16.5355 11.25 15.5V13.625Z"
                          stroke="#1865A4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>{" "}
                      Domain
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">{client.domain}</p>
                  </div>
                  <div>
                    <p className="text-logoBlue mb-1 flex items-center gap-1 text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 21 21"
                        fill="none"
                        className="size-3 sm:size-4 md:size-4 lg:size-5 xl:size-5 2xl:size-5"
                      >
                        <path
                          d="M3.875 11.75L12.625 2.375L10.75 9.25H17.625L8.875 18.625L10.75 11.75H3.875Z"
                          stroke="#1865A4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>{" "}
                      Category
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">{client.category}</p>
                  </div>
                </div>

                <div className="bg-[#BAD6EB] border border-black/30 rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 xl:p-[24px] 2xl:p-[24px] text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                  <p className="font-semibold text-logoBlue mb-1 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
                    What They Said 🤗
                  </p>
                  <p className="text-black leading-[150%] line-clamp-2">{client.feedback}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation */}
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10 2xl:mt-10 flex justify-between items-center text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base border-t pt-2 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-4 2xl:pt-4">
        <span>
          {String(currentSlide + 1).padStart(2, "0")} of{" "}
          {String(clients.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 justify-end items-center">
          <div
            onClick={handlePrev}
            className="p-1 sm:p-2 size-8 sm:size-10 md:size-[44px] lg:size-[44px] xl:size-[44px] 2xl:size-[44px] rounded-full border border-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6"
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
            className="p-1 sm:p-2 size-8 sm:size-10 md:size-[44px] lg:size-[44px] xl:size-[44px] 2xl:size-[44px] rounded-full bg-logoBlue cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-white size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6"
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

export default ClientsSection;