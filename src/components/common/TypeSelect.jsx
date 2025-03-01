import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  
  export default function TypeSelect({ type, onChange }) {
    return (
      <FormControl fullWidth>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          value={type}
          label="Type"
          onChange={(e) => onChange(e.target.value)}
        >
          {["n", "v", "adj", "adv", "prep", "conj"].map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }