import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const RecipeCard = ({
  recipeName,
  source,
  ingredients,
  path,
  url,
  time,
  yld,
}) => {
  const hasIngredients = Array.isArray(ingredients) && ingredients.length > 0;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia component="img" height="300" image={path} alt={recipeName} />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {recipeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {source} | {time} minutes
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ingredients
        </Typography>
        <Box sx={{ mb: 2, flexGrow: 1 }}>
          {hasIngredients ? (
            ingredients.slice(0, 12).map((ingredient, index) => (
              <Typography variant="body2" component="div" key={index}>
                {ingredient}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No ingredients available</Typography>
          )}
        </Box>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: "auto",
            fontWeight: "bold",
          }}
        >
          VIEW RECIPE
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
