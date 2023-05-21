import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import PhoneIcon from "@mui/icons-material/Phone";

export const Row = ({ id, name, status, date, onDelete }) => {
  const localDate = new Date(date);

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell width="30%">{name}</TableCell>
      <TableCell>{status ? <PhoneIcon /> : <PhoneDisabledIcon />}</TableCell>
      <TableCell>{localDate.toLocaleString()}</TableCell>
      <TableCell align="right">
        <Tooltip title="Delete gateway">
          <IconButton
            onClick={(e) => {
              onDelete(id);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
