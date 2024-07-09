import React, { useState, createContext } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Filter from "./Filter";
import { RecipeProvider } from "./RecipeProvider";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div>
      <Navbar />
      <RecipeProvider>
        <Filter />
        <Home />
      </RecipeProvider>
      <Analytics />
    </div>
  );
}

export default App;