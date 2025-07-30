import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactCardGrid = () => {
  return (
    <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 2xl:mt-4   mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-20 2xl:mb-16 px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-20 mx-auto max-w-[1920px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-xl">
        {/* Email Card */}
        <div className="h-[100px] sm:h-[110px] md:h-[120px] lg:h-[140px] xl:h-[160px] 2xl:h-[160px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 border border-[#262626] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
          <Mail className="text-black size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6" />
          <a
            href="mailto:info@propmetaverse.com"
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base text-black font-medium tracking-wide no-underline hover:no-underline"
          >
            info@propmetaverse.com
          </a>
        </div>

        {/* Phone Card */}
        <div className="h-[100px] sm:h-[110px] md:h-[120px] lg:h-[140px] xl:h-[160px] 2xl:h-[160px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 border border-[#262626] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
          <Phone className="text-black size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6" />
          <a
            href="tel:+11234567890"
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base text-black font-medium tracking-wide no-underline hover:no-underline"
          >
            +1 (123) 456-7890
          </a>
        </div>

        {/* Location Card */}
        <div className="h-[100px] sm:h-[110px] md:h-[120px] lg:h-[140px] xl:h-[160px] 2xl:h-[160px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 border border-[#262626] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
          <MapPin className="text-black size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6" />
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base text-black font-medium tracking-wide">
            Main Headquarters
          </p>
        </div>

        {/* Social Links */}
        <div className="h-[100px] sm:h-[110px] md:h-[120px] lg:h-[140px] xl:h-[160px] 2xl:h-[160px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3 border border-[#262626] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
          <Clock className="text-black size-4 sm:size-5 md:size-6 lg:size-6 xl:size-6 2xl:size-6" />
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3 text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base text-black font-medium tracking-wide">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:no-underline"
            >
              LinkedIn
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:no-underline"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:no-underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCardGrid;