 
const SkeletonTrendingProjectCard = () => (
  <div className="card-container bg-[#BAD6EB] rounded-[12px] border-[1px] border-[#091F5B] shadow-md p-2 md:mr-5 sm:p-4 md:p-6 lg:p-6 xl:p-6 2xl:p-[30px]">
    {/* Image Placeholder */}
    <div className="relative w-full h-[150px] sm:h-[200px] md:h-[255px] lg:h-[255px] xl:h-[255px] 2xl:h-[255px] bg-gray-300 rounded-md overflow-hidden mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 animate-pulse">
      <div
        className="absolute top-2 sm:top-3 md:top-4 lg:top-4 xl:top-4 2xl:top-4 left-2 sm:left-3 md:left-4 lg:left-4 xl:left-4 2xl:left-4 bg-gray-400 h-6 w-20 rounded"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      ></div>
    </div>
    <div className="flex flex-col flex-grow">
      <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-[11px]">
        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 sm:mb-0 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="flex justify-end items-center gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-7 mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2 text-green-700">
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Tags */}
    <div className="my-2 sm:my-3 md:my-4 lg:my-5 xl:my-6 2xl:my-[31px] flex flex-wrap gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-24 animate-pulse"></div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-28 animate-pulse"></div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-3 2xl:px-3 py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1 2xl:py-1 rounded-full flex items-center gap-1 h-6 w-20 animate-pulse"></div>
    </div>

    <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 2xl:mt-4 flex flex-col flex-wrap sm:flex-row sm:justify-between sm:items-center">
      <div className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-sm text-[#000] mb-2 sm:mb-0">
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mt-1 animate-pulse"></div>
      </div>
      <div className="bg-gray-400 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 2xl:px-4 py-1 sm:py-2 md:py-2 lg:py-2 xl:py-2 2xl:py-2 rounded-md h-9 w-36 animate-pulse"></div>
    </div>
  </div>
);

export default SkeletonTrendingProjectCard