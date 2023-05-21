import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

import { Create } from "../Device/Create";
import { useDataApi } from "../../entities/hooks/useDataApi";
import GatewayService from "../../shared/api/services/gateway.service";
import DeviceService from "../../shared/api/services/device.service";
import { List } from "../Device/List";
import "./styles.scss";

export const Devices = ({ id, name, onClose, onSetError }) => {
  const [refetch, setRefetch] = useState({});

  const getList = useCallback(() => {
    return GatewayService.get(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refetch]);

  const [{ isLoading, data, isError }, dispatch] = useDataApi(
    { data: null, isLoading: true },
    getList
  );

  useEffect(() => {
    if (isError) onSetError();
  }, [onSetError, isError]);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        await DeviceService.delete(id)?.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            ...data,
            devices: data.devices.filter(({ _id }) => _id !== id),
          },
        });
      } catch (e) {
        onSetError();
      }
    },
    [data, onSetError, dispatch]
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

          <Create
            id={id}
            refetchList={useCallback(() => setRefetch({}), [])}
          />
        </div>

        <div className="list_wrapper">
          <List
            data={data?.devices}
            isLoading={isLoading}
            onDeleteRow={handleDeleteRow}
          />
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
