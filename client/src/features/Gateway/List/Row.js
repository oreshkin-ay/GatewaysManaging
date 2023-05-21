import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DnsIcon from "@mui/icons-material/Dns";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const Row = ({ id, name, ip, onDelete, onShowDevices }) => {
  return (
    <TableRow hover data-id={id}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{ip}</TableCell>
      <TableCell align="right">
        <Tooltip title="All devices">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onShowDevices({ id, name });
            }}
          >
            <DnsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete gateway">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
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
