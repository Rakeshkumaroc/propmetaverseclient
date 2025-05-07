import React, { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-[#1a2236]  text-white rounded-full p-3 shadow-lg hover:bg-[#141b2b] cursor-pointer"
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      ) : (
        <div>
          <iframe
            src="https://prop-bot-lovat.vercel.app/"
            className="w-[300px] h-[500px] rounded-xl shadow-lg border border-gray-200"
            frameBorder="0"
          ></iframe>
          <button
            onClick={toggleChat}
            className="absolute top-2 left-2  border-2 border-white text-white rounded-full p-1 shadow-lg hover:bg-white/50 focus:outline-none"
          >
            <svg
              className="w-2 h-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;