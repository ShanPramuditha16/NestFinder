import React from "react";
import { useDrop } from "react-dnd";
import "./FavoriteList.css";

const FavoriteList = ({ favorites, removeFromFavorites, clearFavorites, onDrop }) => {
  // useDrop hook for enabling drop functionality in the favorite list
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY", // Accept draggable items of type "PROPERTY"
    drop: (item) => onDrop(item), // Trigger onDrop when an item is dropped
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Track if an item is being hovered over
    }),
  }));

  return (
    <div
      className={`favorite-list ${isOver ? "highlight" : ""}`} // Add highlight class conditionally
      ref={drop} // Connect the drop reference to the list
    >
      <h3>Favorites</h3>
      {/* Button to clear all favorites */}
      <button onClick={clearFavorites} className="clear-favorites-button">
        Clear All
      </button>
      {favorites.length > 0 ? (
        <div className="favorite-properties">
          {favorites.map((property) => (
            <div key={property.id} className="favorite-card">
              {/* Property image and details */}
              <img src={property.picture} alt={property.type} />
              <h4>{property.type}</h4>
              <p>Price: £{property.price.toLocaleString()}</p>
              <p>Location: {property.location}</p>
              {/* Button to remove individual property from favorites */}
              <button
                onClick={() => removeFromFavorites(property.id)}
                className="remove-favorite-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite properties yet.</p> // Message when no favorites are added
      )}
    </div>
  );
};

export default FavoriteList;
