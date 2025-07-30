const OurValues = () => {
  return (
    <section className="w-full mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px] px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-12 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 2xl:gap-20 items-center justify-between bg-white">
      {/* Left Side: Text */}
      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[24vw]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
          Our Values
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base text-black font-medium leading-[150%]">
          Our story is one of continuous growth and evolution. We started as a
          small team with big dreams, determined to create a real estate
          platform that transcended the ordinary.
        </p>
      </div>

      {/* Right Side: Values Grid */}
      <div className="md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[70vw] w-full bg-[#BAD6EB] rounded-lg  p-4 sm:p-4 md:p-6 lg:p-8 xl:p-[50px] 2xl:p-[50px] flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:divide-x justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6 md:border-b pb-4 sm:pb-5 md:pb-6 lg:pb-6 xl:pb-6 2xl:pb-6">
          {/* Trust */}
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full md:w-1/2 md:pr-4 lg:pr-6 xl:pr-10 2xl:pr-10">
            <div className="bg-[#091F5B] text-white p-2 sm:p-3 md:p-[12px] lg:p-[16px] xl:p-[16px] 2xl:p-[16px] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 24 23"
                fill="none"
                className="size-4 sm:size-5 md:size-5 lg:size-6 xl:size-6 2xl:size-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5862 1.74594C11.1093 0.488334 12.8908 0.488333 13.4139 1.74594L15.8429 7.58594L22.1477 8.09139C23.5053 8.20023 24.0559 9.89457 23.0215 10.7807L18.2179 14.8954L19.6854 21.0478C20.0015 22.3727 18.5602 23.4198 17.3978 22.7099L12.0001 19.4129L6.60229 22.7099C5.43992 23.4198 3.99863 22.3727 4.31466 21.0478L5.78223 14.8954L0.978659 10.7807C-0.0557551 9.89458 0.494764 8.20023 1.85246 8.09139L8.15723 7.58594L10.5862 1.74594Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">Trust</h6>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mt-2 sm:mt-3 md:mt-[12px] lg:mt-[16px] xl:mt-[16px] 2xl:mt-[16px] text-black font-medium">
                Trust is the cornerstone of every successful real estate
                transaction.
              </p>
            </div>
          </div>

          {/* Excellence */}
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full md:w-1/2 md:pl-4 lg:pl-6 xl:pl-10 2xl:pl-10">
            <div className="bg-[#091F5B] text-white p-2 sm:p-3 md:p-[12px] lg:p-[16px] xl:p-[16px] 2xl:p-[16px] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 29 28"
                fill="none"
                className="size-4 sm:size-5 md:size-5 lg:size-6 xl:size-6 2xl:size-6"
              >
                <path
                  d="M14.15 3.2729C14.3734 3.17531 14.6273 3.17531 14.8507 3.2729C19.1893 5.16852 23.3012 7.48583 27.1347 10.1729C27.4121 10.3673 27.5524 10.7045 27.4947 11.0383C27.437 11.3721 27.1919 11.6427 26.8653 11.7328C26.0662 11.9534 25.274 12.191 24.489 12.4441C21.3028 13.4717 18.2356 14.7647 15.3136 16.297L15.3098 16.299C15.1773 16.3685 15.0451 16.4384 14.9132 16.5089C14.6556 16.6466 14.3462 16.6466 14.0885 16.5089C13.9554 16.4378 13.8219 16.3671 13.6881 16.297C12.2433 15.5393 10.7629 14.8401 9.25024 14.2026V13.9417C9.25024 13.7884 9.3289 13.6524 9.4506 13.5787C11.2066 12.5149 13.0179 11.5333 14.8791 10.6393C15.3147 10.4301 15.4982 9.90734 15.289 9.47173C15.0797 9.03613 14.557 8.85262 14.1214 9.06185C12.2089 9.98046 10.3479 10.989 8.54382 12.082C8.01488 12.4024 7.65929 12.9269 7.54233 13.5145C6.54492 13.1308 5.5344 12.7734 4.51158 12.4436C3.72662 12.1904 2.93442 11.9534 2.13538 11.7328C1.80881 11.6427 1.56361 11.3721 1.50596 11.0383C1.4483 10.7044 1.58854 10.3673 1.86596 10.1729C5.69944 7.48581 9.81138 5.16852 14.15 3.2729Z"
                  fill="white"
                />
                <path
                  d="M15.7379 18.0524C18.5833 16.5321 21.5727 15.2468 24.6804 14.2224C24.837 15.873 24.937 17.54 24.9784 19.2215C24.9873 19.5822 24.7738 19.9114 24.4408 20.0505C21.1144 21.4392 17.9505 23.1398 14.9855 25.1157C14.6917 25.3115 14.3089 25.3115 14.015 25.1157C11.05 23.1398 7.8861 21.4392 4.55977 20.0505C4.22676 19.9114 4.01327 19.5822 4.02215 19.2215C4.06358 17.5399 4.16359 15.8728 4.32023 14.222C5.39473 14.5762 6.45509 14.9616 7.50024 15.377V16.8592C6.97717 17.1618 6.62524 17.7273 6.62524 18.3751C6.62524 18.9529 6.90534 19.4654 7.33717 19.7841C7.23273 20.2281 7.07817 20.6627 6.87347 21.0788C7.40162 21.3281 7.92524 21.5853 8.44419 21.8505C8.73975 21.2494 8.95405 20.6184 9.08708 19.9742C9.69882 19.7015 10.1252 19.0881 10.1252 18.3751C10.1252 17.7273 9.77332 17.1618 9.25024 16.8592V16.107C10.6169 16.7041 11.9556 17.3534 13.2638 18.0524C14.0368 18.4654 14.9649 18.4654 15.7379 18.0524Z"
                  fill="white"
                />
                <path
                  d="M5.70617 22.7061C6.19516 22.2171 6.58444 21.6663 6.87347 21.0788C7.40162 21.3281 7.92524 21.5853 8.44419 21.8505C8.07255 22.6063 7.57216 23.315 6.94361 23.9435C6.6019 24.2852 6.04788 24.2852 5.70617 23.9435C5.36446 23.6018 5.36446 23.0478 5.70617 22.7061Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">Excellence</h6>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mt-2 sm:mt-3 md:mt-[12px] lg:mt-[16px] xl:mt-[16px] 2xl:mt-[16px] text-black font-medium">
                We set the bar high for ourselves. From the properties we list
                to the services we provide.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:divide-x justify-between gap-2  sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
          {/* Client-Centric */}
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full md:w-1/2 md:pr-4 lg:pr-6 xl:pr-10 2xl:pr-10">
            <div className="bg-[#091F5B] text-white p-2 sm:p-3 md:p-[12px] lg:p-[16px] xl:p-[16px] 2xl:p-[16px] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                className="size-4 sm:size-5 md:size-5 lg:size-6 xl:size-6 2xl:size-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.625 7.875C9.625 5.45875 11.5838 3.5 14 3.5C16.4162 3.5 18.375 5.45875 18.375 7.875C18.375 10.2912 16.4162 12.25 14 12.25C11.5838 12.25 9.625 10.2912 9.625 7.875Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.375 11.375C18.375 9.442 19.942 7.875 21.875 7.875C23.808 7.875 25.375 9.442 25.375 11.375C25.375 13.308 23.808 14.875 21.875 14.875C19.942 14.875 18.375 13.308 18.375 11.375Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.625 11.375C2.625 9.442 4.192 7.875 6.125 7.875C8.058 7.875 9.625 9.442 9.625 11.375C9.625 13.308 8.058 14.875 6.125 14.875C4.192 14.875 2.625 13.308 2.625 11.375Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.36151 17.6371C8.75914 15.4518 11.2097 14 14 14C16.7906 14 19.2415 15.4522 20.639 17.6379C21.6052 19.149 22.0232 20.9711 21.8271 22.7476C21.7965 23.0252 21.6351 23.2715 21.3929 23.4105C19.2143 24.6606 16.6893 25.375 14 25.375C11.3107 25.375 8.78569 24.6606 6.60712 23.4105C6.36486 23.2715 6.20351 23.0252 6.17287 22.7476C5.97676 20.9707 6.39498 19.1483 7.36151 17.6371Z"
                  fill="white"
                />
                <path
                  d="M5.92933 16.6293C5.91528 16.6509 5.90132 16.6725 5.88744 16.6942C4.76107 18.4554 4.24559 20.5528 4.40383 22.6205C3.69445 22.5128 3.00615 22.3394 2.3455 22.1068L2.21138 22.0595C1.96672 21.9734 1.79577 21.7512 1.77519 21.4926L1.76391 21.3509C1.75469 21.235 1.75 21.1179 1.75 21C1.75 18.6493 3.60389 16.7316 5.92933 16.6293Z"
                  fill="white"
                />
                <path
                  d="M23.5966 22.6204C23.7548 20.5532 23.2396 18.4562 22.1136 16.6952C22.0995 16.6732 22.0854 16.6512 22.0711 16.6293C24.3963 16.7319 26.25 18.6495 26.25 21C26.25 21.1179 26.2453 21.235 26.2361 21.3509L26.2248 21.4926C26.2042 21.7512 26.0333 21.9734 25.7886 22.0595L25.6545 22.1068C24.994 22.3394 24.3058 22.5127 23.5966 22.6204Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">Client-Centric</h6>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mt-2 sm:mt-3 md:mt-[12px] lg:mt-[16px] xl:mt-[16px] 2xl:mt-[16px] text-black font-medium">
                Your dreams and needs are at the center of our universe. We
                listen, understand.
              </p>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full md:w-1/2 md:pl-4 lg:pl-6 xl:pl-10 2xl:pl-10">
            <div className="bg-[#091F5B] text-white p-2 sm:p-3 md:p-[12px] lg:p-[16px] xl:p-[16px] 2xl:p-[16px] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 29 28"
                fill="none"
                className="size-4 sm:size-5 md:size-5 lg:size-6 xl:size-6 2xl:size-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0862 3.74594C13.6093 2.48833 15.3908 2.48833 15.9139 3.74594L18.3429 9.58594L24.6477 10.0914C26.0053 10.2002 26.5559 11.8946 25.5215 12.7807L20.7179 16.8954L22.1854 23.0478C22.5015 24.3727 21.0602 25.4198 19.8978 24.7099L14.5001 21.4129L9.10229 24.7099C7.93992 25.4198 6.49863 24.3727 6.81466 23.0478L8.28223 16.8954L3.47866 12.7807C2.44424 11.8946 2.99476 10.2002 4.35246 10.0914L10.6572 9.58594L13.0862 3.74594Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">Our Commitment</h6>
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base mt-2 sm:mt-3 md:mt-[12px] lg:mt-[16px] xl:mt-[16px] 2xl:mt-[16px] text-black font-medium">
                We are dedicated to providing you with the highest level of
                service, professionalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;