import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
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

export const List = ({ data, isLoading, isError, onDeleteRow }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading && data === null ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <Head rowCount={data.length} />
              <TableBody
                onClick={(e) => {
                  // debugger;
                }}
              >
                {!data.length || isLoading ? (
                  <SingleRow isLoading={isLoading} />
                ) : (
                  data.map(({ id, name, ip }) => {
                    return (
                      <Row
                        key={id}
                        id={id}
                        name={name}
                        ip={ip}
                        onDelete={onDeleteRow}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};
