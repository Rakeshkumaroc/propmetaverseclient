import { Mail, Phone, MapPin } from "lucide-react";

const OfficeCard = ({ type, address, description, email, phone, city }) => {
  return (
    <div className="flex flex-col items-start gap-[30px] w-full md:w-[675px] p-[30px] md:p-[40px] bg-[#BAD6EB] border border-[#262626] rounded-[8px]">
      <div>
        <p className="text-sm text-[#4B4B4B]">{type}</p>
        <h3 className="text-[#1865A4] text-[16px] md:text-[18px] font-semibold leading-snug mt-1">
          {address}
        </h3>
      </div>

      <p className="text-[14px] text-black leading-snug">{description}</p>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-[#091F5B] text-white text-sm px-3 py-2 rounded-md">
          <Mail size={16} /> {email}
        </div>

        <div className="flex items-center gap-2 bg-[#091F5B] text-white text-sm px-3 py-2 rounded-md">
          <Phone size={16} /> {phone}
        </div>

        <div className="flex items-center gap-2 bg-[#091F5B] text-white text-sm px-3 py-2 rounded-md">
          <MapPin size={16} /> {city}
        </div>
      </div>

      <button className="bg-[#65b137] text-white font-semibold text-sm px-6 py-2 rounded-md">
        Get Direction
      </button>
    </div>
  );
};

export default OfficeCard;
