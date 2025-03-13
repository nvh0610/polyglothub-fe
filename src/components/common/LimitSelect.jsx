import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
export default function LimitSelect({ limit, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="limit-select-label">Limit</InputLabel>
      <Select
        labelId="limit-select-label"
        value={limit}
        label="Limit"
        onChange={(e) => onChange(e.target.value)}
        sx={{
          borderRadius: "8px",  // Bo góc cho Select
          "& fieldset": { borderRadius: "8px" }, // Bo góc viền
        }}
      >
        {[5, 10, 20, 30, 50, 100].map((l) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}