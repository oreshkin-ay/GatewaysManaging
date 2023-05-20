import React, { useReducer, useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GatewayService from "../../../shared/api/services/gateway.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { dataFetchReducer } from "../../../shared/model/fetchReducer";
import { Alert, Switch } from "@mui/material";
import "./styles.scss";

export const Create = () => {
  const [vendor, setVendor] = useState("");
  const [online, setOnline] = useState(false);

  // console.log(vendor, online);
  return (
    <div>
      <Stack className="modal_content_fields" direction="row" spacing={2}>
        <TextField
          size="small"
          className="margin"
          type="text"
          label="Vendor"
          value={vendor}
          onChange={({ target }) => {
            setVendor(target.value);
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Offline</Typography>
          <Switch
            value={online}
            onChange={(e) => setOnline(e.target.checked)}
          />
          <Typography>Online</Typography>
        </Stack>

        <LoadingButton
          type="submit"
          size="small"
          onClick={async (e) => {
            e.preventDefault();
            // try {
            //   dispatch({ type: "FETCH_INIT" });
            //   await GatewayService.create({ name, ip });
            //   handleClose();
            // } catch (e) {
            //   dispatch({ type: "FETCH_FAILURE" });
            // }
          }}
          variant="contained"
          // loading={isLoading}
        >
          Create
        </LoadingButton>
      </Stack>
    </div>
    // {/* {isError && (
    //     <Alert className="alert" severity="error">
    //       Change name or IP Address
    //     </Alert>
    //   )} */}
  );
};
