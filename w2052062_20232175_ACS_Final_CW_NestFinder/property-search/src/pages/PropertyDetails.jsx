import React, { useState } from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import Navbar from "../components/NavBar.jsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the route
  const property = propertiesData.properties.find((prop) => prop.id.toString() === id); // Find the property by ID
  const [activeImage, setActiveImage] = useState(property?.images?.[0] || property.picture); // Set the first image as active

  if (!property) {
    return <h2>Property not found</h2>; // Display message if the property is not found
  }

  const handleSearch = (query, tenure) => {
    console.log("Search triggered with:", query, tenure); // Log search queries
  };

  return (
    <div className="property-details-page">
      <Navbar onSearch={handleSearch} /> {/* Render Navbar with search functionality */}
      <div className="property-details">
        <h1>{property.type}</h1> {/* Display property type */}
        <div className="gallery">
          <img className="main-image" src={activeImage} alt="Selected Property" /> {/* Display main property image */}
          <div className="thumbnails">
             {/* Display thumbnail images */}
            {[property.picture, ...(property.images || [])].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setActiveImage(img)} // Set clicked image as active
                className={`thumbnail ${activeImage === img ? "active" : ""}`} // Highlight active thumbnail
              />
            ))}
          </div>
        </div>
        <div className="short-description">
           {/* Display property details */}
          <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        </div>
        <Tabs>
           {/* Tab navigation for additional property info */}
          <TabList>
            <Tab>Long Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Google Map</Tab>
          </TabList>
          <TabPanel>
            <p>{property.description}</p>
          </TabPanel>
          <TabPanel>
            <img className="floor-plan" src={property.floorPlan} alt="Floor Plan" />
          </TabPanel>
          <TabPanel>
            {property.mapEmbed ? (
              <iframe
                title="Property Map"
                className="google-map"
                src={property.mapEmbed}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <p>No map available for this property.</p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyDetails;
