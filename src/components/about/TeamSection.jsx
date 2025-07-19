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
    <section className="w-full px-2 sm:px-4 md:px-10 lg:px-24 py-8 sm:py-10 md:py-12 bg-white mb-[93px] sm:mb-[60px]">
      {/* Title and Description */}
      <div className="mb-8 sm:mb-10 md:mb-10">
        <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-bold text-logoBlue mb-4">
          Meet the Propmetaverse Team
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-black font-medium leading-[150%] max-w-3xl">
          At Propmetaverse, our success is driven by the dedication and
          expertise of our team. Get to know the passionate professionals
          working to make your real estate dreams a reality.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white border border-black/10 rounded-[12px] shadow-sm p-3 sm:p-4 md:p-[24px] flex flex-col items-center text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[200px]  md:h-[220px] lg:h-[240px] object-cover rounded-lg mb-6 sm:mb-8 md:mb-[50px]"
            />
            <h5 className="text-logoBlue font-bold text-base sm:text-lg md:text-[20px] mb-1">
              {member.name}
            </h5>
            <p className="text-black text-xs sm:text-sm md:text-base font-medium mb-4 sm:mb-5 md:mb-[20px]">
              {member.role}
            </p>
            <div className="bg-logoBlue rounded-full font-[500] leading-[28px] text-white w-full flex gap-4 sm:gap-6 md:gap-10 p-[8px_8px_8px_16px] sm:p-[10px_10px_10px_20px] items-center justify-between">
              <span className="text-xs sm:text-sm md:text-base">
                Say Hello 👋
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M17.5013 2.9165C25.5557 2.9165 32.0847 9.44546 32.0847 17.4998C32.0847 25.5542 25.5557 32.0832 17.5013 32.0832C14.9241 32.0876 12.3922 31.4056 10.1659 30.1071L2.92382 32.0832L4.89549 24.8382C3.59606 22.6112 2.91347 20.0782 2.91799 17.4998C2.91799 9.44546 9.44695 2.9165 17.5013 2.9165ZM12.5313 10.6457L12.2397 10.6573C12.0511 10.6703 11.8668 10.7199 11.6972 10.8032C11.539 10.8929 11.3946 11.0049 11.2684 11.1357C11.0934 11.3005 10.9942 11.4434 10.8878 11.5819C10.3484 12.2832 10.058 13.1443 10.0624 14.029C10.0653 14.7436 10.2519 15.4392 10.5436 16.0896C11.1401 17.405 12.1215 18.7978 13.4165 20.0884C13.7286 20.399 14.0349 20.7111 14.3645 21.0013C15.9736 22.4179 17.8911 23.4396 19.9645 23.985L20.7928 24.1119C21.0626 24.1265 21.3324 24.1061 21.6036 24.093C22.0283 24.0706 22.4429 23.9556 22.8184 23.7561C23.0092 23.6574 23.1956 23.5504 23.377 23.4353C23.377 23.4353 23.4387 23.3934 23.5592 23.304C23.7561 23.1582 23.8772 23.0546 24.0405 22.884C24.163 22.7576 24.2651 22.6108 24.3467 22.4436C24.4605 22.2059 24.5742 21.7523 24.6209 21.3746C24.6559 21.0859 24.6457 20.9284 24.6413 20.8307C24.6355 20.6746 24.5057 20.5128 24.3642 20.4442L23.5155 20.0636C23.5155 20.0636 22.2467 19.5109 21.4709 19.158C21.3897 19.1226 21.3027 19.1023 21.2142 19.0982C21.1145 19.0877 21.0136 19.0989 20.9185 19.1308C20.8234 19.1628 20.7362 19.2148 20.663 19.2834C20.6557 19.2805 20.558 19.3636 19.5036 20.6411C19.4431 20.7224 19.3597 20.7839 19.2642 20.8176C19.1686 20.8514 19.0651 20.8559 18.9669 20.8307C18.8719 20.8053 18.7788 20.7732 18.6884 20.7344C18.5076 20.6586 18.4449 20.6294 18.3209 20.5769C17.4836 20.2122 16.7086 19.7187 16.024 19.1142C15.8403 18.9538 15.6697 18.7788 15.4947 18.6096C14.921 18.0601 14.421 17.4386 14.0072 16.7605L13.9211 16.6219C13.8602 16.5283 13.8103 16.428 13.7724 16.323C13.717 16.1086 13.8613 15.9365 13.8613 15.9365C13.8613 15.9365 14.2157 15.5486 14.3805 15.3386C14.5409 15.1344 14.6765 14.9361 14.764 14.7946C14.9361 14.5175 14.9901 14.2332 14.8997 14.013C14.4913 13.0155 14.0694 12.0233 13.6338 11.0365C13.5478 10.8411 13.2926 10.7011 13.0607 10.6734C12.9819 10.6637 12.9032 10.6559 12.8244 10.65C12.6286 10.6388 12.4323 10.6408 12.2367 10.6559L12.5313 10.6457Z"
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

// import Team1 from "../../assets/Teams/team1.png"
// import Team2 from "../../assets/Teams/team2.png"
// import Team3 from "../../assets/Teams/team3.png"
// import Team4 from "../../assets/Teams/team4.png"

