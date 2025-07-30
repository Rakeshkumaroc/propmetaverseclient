import gallery1 from "../../assets/gallery1.png";
import gallery2 from "../../assets/gallery2.png";
import gallery3 from "../../assets/gallery3.png";
import gallery4 from "../../assets/gallery4.png";
import gallery5 from "../../assets/gallery5.png"; 

const ExploreWorld = () => {
  return (
    <section className="bg-[#1865A4] py-16 px-4 md:px-10 lg:px-20  ">
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={gallery1}
            alt="Office"
            className="w-full md:w-1/2 h-80 object-cover rounded-xl"
          />
          <img
            src={gallery2}
            alt="Team"
            className="w-full md:w-1/2 h-80 object-cover rounded-xl"
          />
        </div>

        {/* Row 2 */}
        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left img */}
          <img
            src={gallery3}
            alt="Meeting"
            className="w-full md:w-1/2 h-80 object-cover rounded-xl"
          />

          {/* Right - Two side-by-side imgs in same height */}
          <div className="w-full md:w-1/2 flex gap-6">
            <div className="w-1/2">
              <img
                src={gallery4}
                alt="Team 2"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="w-1/2">
              <img
                src={gallery5}
                alt="Team 3"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Row 3 - Text and img */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-3xl font-semibold text-white mb-4">
              Explore Propmetaverse World
            </p>
            <p className="text-white text-lg leading-relaxed">
              Step inside the world of Propmetaverse, where professionalism
              meets warmth, and expertise meets passion. Our gallery offers a
              glimpse into our team and workspaces, inviting you to get to know
              us better.
            </p>
          </div>
          <img
            src={gallery5}
            alt="Handshake"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreWorld;
