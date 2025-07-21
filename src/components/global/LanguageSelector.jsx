import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../App";

const LanguageSelector = () => {
  const { isTranslateLoaded } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hasContent, setHasContent] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const translateElementRef = useRef(null);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if google_translate_element has content
  const checkTranslateContent = () => {
    const translateElement = translateElementRef.current;
    if (translateElement) {
      const contentExists = translateElement.childNodes.length > 0;
      setHasContent(contentExists);
      console.log(contentExists ? "yes" : "no");
    } else {
      setHasContent(false);
      console.log("no");
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
    // Call checkTranslateContent after a slight delay to ensure DOM updates
    setTimeout(checkTranslateContent, 0);
  };

  // Handle page reload
  const handleReload = () => {
    window.location.reload();
  };

  // Mobile version
  if (isMobile) {
    return (
      <div className="w-full mt-2" ref={dropdownRef}>
        <button
          className="flex items-center w-full text-sm hover:text-yellow-400"
          onClick={handleButtonClick}
        >
          <span className="mr-2">🌐</span>
          Language
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-2 pl-4">
            <div className="bg-white text-black rounded-md p-2 shadow-lg">
              <div
                id="google_translate_element"
                className="p-2"
                ref={translateElementRef}
              />
              {!hasContent && (
                <button
                  className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold text-sm hover:bg-yellow-500 transition mt-2"
                  onClick={handleReload}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="mr-2"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 374.8c-91.3 0-165.8-74.5-165.8-165.8S164.7 91.2 256 91.2s165.8 74.5 165.8 165.8-74.5 165.8-165.8 165.8zm0-278.8c-61.9 0-112.1 50.2-112.1 112.1s50.2 112.1 112.1 112.1 112.1-50.2 112.1-112.1-50.2-112.1-112.1-112.1zm0 187.2c-41.1 0-74.5-33.4-74.5-74.5s33.4-74.5 74.5-74.5 74.5 33.4 74.5 74.5-33.4 74.5-74.5 74.5z" />
                  </svg>
                  Reload Page
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
        onClick={handleButtonClick}
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm font-medium">Language</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 p-1 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 z-[999] ${
          isTranslateLoaded && isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          id="google_translate_element"
          className="p-2"
          ref={translateElementRef}
        />
        {!hasContent && (
          <div
            className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold text-sm hover:bg-yellow-500 transition mt-2 mb-2"
            onClick={handleReload}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="mr-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 374.8c-91.3 0-165.8-74.5-165.8-165.8S164.7 91.2 256 91.2s165.8 74.5 165.8 165.8-74.5 165.8-165.8 165.8zm0-278.8c-61.9 0-112.1 50.2-112.1 112.1s50.2 112.1 112.1 112.1 112.1-50.2 112.1-112.1-50.2-112.1-112.1-112.1zm0 187.2c-41.1 0-74.5-33.4-74.5-74.5s33.4-74.5 74.5-74.5 74.5 33.4 74.5 74.5-33.4 74.5-74.5 74.5z" />
            </svg>
            Reload Page
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
