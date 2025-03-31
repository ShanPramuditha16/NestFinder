import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css';


const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSearch({
      type: type?.value,
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      minBedrooms: minBedrooms ? parseInt(minBedrooms, 10) : null,
      maxBedrooms: maxBedrooms ? parseInt(maxBedrooms, 10) : null,
      startDate,
      endDate,
      postcode,
    });
  };

  const propertyTypes = [
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  const priceOptions = [
    { value: "", label: "Any" },
    { value: "100000", label: "£100,000" },
    { value: "200000", label: "£200,000" },
    { value: "300000", label: "£300,000" },
    { value: "400000", label: "£400,000" },
    { value: "500000", label: "£500,000" },
    { value: "600000", label: "£600,000+" },
    { value: "700000", label: "£700,000+" },
    { value: "800000", label: "£800,000+" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="select-button">
        {/* Dropdown for selecting property type */}
        <label>Type:</label>
        <Select options={propertyTypes} onChange={setType} isClearable />
      </div>
      <div>
        {/* Dropdowns for selecting price range */}
        <label>Price Range:</label>
        <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
          <option value="">Min Price</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Max Price</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* Inputs for selecting bedroom range */}
        <label>Bedrooms:</label>
        <input
          type="number"
          placeholder="Min"
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxBedrooms}
          onChange={(e) => setMaxBedrooms(e.target.value)}
        />
      </div>
      <div>
        {/* Date pickers for selecting date range */}
        <label>Date Added:</label>
        <DatePicker
          placeholderText="Start Date"
          selected={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          placeholderText="End Date"
          selected={endDate}
          onChange={setEndDate}
        />
      </div>
      <div>
        {/* Input for entering postcode */}
        <label>Postcode:</label>
        <input
          type="text"
          placeholder="e.g. BR1"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
