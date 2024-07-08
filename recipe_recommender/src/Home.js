import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Container } from "@mui/material";
import RecipeCard from "./Recipe";
import readJsonFile from "./FetchData";
import { RecipeContext } from "./App"; // Adjust the import path as needed

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_BACKEND;
  const { recipeData, setRecipeData } = useContext(RecipeContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readJsonFile(apiKey);
        setRecipeData(data); // Updating context data
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {" "}
      <Container>
        <Grid container spacing={3}>
          {recipeData.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCard
                recipeName={recipe.label}
                source={recipe.source}
                ingredients={recipe.ingredients}
                path={recipe.image}
                url={recipe.url}
                time={recipe.totalTime}
                yld={recipe.yield}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
