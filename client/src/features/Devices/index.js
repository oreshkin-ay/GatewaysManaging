import React, { useCallback, useReducer, useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Checkbox, FormControlLabel, Switch } from "@mui/material";
import "./styles.scss";
import { Create } from "../Device/Create";
import { dataFetchReducer } from "../../shared/model/fetchReducer";
import { useDataApi } from "../../entities/hooks/useDataApi";
import gatewayService from "../../shared/api/services/gateway.service";

export const Devices = ({ id, name, onClose }) => {
  const [refetch, setRefetch] = useState({});

  const getList = useCallback(() => {
    return gatewayService.get(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refetch]);

  const { isLoading, data, isError } = useDataApi(
    { data: null, isLoading: true },
    getList
  );

  return (
    <Modal open onClose={onClose}>
      <Box
        className="devices_modal_content"
        component="form"
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography className="title" variant="h6" component="h2">
            {name}
          </Typography>

          <Create id={id} refetchList={useCallback(() => setRefetch({}), [])} />
        </div>
        <div className="devices_modal_content_actions">
          <Stack direction="row" spacing={2}>
            <Button className="margin" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
};