// const teamMembers = [
//   {
//     name: "Abhishek Sinha",
//     role: "Founder",
//     image: Team1,
//   },
//   {
//     name: "Sarah Johnson",
//     role: "Chief Real Estate Officer",
//     image: Team2,
//   },
//   {
//     name: "David Brown",
//     role: "Head of Property Management",
//     image: Team3,
//   },
//   {
//     name: "Michael Turner",
//     role: "Legal Counsel",
//     image: Team4,
//   },
// ];

// const TeamSection = () => {
//   return (
//     <section className="w-full px-4 md:px-10 lg:px-24 py-12 bg-white mb-[93px] sm:mb-[60px]">
//       {/* Title and Description */}
//       <div className="mb-10">
//         <h2 className="text-[32px] md:text-[38px] font-bold text-logoBlue mb-4">
//           Meet the Propmetaverse Team
//         </h2>
//         <p className="text-base text-black font-medium leading-[150%] max-w-3xl">
//           At Propmetaverse, our success is driven by the dedication and
//           expertise of our team. Get to know the passionate professionals
//           working to make your real estate dreams a reality.
//         </p>
//       </div>

//       {/* Team Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {teamMembers.map((member, index) => (
//           <div
//             key={index}
//             className="bg-white border border-black/10 rounded-[12px] shadow-sm p-[24px] flex flex-col items-center text-center"
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-full h-[240px] object-cover rounded-lg mb-[50px]"
//             />
//             <h5 className="text-logoBlue font-bold text-[18px] sm:text-[20px] mb-1">
//               {member.name}
//             </h5>
//             <p className="text-black text-sm sm:text-base font-medium mb-[20px]">
//               {member.role}
//             </p>
//             <div className="bg-logoBlue rounded-full font-[500] leading-[28px] text-white w-full  flex gap-10 p-[10px_10px_10px_20px] items-center justify-between  ">
//               <span>Say Hello 👋</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="35"
//                 height="35"
//                 viewBox="0 0 35 35"
//                 fill="none"
//               >
//                 <path
//                   d="M17.5013 2.9165C25.5557 2.9165 32.0847 9.44546 32.0847 17.4998C32.0847 25.5542 25.5557 32.0832 17.5013 32.0832C14.9241 32.0876 12.3922 31.4056 10.1659 30.1071L2.92382 32.0832L4.89549 24.8382C3.59606 22.6112 2.91347 20.0782 2.91799 17.4998C2.91799 9.44546 9.44695 2.9165 17.5013 2.9165ZM12.5313 10.6457L12.2397 10.6573C12.0511 10.6703 11.8668 10.7199 11.6972 10.8032C11.539 10.8929 11.3946 11.0049 11.2684 11.1357C11.0934 11.3005 10.9942 11.4434 10.8878 11.5819C10.3484 12.2832 10.058 13.1443 10.0624 14.029C10.0653 14.7436 10.2519 15.4392 10.5436 16.0896C11.1401 17.405 12.1215 18.7978 13.4165 20.0884C13.7286 20.399 14.0349 20.7111 14.3645 21.0013C15.9736 22.4179 17.8911 23.4396 19.9645 23.985L20.7928 24.1119C21.0626 24.1265 21.3324 24.1061 21.6036 24.093C22.0283 24.0706 22.4429 23.9556 22.8184 23.7561C23.0092 23.6574 23.1956 23.5504 23.377 23.4353C23.377 23.4353 23.4387 23.3934 23.5592 23.304C23.7561 23.1582 23.8772 23.0546 24.0405 22.884C24.163 22.7576 24.2651 22.6108 24.3467 22.4436C24.4605 22.2059 24.5742 21.7523 24.6209 21.3746C24.6559 21.0859 24.6457 20.9284 24.6413 20.8307C24.6355 20.6746 24.5057 20.5128 24.3642 20.4442L23.5155 20.0636C23.5155 20.0636 22.2467 19.5109 21.4709 19.158C21.3897 19.1226 21.3027 19.1023 21.2142 19.0982C21.1145 19.0877 21.0136 19.0989 20.9185 19.1308C20.8234 19.1628 20.7362 19.2148 20.663 19.2834C20.6557 19.2805 20.558 19.3636 19.5036 20.6411C19.4431 20.7224 19.3597 20.7839 19.2642 20.8176C19.1686 20.8514 19.0651 20.8559 18.9669 20.8307C18.8719 20.8053 18.7788 20.7732 18.6884 20.7344C18.5076 20.6586 18.4449 20.6294 18.3209 20.5769C17.4836 20.2122 16.7086 19.7187 16.024 19.1142C15.8403 18.9538 15.6697 18.7788 15.4947 18.6096C14.921 18.0601 14.421 17.4386 14.0072 16.7605L13.9211 16.6219C13.8602 16.5283 13.8103 16.428 13.7724 16.323C13.717 16.1086 13.8613 15.9365 13.8613 15.9365C13.8613 15.9365 14.2157 15.5486 14.3805 15.3386C14.5409 15.1344 14.6765 14.9361 14.764 14.7946C14.9361 14.5175 14.9901 14.2332 14.8997 14.013C14.4913 13.0155 14.0694 12.0233 13.6338 11.0365C13.5478 10.8411 13.2926 10.7011 13.0607 10.6734C12.9819 10.6637 12.9032 10.6559 12.8244 10.65C12.6286 10.6388 12.4323 10.6408 12.2367 10.6559L12.5313 10.6457Z"
//                   fill="#BAD6EB"
//                 />
//               </svg>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TeamSection;
