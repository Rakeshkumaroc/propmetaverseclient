import { useNavigate } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Enquiry!
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            We have successfully received your tour request. Our team will reach
            out to you shortly to confirm your preferred date and provide
            further details. We’re excited to help you find your perfect
            property!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-logoColor text-white px-6 py-3 rounded font-semibold hover:bg-logoColor/90 transition duration-200 flex items-center gap-1"
            >
              Back to Home
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"></path>
              </svg>
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="border border-logoColor text-logoColor px-6 py-3 rounded font-semibold hover:bg-logoColor hover:text-white transition duration-200"
            >
              Explore More Properties
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
