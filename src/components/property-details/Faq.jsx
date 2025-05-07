import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";


const Faq = ({faqs}) => {
  const [activeIndex, setActiveIndex] = useState(1);

 

const toggleAnswer = (index) => {
  setActiveIndex(index === activeIndex ? null : index);
};
  return (
    <div   className="w-full mt-10 px-4 md:px-8"> 
      <h3 className="text-2xl font-semibold mb-4">FAQ</h3>
      <div>
        {faqs.map(({ question, answer }, index) => (
          <div key={index} className="border-b py-2">
            <p
              className="flex items-center justify-between   leading-relaxed cursor-pointer text-gray-800 font-semibold text-sm md:text-base"
              onClick={() => toggleAnswer(index)}
            >
              {question}
              <FaSortDown />
            </p>
            {activeIndex === index && (
              <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">{answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
