import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";

export const Search = ({ value, onChange }) => {
  return (
    <OutlinedInput
      type="text"
      value={value}
      onChange={onChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};
