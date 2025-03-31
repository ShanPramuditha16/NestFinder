import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, addToFavorites }) => {
  // useDrag hook for enabling drag functionality on the property card
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY", // Drag type to identify the draggable item
    item: property, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track dragging state
    }),
  }));

  return (
    <div
      ref={drag} // Connect the drag reference to the card
      className={`property-card ${isDragging ? "dragging" : ""}`} // Add dragging class conditionally
    >
      {/* Property image */}
      <img src={property.picture} alt={property.type} />
      <h4>{property.type}</h4>
      <p>Price: £{property.price.toLocaleString()}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Location: {property.location}</p>
      <div className="property-actions">
        <button onClick={() => addToFavorites(property)}>❤️ Favorite</button>
        <Link to={`/property/${property.id}`}>
          <button className="view-property-button">View Property</button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
