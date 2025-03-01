import { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

export default function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = () => {
      if (searchTerm.trim() !== "") {
        onSearch(searchTerm);
      }
    };
  
    return (
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    );
  }
  