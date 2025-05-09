import React, { useContext, useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { MyContext } from "../../../App";
import { MdDeleteForever } from "react-icons/md";

const Keywords = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);

  const [keywords, setKeywords] = useState(
    formData.keywords || [{ heading: "", keyword: [] }]
  );

  // Sync `keywords` state with `formData` in context
  useEffect(() => {
    setFormData((prev) => ({ ...prev, keywords }));
  }, [keywords, setFormData]);

  const handleKeywordChange = (index, field, value) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index][field] = value;
    setKeywords(updatedKeywords);
  };

  const addKeyword = (index, value) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index].keyword.push(value);
    setKeywords(updatedKeywords);
  };

  const addKeywordSection = () => {
    setKeywords([...keywords, { heading: "", keyword: [] }]);
  };

  // Remove specific keyword section
  const removeKeywordSection = (index) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  // Remove specific keyword from a section
  const removeKeyword = (sectionIndex, keywordIndex) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[sectionIndex].keyword = updatedKeywords[
      sectionIndex
    ].keyword.filter((_, i) => i !== keywordIndex);
    setKeywords(updatedKeywords);
  };

  return (
    <div className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">
        Listing Keywords
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold leading-[26px]">Keywords</p>
          <span className="text-sm text-gray-500">
            {keywords.length} Section(s)
          </span>
        </div>

        {keywords.map((item, index) => (
          <div className="space-y-5 mt-5 animate-fadeIn" key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`heading-${index}`}
                  className="text-[14px] font-semibold leading-[26px]"
                >
                  Heading
                </label>

                <input
                  type="text"
                  id={`heading-${index}`}
                  placeholder="Enter heading"
                  value={item.heading || ""}
                  onChange={(e) =>
                    handleKeywordChange(index, "heading", e.target.value)
                  }
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`keyword-${index}`}
                    className="text-[14px] font-semibold leading-[26px]"
                  >
                    Add a keyword
                  </label>
                  {keywords.length > 1 && (
                    <button
                      onClick={() => removeKeywordSection(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full">
                  <input
                    type="text"
                    id={`keyword-${index}`}
                    placeholder="Enter a keyword"
                    className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        addKeyword(index, e.target.value.trim());
                        e.target.value = ""; // Clear input field
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="h-32 overflow-y-auto p-4 rounded-lg w-full bg-gray-100 shadow-inner">
              <p className="text-sm">{item.heading || ""}</p>
              <div className="flex flex-wrap gap-5 py-3 items-start justify-start">
                {item.keyword.map((kw, kwIndex) => (
                  <div
                    key={kwIndex}
                    className="flex items-center px-2 py-1 bg-white rounded-lg border text-sm"
                  >
                    <span>{kw}</span>
                    <button
                      onClick={() => removeKeyword(index, kwIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <MdDeleteForever className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-2 gap-3 flex justify-end">
          <IoIosAddCircle
            onClick={addKeywordSection}
            className="text-black rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => setIsActive(6)}
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Keywords;
