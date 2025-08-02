import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = ({ title, router }) => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-100  flex-col justify-center items-center w-full h-screen   transition-all duration-500 ease-in-out">
      <div className="login-child-div w-full max-w-md p-6 z-10 bg-white rounded-2xl relative shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-center">
        <h2 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h2>
        <p className="mb-4  text-gray-700">
          You cannot directly open the {title} Panel.
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="relative z-[2] text-white mb-2  overflow-hidden text-base leading-[1.1] font-bold font-secondary tracking-wide uppercase [transition:all_0.3s_linear] inline-flex items-center justify-center gap-3 md:min-h-[3.75rem] min-h-[3.5rem] px-6 md:px-7 py-2 md:py-3 transition-colors ease-in-out ring-offset-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gray-700 after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-black/[.15] after:-z-1 after:[transition:all_.3s_ease-in-out] hover:text-white hover:after:w-full hover:after:left-0 rounded-[5px] w-full"
          type="submit"
        >
          <span className="uppercase"> Back To Home</span>
        </button>

        <button
          onClick={() => {
            navigate(router);
          }}
          className="relative z-[2] text-white   overflow-hidden text-base leading-[1.1] font-bold font-secondary tracking-wide uppercase [transition:all_0.3s_linear] inline-flex items-center justify-center gap-3 md:min-h-[3.75rem] min-h-[3.5rem] px-6 md:px-7 py-2 md:py-3 transition-colors ease-in-out ring-offset-logoColor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-logoColor after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-black/[.15] after:-z-1 after:[transition:all_.3s_ease-in-out] hover:text-white hover:after:w-full hover:after:left-0 rounded-[5px] w-full"
          type="submit"
        >
          <span className="uppercase">{title} Login</span>
        </button>
      </div>
    </div>
  );
};

export default RedirectPage;
