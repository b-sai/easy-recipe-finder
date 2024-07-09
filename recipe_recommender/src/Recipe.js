import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const RecipeCard = ({ recipeName, source, ingredients, path, url }) => {
  const hasIngredients = Array.isArray(ingredients) && ingredients.length > 0;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" height="300" image={path} alt={recipeName} />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Box sx={{ height: "80px", mb: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              height: "3em",
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
            {source}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ingredients
        </Typography>
        <Box
          sx={{
            height: "150px",
            overflow: "hidden",
            position: "relative",
            mb: 2,
          }}
        >
          <Box
            sx={{
              height: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
          >
            {hasIngredients ? (
              ingredients.map((ingredient, index) => (
                <Typography
                  variant="body2"
                  component="div"
                  key={index}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {ingredient}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No ingredients available</Typography>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "5em",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
            }}
          />
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
