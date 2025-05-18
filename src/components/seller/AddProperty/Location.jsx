import { useContext, useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../../App";
import { toast } from "react-toastify";
import City from "../../../utils/city.json";
import Country from "../../../utils/country.json";
import State from "../../../utils/state.json";

const Location = ({ setIsActive }) => {
  const { formData, setFormData } = useContext(MyContext);

  // State for filtered states and cities
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  // Normalize IDs to strings to avoid type mismatch
  const normalizeId = (id) => String(id);

  // Update filtered states when country changes
  useEffect(() => {
    if (formData.country) {
      const states = State.filter(
        (state) => normalizeId(state.country_id) === normalizeId(formData.country)
      );
      setFilteredStates(states);
      // Only reset state and city if they don't belong to the selected country
      const isValidState = states.some(
        (state) => normalizeId(state.id) === normalizeId(formData.state)
      );
      if (!isValidState) {
        setFormData((prevData) => ({
          ...prevData,
          state: "",
          city: "",
        }));
        setFilteredCities([]);
      }
    } else {
      setFilteredStates([]);
      setFilteredCities([]);
      setFormData((prevData) => ({
        ...prevData,
        state: "",
        city: "",
      }));
    }
  }, [formData.country, setFormData]);

  // Update filtered cities when state changes
  useEffect(() => {
    if (formData.state) {
      const cities = City.filter(
        (city) => normalizeId(city.state_id) === normalizeId(formData.state)
      );
      setFilteredCities(cities);
      // Only reset city if it doesn't belong to the selected state
      const isValidCity = cities.some(
        (city) => normalizeId(city.id) === normalizeId(formData.city)
      );
      if (!isValidCity) {
        setFormData((prevData) => ({
          ...prevData,
          city: "",
        }));
      }
    } else {
      setFilteredCities([]);
      setFormData((prevData) => ({
        ...prevData,
        city: "",
      }));
    }
  }, [formData.state, setFormData]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "pinCode") {
      // Validate pin code: numeric and 6 digits
      const pinCodeRegex = /^\d{0,6}$/;
      if (value && !pinCodeRegex.test(value)) {
        toast.error("Pin Code must be a 6-digit number");
        return;
      }
    }

    if (id === "googleMap") {
      // Extract src value if iframe string is provided
      const regex = /src=['"]([^'"]+)['"]/;
      const match = value.match(regex);

      setFormData((prevData) => ({
        ...prevData,
        [id]: match ? match[1] : value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // Validate form before proceeding to the next step
  const handleNext = () => {
    if (!formData.address || !formData.country || !formData.state || !formData.city || !formData.pinCode) {
      toast.error("Please fill all required fields: Address, Country, State, City, and Pin Code");
      return;
    }
    setIsActive(4);
  };

  return (
    <div className="space-y-5">
      <p className="text-[17px] leading-[25.5px] font-semibold">
        Listing Location
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition-all hover:border-gray-400">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="address"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="country"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Country
          </label>
          <select
            id="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {Country.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="state"
            className="text-[14px] font-semibold leading-[26px]"
          >
            State
          </label>
          <select
            id="state"
            value={formData.state || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
            disabled={!formData.country}
          >
            <option value="" disabled>
              Select State
            </option>
            {filteredStates.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="city"
            className="text-[14px] font-semibold leading-[26px]"
          >
            City
          </label>
          <select
            id="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            required
            disabled={!formData.state}
          >
            <option value="" disabled>
              Select City
            </option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="pinCode"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            value={formData.pinCode || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Enter Pin Code"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="googleMap"
            className="text-[14px] font-semibold leading-[26px]"
          >
            Google Map
          </label>
          <input
            type="text"
            id="googleMap"
            value={formData.googleMap || ""}
            onChange={handleChange}
            className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
            placeholder="Paste Google Map Embed URL"
          />
        </div>
      </div>
      <div className="flex justify-start">
        <button
          onClick={handleNext}
          type="button"
          className="text-[15px] px-2 md:px-5 py-4 flex mt-5 items-center bg-black rounded-lg text-white"
        >
          Next
          <GoArrowUpRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Location;