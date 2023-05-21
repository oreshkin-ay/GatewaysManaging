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
        {isLoading ? <CircularProgress /> : <span>No devices</span>}
      </TableCell>
    </TableRow>
  );
};

export const List = ({ data, isLoading, onDeleteRow }) => {
  return (
    <Box sx={{ pt: 3 }}>
      {isLoading && !data ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <Head rowCount={data?.length ?? 0} />
              <TableBody>
                {!data?.length || isLoading ? (
                  <SingleRow isLoading={isLoading} />
                ) : (
                  data.map(({ _id, vendor, online, updatedAt }) => (
                    <Row
                      key={_id}
                      id={_id}
                      name={vendor}
                      status={online}
                      date={updatedAt}
                      onDelete={onDeleteRow}
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
