import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LandingPage from "./pages/LandingPage.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default App;
