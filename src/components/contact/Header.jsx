import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Header = () => {
  return (
    <div className="pb-16 mt-[70px]  xl:mt-[120px] 2xl:mt-[160px]">
      {/* Header Text */}
      <div className="py-30 px-3 md:px-0 mt-1 text-[#000] bg-gradient-to-r from-[#74aedd] via-[#f9f9f9] to-white">
        <div className="md:pl-[80px] md:pr-[200px]">
          <h1 className="text-[25px] md:text-[40px] font-semibold">
            Get in Touch with Propmetaverse
          </h1>
          <p className="mt-4 md:text-[18px] leading-relaxed text-black font-medium">
            Welcome to Propmetaverse Contact Us page. We’re here to assist you
            with any inquiries, requests, or feedback you may have. Whether
            you’re looking to buy or sell a property, explore investment
            opportunities, or simply want to connect, we’re just a message away.
            Reach out to us, and let’s start a conversation.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="mt-14 md:pl-12 md:pr-12 px-3 md:px-0">
        <div className="grid md:grid-cols-4 gap-4 md:text-xl">
          {/* Email Card */}
          <div className="md:h-[160px] h-[120px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-2 border border-[#262626]">
            <Mail className="text-black" />
            <a
              href="mailto:info@propmetaverse.com"
              className="text-sm md:text-base text-black font-medium tracking-wide no-underline hover:no-underline"
            >
              info@propmetaverse.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="md:h-[160px] h-[120px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-2 border border-[#262626]">
            <Phone className="text-black" />
            <a
              href="tel:+11234567890"
              className="text-sm md:text-base text-black font-medium tracking-wide no-underline hover:no-underline"
            >
              +1 (123) 456-7890
            </a>
          </div>

          {/* Location Card */}
          <div className="md:h-[160px] h-[120px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-2 border border-[#262626]">
            <MapPin className="text-black" />
            <p className="text-sm md:text-base text-black font-medium tracking-wide">
              Main Headquarters
            </p>
          </div>

          {/* Social Links */}
          <div className="md:h-[160px] h-[120px] rounded-md bg-[#BAD6EB] flex justify-center items-center flex-col gap-3 border border-[#262626]">
            <Clock className="text-black" />
            <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-black font-medium tracking-wide">
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
    </div>
  );
};

export default Header;
