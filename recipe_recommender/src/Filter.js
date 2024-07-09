import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { RecipeContext } from "./RecipeProvider";
import axios from "axios";

const apiKey = process.env.REACT_APP_BACKEND_TEST;

const fetchFilterOptions = async () => {
  try {
    const response = await fetch(apiKey + "/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data.map((category) => ({ name: category, label: category }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const FilterComponent = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { recipeData, setRecipeData, filterData, setFilterData } =
    useContext(RecipeContext);

  useEffect(() => {
    const fetchAndSetFilterOptions = async () => {
      setIsLoading(true);
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options);
        setFilters((prevFilters) => {
          const newFilters = Object.fromEntries(
            options.map((option) => [option.name, false])
          );
          return { ...newFilters, ...prevFilters };
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetFilterOptions();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  const handleApply = async () => {
    const selectedFilters = Object.keys(filters).filter((key) => filters[key]);
    setFilterData(selectedFilters);
    handleClose();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleClickOpen}
          sx={{ my: 2 }}
        >
          Filters
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filters</DialogTitle>
        {isLoading ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : error ? (
          <DialogContent>Error: {error}</DialogContent>
        ) : (
          <DialogContent>
            <FormGroup>
              {filterOptions.map(({ name, label }) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      checked={!!filters[name]}
                      onChange={handleFilterChange}
                      name={name}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply} disabled={isLoading || !!error}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterComponent;
