import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Box, Grid, Container, CircularProgress } from "@mui/material";
import RecipeCard from "./Recipe";
import readJsonFile from "./FetchData";
import { RecipeContext } from "./RecipeProvider";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = process.env.REACT_APP_BACKEND;
  const { recipeData, setRecipeData, filterData, setFilterData } =
    useContext(RecipeContext);

  const observer = useRef();
  const lastRecipeElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await readJsonFile(apiKey, filterData, page);
      if (data.length > 0) {
        setRecipeData((prevData) => [...prevData, ...data]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, filterData, page, setRecipeData]);

  useEffect(() => {
    setRecipeData([]);
    setPage(1);
    setHasMore(true);
  }, [filterData, setRecipeData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ mt: 4 }}>
      <Container>
        <Grid container spacing={3} alignItems="stretch">
          {recipeData.map((recipe, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              ref={
                index === recipeData.length - 1 ? lastRecipeElementRef : null
              }
            >
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
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
