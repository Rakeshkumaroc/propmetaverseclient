import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Agentsimg from "../../assets/image/agentsimg.png";

const agents = [
  { id: 1, name: "Agent 1", image: Agentsimg },
  { id: 2, name: "Agent 2", image: Agentsimg },
  { id: 3, name: "Agent 3", image: Agentsimg },
];

const AgentsSection = () => {
  return (
    <div className="w-full py-12 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white flex justify-center">
      <div className=" w-full flex border-b border-gray-400 flex-col md:flex-row items-center">
        {/* Left Text Section */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-logoBlue block">Our Agents</span>{" "}
            <span className="text-logoColor">You Can Trust</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Everyone can use a car or a platform to buy products, but using a
            car platform decreases risk and travel distance. It ensures better
            convenience, affordability, and accessibility for users.
          </p>

          {/* Navigation Buttons */}
          <div className="mt-6 flex ">
            <button className="bg-logoBlue text-white p-4 hover:bg-logoBlue/90">
              <FaChevronLeft size={18} />
            </button>
            <button className="bg-logoBlue text-white p-4 hover:bg-logoBlue/90">
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Agents Section */}

        <div className="  w-full hidden sm:flex justify-center">
          <img src={Agentsimg} alt={"agent"} className="w-[90%] h-auto " />
        </div>
      </div>
    </div>
  );
};

export default AgentsSection;
