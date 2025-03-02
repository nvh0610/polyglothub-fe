import { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

export default function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(e.target.value); // Gọi API với giá trị mới
        }
      }}
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        "& fieldset": { borderRadius: "8px" },
      }}
    />
  );
}
