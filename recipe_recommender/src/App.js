import React, { useState, createContext } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Filter from "./Filter";
import { RecipeProvider } from "./RecipeProvider";

function App() {
  return (
    <div>
      <Navbar />
      <RecipeProvider>
        <Filter />
        <Home />
      </RecipeProvider>
    </div>
  );
}

export default App;