import React, { useReducer, useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GatewayService from "../../../shared/api/services/gateway.service";
import LoadingButton from "@mui/lab/LoadingButton";
import "./styles.scss";
import { dataFetchReducer } from "../../../shared/model/fetchReducer";
import { Alert } from "@mui/material";

export const Create = () => {
  const [name, setName] = useState("");
  const [ip, setIP] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [{ isLoading, isError }, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
  });

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => {
    setIsOpenModal(false);
    dispatch({ type: "FETCH_CLEAR", payload: null });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Create Gateway
      </Button>

      <Button
        onClick={() => {
          GatewayService.deleteAll();
        }}
        variant="contained"
      >
        Delete All
      </Button>

      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="modal_content"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New gateway
          </Typography>

          <div className="modal_content_fields">
            <Stack direction="row" spacing={2}>
              <TextField
                className="margin"
                type="text"
                label="Name"
                value={name}
                onChange={({ target }) => {
                  setName(target.value);
                }}
              />
              <TextField
                placeholder="10.10.1.1"
                label="IPv4 address"
                value={ip}
                onChange={({ target }) => {
                  setIP(target.value);
                }}
              />
            </Stack>
          </div>
          {isError && (
            <Alert className="alert" severity="error">
              Change name or IP Address
            </Alert>
          )}

          <div className="modal_content_actions">
            <Stack direction="row" spacing={2}>
              <Button className="margin" onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    dispatch({ type: "FETCH_INIT" });
                    await GatewayService.create({ name, ip });
                    handleClose();
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
        </Box>
      </Modal>
    </>
  );
};
