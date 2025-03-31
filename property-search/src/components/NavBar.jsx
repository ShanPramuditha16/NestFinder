import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  // State to manage the search query and tenure selection
  const [searchQuery, setSearchQuery] = useState("");
  const [tenure, setTenure] = useState("");

  // Function to handle the search operation
  const handleSearch = () => {
    onSearch({ query: searchQuery, tenure });// Call the `onSearch` prop with search details
  };

  return (
    <nav className="navbar">
      {/* Link to navigate to LandingPage */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1>NestFinder</h1>
      </Link>
      {/* Search bar with input for postcode/address and tenure dropdown */}
      <div className="small-search-bar">
        <input
          type="text"
          placeholder="Enter postcode or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        />
        <select onChange={(e) => setTenure(e.target.value)} value={tenure}>
          {/* Dropdown options for tenure */}
          <option value="">All</option>
          <option value="For Sale">For Sale</option>
          <option value="To Rent">To Rent</option>
        </select>
        {/* Search button to trigger search */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
