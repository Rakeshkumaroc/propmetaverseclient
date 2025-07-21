
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactCardGrid = () => {
  return (
   <div className="mt-4 md:pl-12 md:pr-12 px-3 md:px-0 mb-16">
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
  )
}

export default ContactCardGrid