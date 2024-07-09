import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Button,
} from "@mui/material";

const TruncatedTypography = ({ text, maxLines = 1 }) => (
  <Typography
    variant="body2"
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: "vertical",
      lineHeight: "1.2em",
      maxHeight: `${1.2 * maxLines}em`,
    }}
  >
    {text}
  </Typography>
);

const RecipeCard = ({
  path,
  recipeName,
  time,
  yld,
  source,
  ingredients,
  url,
}) => {
  const hasIngredients = ingredients && ingredients.length > 0;
  const displayedIngredients = hasIngredients ? ingredients.slice(0, 5) : [];
  const hasMoreIngredients = hasIngredients && ingredients.length > 5;

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
              lineHeight: "1.2em",
              maxHeight: "2.4em",
            }}
          >
            {recipeName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {`${time} minutes | ${yld} servings | ${source}`}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ingredients
        </Typography>
        <Box sx={{ height: "150px", mb: 2 }}>
          {hasIngredients ? (
            <List>
              {displayedIngredients.map((ingredient, index) => (
                <ListItem key={index} disablePadding>
                  <TruncatedTypography text={ingredient} />
                </ListItem>
              ))}
              {hasMoreIngredients && (
                <ListItem disablePadding>
                  <Typography variant="body2">...</Typography>
                </ListItem>
              )}
            </List>
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
          sx={{ mt: "auto", fontWeight: "bold" }}
        >
          VIEW RECIPE
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
