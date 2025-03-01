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
        sx={{
          borderRadius: "8px",  // Bo góc
          overflow: "hidden",    // Đảm bảo bo góc hoạt động
          "& fieldset": { borderRadius: "8px" }, // Bo góc cho viền
        }}
      />
    );
  }
  