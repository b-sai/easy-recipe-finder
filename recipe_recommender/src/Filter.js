import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

const FILTER_OPTIONS = [
  { name: "beachfront", label: "Beachfront" },
  { name: "wifi", label: "Wifi" },
  { name: "kitchen", label: "Kitchen" },
  { name: "freeParking", label: "Free parking" },
  { name: "washer", label: "Washer" },
  { name: "hotTub", label: "Hot tub" },
];

const FilterComponent = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(
    Object.fromEntries(FILTER_OPTIONS.map(({ name }) => [name, false]))
  );

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
        <DialogContent>
          <FormGroup>
            {FILTER_OPTIONS.map(({ name, label }) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox
                    checked={filters[name]}
                    onChange={handleFilterChange}
                    name={name}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterComponent;
