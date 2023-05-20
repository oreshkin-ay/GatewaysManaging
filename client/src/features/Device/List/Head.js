import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "ip",
    numeric: false,
    disablePadding: false,
    label: "IP Address",
  },

  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export const Head = () => (
  <TableHead>
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? "right" : "left"}
          padding={headCell.disablePadding ? "none" : "normal"}
        >
          {headCell.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
