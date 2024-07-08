import React, { useState, useEffect } from "react";
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

const apiKey = process.env.REACT_APP_BACKEND;

const FILTER_OPTIONS = async () => {
  try {
    const response = await fetch(apiKey + "/cuisines");
    if (!response.ok) {
      throw new Error("Failed to fetch cuisines");
    }
    const data = await response.json();
    return data.map((cuisine) => ({ name: cuisine, label: cuisine }));
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    throw error;
  }
};

const FilterComponent = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoading(true);
      try {
        const options = await FILTER_OPTIONS();
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
    fetchFilterOptions();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  const handleApply = () => {
    console.log("Applied filters:", filters);
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
          <Button onClick={handleApply} disabled={isLoading || error}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterComponent;
