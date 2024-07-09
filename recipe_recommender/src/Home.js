import React, { useEffect, useState, useContext, useRef } from "react";
import { Box, Grid, Container } from "@mui/material";
import RecipeCard from "./Recipe";
import readJsonFile from "./FetchData";
import { RecipeContext } from "./RecipeProvider";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_BACKEND_TEST;
  const { recipeData, setRecipeData, filterData, setFilterData } =
    useContext(RecipeContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readJsonFile(apiKey, filterData);
        setRecipeData(data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    console.log("here in use effect", filterData);
  }, [filterData]);
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
