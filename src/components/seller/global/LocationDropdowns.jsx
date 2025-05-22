// components/LocationDropdowns.jsx
import { useEffect, useState } from "react";
import City from "../../../utils/city.json";
import State from "../../../utils/state.json";
import Country from "../../../utils/country.json";

const normalizeId = (id) => String(id);

const LocationDropdowns = ({ formData, setFormData }) => {
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  // Update filtered states when countryId changes
  useEffect(() => {
    if (countryId) {
      const states = State.filter(
        (state) => normalizeId(state.country_id) === normalizeId(countryId)
      );
      setFilteredStates(states);

      const isValidState = states.some(
        (state) => normalizeId(state.id) === normalizeId(stateId)
      );
      if (!isValidState) {
        setStateId("");
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        setFilteredCities([]);
      }
    } else {
      setFilteredStates([]);
      setFilteredCities([]);
      setStateId("");
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [countryId]);

  // Update filtered cities when stateId changes
  useEffect(() => {
    if (stateId) {
      const cities = City.filter(
        (city) => normalizeId(city.state_id) === normalizeId(stateId)
      );
      setFilteredCities(cities);

      const isValidCity = cities.some(
        (city) => normalizeId(city.id) === normalizeId(formData.city)
      );
      if (!isValidCity) {
        setFormData((prev) => ({ ...prev, city: "" }));
      }
    } else {
      setFilteredCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [stateId]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "country") {
      const selectedCountry = Country.find(
        (country) => String(country.id) === String(value)
      );
      setCountryId(value);
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry?.name || "",
        state: "",
        city: "",
      }));
      setStateId("");
    } else if (id === "state") {
      const selectedState = State.find(
        (state) => String(state.id) === String(value)
      );
      setStateId(value);
      setFormData((prev) => ({
        ...prev,
        state: selectedState?.name || "",
        city: "",
      }));
    } else if (id === "city") {
      const selectedCity = City.find(
        (city) => String(city.id) === String(value)
      );
      setFormData((prev) => ({
        ...prev,
        city: selectedCity?.name || "",
      }));
    }
  };
  console.log(formData);
  return (
    <>
      {/* Country */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="country"
          className="text-[14px] font-semibold leading-[26px]"
        >
          Country
        </label>
        <select
          id="country"
          value={countryId}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm pr-10"
         
        >
          <option value="" disabled>
            {formData.country ? formData.country : " Select Country"}
          </option>
          {Country.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="state"
          className="text-[14px] font-semibold leading-[26px]"
        >
          State
        </label>
        <select
          id="state"
          value={stateId}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm pr-10"
         
          disabled={!countryId}
        >
          <option value="" disabled>
            {formData.state ? formData.state : "Select State"}
          </option>
          {filteredStates.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="city"
          className="text-[14px] font-semibold leading-[26px]"
        >
          City
        </label>
        <select
          id="city"
          value={
            filteredCities.find((city) => city.name === formData.city)?.id || ""
          }
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm pr-10"
         
          disabled={!stateId}
        >
          <option value="" disabled>
            {formData.city ? formData.city : "Select City"}
          </option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LocationDropdowns;
