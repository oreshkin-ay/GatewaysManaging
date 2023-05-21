import React, { useReducer, useState } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DeviceService from "../../../shared/api/services/device.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { dataFetchReducer } from "../../../shared/model/fetchReducer";
import { Alert, Switch } from "@mui/material";
import "./styles.scss";

export const Create = ({ id, refetchList }) => {
  const [vendor, setVendor] = useState("");
  const [online, setOnline] = useState(false);

  const [{ isLoading, isError }, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
  });

  return (
    <>
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
              try {
                dispatch({ type: "FETCH_INIT" });
                await DeviceService.create({ id, vendor, online });
                dispatch({ type: "FETCH_CLEAR", payload: null });
                refetchList();
              } catch (e) {
                dispatch({ type: "FETCH_FAILURE" });
              }
            }}
            variant="contained"
            loading={isLoading}
          >
            Create
          </LoadingButton>
        </Stack>
      </div>
      {isError && (
        <Alert className="alert" severity="error">
          Can't create device
        </Alert>
      )}
    </>
  );
};
