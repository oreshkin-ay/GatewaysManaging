import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDataApi } from "../../../entities/hooks/useDataApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GatewayService from "../../../shared/api/services/gateway.service";
import { ListHead } from "./ListHead";

export const List = ({ search }) => {
  const getList = useCallback(() => {
    return GatewayService.getList(search);
  }, [search]);

  const { isLoading, data, isError } = useDataApi([], getList);

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
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <ListHead rowCount={data.length} />
            <TableBody>
              {data.map(({ id, name, ip }) => {
                const labelId = `enhanced-table-checkbox-${ip}`;

                return (
                  <TableRow
                    hover
                    // onClick={(e) => {}}
                    key={id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {id}
                    </TableCell>
                    <TableCell align="right">{name}</TableCell>
                    <TableCell align="right">{ip}</TableCell>
                    <TableCell align="right">
                      <ExpandMoreIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
