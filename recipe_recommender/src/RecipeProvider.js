// RecipeProvider.js
import React, { useState, createContext } from "react";

export const RecipeContext = createContext({
  recipeData: [],
  setRecipeData: () => {},
});

export const RecipeProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  console.log("Context set", recipeData);

  return (
    <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
      {children}
    </RecipeContext.Provider>
  );
};
