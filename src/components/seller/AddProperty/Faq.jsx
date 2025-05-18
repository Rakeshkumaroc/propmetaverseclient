import React, { useContext, useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { MyContext } from "../../../App";

const Faq = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);
  const [faqs, setFaqs] = useState(
    formData.faqs || [{ question: "", answer: "" }]
  );

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      faqs,
    }));
  }, [faqs, setFormData]);

  const handleFaqChange = (index, field, value) => {
    const updatedFaq = [...faqs];
    updatedFaq[index][field] = value;
    setFaqs(updatedFaq);
  };

  // Remove specific FAQ entry
  const removeFaq = (index) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
  };

  return (
    <form className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">FAQs</p>

      {/* FAQ Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold leading-[26px]">FAQ</p>
          <span className="text-sm text-gray-500">
            {faqs.length} Question(s)
          </span>
        </div>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fadeIn"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`question-${index}`}
                className="text-[14px] font-semibold leading-[26px]"
              >
                Question
              </label>
              <input
                type="text"
                placeholder="question"
                id={`question-${index}`}
                value={faq.question || ""}
                onChange={(e) =>
                  handleFaqChange(index, "question", e.target.value)
                }
                className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`answer-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  Answer
                </label>
                {faqs.length > 1 && (
                  <button
                    onClick={() => removeFaq(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="answer"
                id={`answer-${index}`}
                value={faq.answer || ""}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
                className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
              />
            </div>
          </div>
        ))}

        <div className="mt-2 gap-3 flex justify-end">
          <IoIosAddCircle
            onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
            className="text-black rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => {
            setIsActive(7); // Adjust based on your navigation flow
          }}
          type="submit"
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Faq;