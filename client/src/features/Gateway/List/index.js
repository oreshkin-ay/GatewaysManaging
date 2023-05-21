import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { Head, headCells } from "./Head";
import { Row } from "./Row";
import { CircularProgress, TableCell, TableRow } from "@mui/material";
import "./styles.scss";

const SingleRow = ({ isLoading }) => {
  return (
    <TableRow>
      <TableCell colSpan={headCells.length} align="center">
        {isLoading ? <CircularProgress /> : <span>No gateways</span>}
      </TableCell>
    </TableRow>
  );
};

export const List = ({ data, isLoading, onShowDevices, onDeleteRow }) => {
  return (
    <Box sx={{ p: 3 }}>
      {isLoading && !data ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <Head />
              <TableBody>
                {!data?.length || isLoading ? (
                  <SingleRow isLoading={isLoading} />
                ) : (
                  data.map(({ id, name, ip }) => (
                    <Row
                      key={id}
                      id={id}
                      name={name}
                      ip={ip}
                      onDelete={onDeleteRow}
                      onShowDevices={onShowDevices}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};
