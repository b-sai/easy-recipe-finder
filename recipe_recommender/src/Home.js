import React, { useEffect, useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import RecipeCard from "./Recipe";
import readJsonFile from "./FetchData";

const Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readJsonFile("");
        setRecipeData(data);
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
                recipeName={recipe[0]}
                source={recipe[1]}
                ingredients={recipe[2]}
                path={recipe[3]}
                url={recipe[4]}
                time={recipe[5]}
                yld={recipe[6]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
