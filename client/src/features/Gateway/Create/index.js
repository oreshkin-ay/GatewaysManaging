import React, { useReducer, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from "@mui/material";

import GatewayService from "../../../shared/api/services/gateway.service";
import { dataFetchReducer } from "../../../shared/model/fetchReducer";
import "./styles.scss";

export const Create = ({ onRefetch }) => {
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
    setIP("");
    setName("");
    dispatch({ type: "FETCH_CLEAR", payload: null });
  };

  // add reset list after create : key = {length from response}
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
          className="gateway_modal_content"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" component="h2">
            New gateway
          </Typography>

          <div className="gateway_modal_content_fields">
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

          <div className="gateway_modal_content_actions">
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
                    onRefetch({});
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
