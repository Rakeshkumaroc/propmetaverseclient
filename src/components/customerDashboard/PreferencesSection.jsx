import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa"; // Import FaChevronCircleUp for consistency

const PreferencesSection = ({
  preferences,
  setPreferences,
  handlePreferencesUpdate,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleRadioChange = (e) => {
    setPreferences({ ...preferences, propertyType: e.target.value });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <section className="mb-6 sm:mb-8 bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8"> {/* Adjusted padding and margin */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0"> {/* Stack on mobile, row on sm+, adjusted gap */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 whitespace-nowrap">Preferences</h2> {/* Adjusted font size, prevent wrap */}
        {/* Button always visible, text changes based on form state */}
        <button
          onClick={toggleFormVisibility}
          className="bg-logoColor flex items-center justify-center gap-3 text-white px-4 py-2 rounded hover:bg-logoColor/90 focus:outline-none focus:ring-2 focus:ring-logoColor/50 transition-all duration-200 w-full sm:w-auto" // Added w-full for mobile, justify-center for alignment
        >
          {isFormVisible ? (
            <>Hide Form <FaChevronCircleUp /></>
          ) : (
            <>Update Preferences <FaChevronCircleDown /></>
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isFormVisible
            ? "opacity-100 max-h-[500px]" // Use a generous max-height
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <form onSubmit={handlePreferencesUpdate} className="space-y-4 sm:space-y-6"> {/* Adjusted vertical spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            {/* Grid for radio buttons: 1 column on mobile, 3 on sm+ */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 border border-gray-300 rounded p-2 bg-gray-50">
              {["Residential", "Commercial", "Plot or Land"].map((type) => (
                <li key={type} className="flex items-center">
                  <div className="flex items-center w-full p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <input
                      value={type}
                      id={type}
                      type="radio"
                      name="propertyType"
                      checked={preferences.propertyType === type}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-logoColor border-gray-300 focus:ring-logoColor cursor-pointer"
                    />
                    <label
                      htmlFor={type}
                      className="ml-2 text-sm text-gray-700 cursor-pointer w-full"
                    >
                      {type}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Grid for budget inputs: 1 column on mobile, 2 on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Budget
              </label>
              <input
                type="number"
                value={preferences.minBudget || ""}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    minBudget: e.target.value ? Number(e.target.value) : "", // Allow empty string for better UX
                  })
                }
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-logoColor focus:border-logoColor transition-all duration-200" // Adjusted padding
                placeholder="e.g., 500,000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Budget
              </label>
              <input
                type="number"
                value={preferences.maxBudget || ""}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    maxBudget: e.target.value ? Number(e.target.value) : "", // Allow empty string
                  })
                }
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-logoColor focus:border-logoColor transition-all duration-200" // Adjusted padding
                placeholder="e.g., 1,000,000"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={preferences.location || ""} // Ensure value is controlled
              onChange={(e) =>
                setPreferences({ ...preferences, location: e.target.value })
              }
              className="w-full p-2.5 sm:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-logoColor focus:border-logoColor transition-all duration-200" // Adjusted padding
              placeholder="e.g., Dubai, UAE"
            />
          </div>

          {/* Action buttons: flex-end for right alignment, responsive gap */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-2 sm:pt-0"> {/* Stack on mobile, row on sm+, added pt */}
            <button
              type="button"
              onClick={toggleFormVisibility}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 w-full sm:w-auto" // Full width on mobile
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-logoColor text-white rounded hover:bg-logoColor/90 focus:outline-none focus:ring-2 focus:ring-logoColor/50 transition-all duration-200 w-full sm:w-auto" // Full width on mobile
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PreferencesSection;