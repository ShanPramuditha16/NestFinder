import React, { useState, useEffect } from "react";
import propertiesData from "../data/properties.json";
import Navbar from "../components/NavBar.jsx";
import SearchForm from "../components/SearchForm.jsx";
import FavoriteList from "../components/FavoriteList.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import "./LandingPage.css";

const LandingPage = () => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Save favorites to localStorage 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const getRecommendations = () => {
      const shuffled = [...propertiesData.properties].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 3));
    };
    getRecommendations();
  }, []);
  
  // Handle Navbar search
  const handleSearch = ({ query, tenure }) => {
    const results = propertiesData.properties.filter((property) => {
      const matchesQuery =
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.type.toLowerCase().includes(query.toLowerCase());
      const matchesTenure = !tenure || property.tenure.toLowerCase() === tenure.toLowerCase();
      return matchesQuery && matchesTenure;
    });

    setFilteredProperties(results);
    setShowResults(true);
  };

  // Handle advanced search via the form
  const handleAdvancedSearch = (filters) => {
    const results = propertiesData.properties.filter((property) => {
      const matchesType = filters.type ? property.type.toLowerCase() === filters.type.toLowerCase() : true;
      const matchesPrice =
        (filters.minPrice ? property.price >= filters.minPrice : true) &&
        (filters.maxPrice ? property.price <= filters.maxPrice : true);
      const matchesBedrooms =
        (filters.minBedrooms ? property.bedrooms >= filters.minBedrooms : true) &&
        (filters.maxBedrooms ? property.bedrooms <= filters.maxBedrooms : true);
      const matchesPostcode = filters.postcode
        ? property.location.toLowerCase().includes(filters.postcode.toLowerCase())
        : true;

      return matchesType && matchesPrice && matchesBedrooms && matchesPostcode;
    });

    setFilteredProperties(results);
    setShowResults(true);
  };

  // Favorites management
  const addToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    }
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== propertyId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="landing-page">
      {/* Pass handleSearch to Navbar */}
      <Navbar onSearch={handleSearch} />

      <header className="hero-section">
        <h2>Find your dream property</h2>
        <p>Search properties for sale and to rent.</p>
        <SearchForm onSearch={handleAdvancedSearch} />
      </header>

      <div className="content-container">
        <section className="property-list">
          <h3>{showResults ? "Search Results" : "Suggestions for you"}</h3>
          <div className="property-grid">
            {(showResults ? filteredProperties : recommendations).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                addToFavorites={addToFavorites}
              />
            ))}
          </div>
        </section>

        <FavoriteList
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
          clearFavorites={clearFavorites}
          onDrop={addToFavorites} // Drag-and-drop handling
        />
      </div>
    </div>
  );
};

export default LandingPage;
