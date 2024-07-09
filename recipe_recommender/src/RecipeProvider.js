// RecipeProvider.js
import React, { useState, createContext } from "react";

export const RecipeContext = createContext({
  recipeData: [],
  setRecipeData: () => {},
});

export const RecipeProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  return (
    <RecipeContext.Provider
      value={{ recipeData, setRecipeData, filterData, setFilterData }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
