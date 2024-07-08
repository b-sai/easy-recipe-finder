import React, { useState, createContext } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Filter from "./Filter";

// Create context outside of components
export const RecipeContext = createContext({
  recipeData: [],
  setRecipeData: () => {},
});

function App() {
  const [recipeData, setRecipeData] = useState([]);

  return (
    <div>
      <Navbar />
      <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
        <Filter />
        <Home />
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
