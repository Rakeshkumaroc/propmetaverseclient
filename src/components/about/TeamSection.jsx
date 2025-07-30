import Team1 from "../../assets/Teams/team1.png";
import Team2 from "../../assets/Teams/team2.png";
import Team3 from "../../assets/Teams/team3.png";
import Team4 from "../../assets/Teams/team4.png";

const teamMembers = [
  {
    name: "Abhishek Sinha",
    role: "Founder",
    image: Team1,
  },
  {
    name: "Sarah Johnson",
    role: "Chief Real Estate Officer",
    image: Team2,
  },
  {
    name: "David Brown",
    role: "Head of Property Management",
    image: Team3,
  },
  {
    name: "Michael Turner",
    role: "Legal Counsel",
    image: Team4,
  },
];

const TeamSection = () => {
  return (
    <section className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-12 2xl:py-12 bg-white mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-[60px] 2xl:mb-[93px]">
      {/* Title & Description */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-12 2xl:mb-12">
       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] 2xl:text-[38px] font-bold text-logoBlue mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
          Meet the Propmetaverse Team
        </h2>
        <p className="text-black text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-medium leading-[150%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-3xl line-clamp-3">
          At Propmetaverse, our success is driven by the dedication and expertise of our team. Get to know the passionate professionals working to make your real estate dreams a reality.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white border border-black/10 rounded-[12px] shadow-sm p-4 sm:p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-6 flex flex-col items-center text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[240px] object-cover rounded-lg mb-4 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-8 2xl:mb-8"
            />
            <h5 className="text-logoBlue font-bold text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-[20px] 2xl:text-[20px] mb-1 sm:mb-1 md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1">
              {member.name}
            </h5>
            <p className="text-black line-clamp-2 font-medium text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4">
              {member.role}
            </p>
            <div className="bg-logoBlue rounded-full text-white font-medium w-full flex items-center justify-between px-3 sm:px-4 md:px-4 lg:px-4 xl:px-4 2xl:px-4 py-1 sm:py-2 md:py-2 lg:py-2 xl:py-2 2xl:py-2">
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">Say Hello 👋</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 35 35"
                fill="none"
                className="size-5 sm:size-6 md:size-6 lg:size-7 xl:size-7 2xl:size-7"
              >
                <path
                  d="M17.5013 2.9165C25.5557 2.9165 32.0847 9.44546 32.0847 17.4998C32.0847 25.5542 25.5557 32.0832 17.5013 32.0832C14.9241 32.0876 12.3922 31.4056 10.1659 30.1071L2.92382 32.0832L4.89549 24.8382C3.59606 22.6112 2.91347 20.0782 2.91799 17.4998C2.91799 9.44546 9.44695 2.9165 17.5013 2.9165Z"
                  fill="#BAD6EB"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;