import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from "@mui/material";

import "./styles.scss";

export const CreateModal = ({
  isError,
  isLoading,
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [ip, setIP] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    onCreate?.(name, ip);
  };

  useEffect(() => {
    if (!open) {
      setIP("");
      setName("");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
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
            <Button className="margin" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              onClick={handleCreate}
              variant="contained"
              loading={isLoading}
            >
              Create
            </LoadingButton>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
};
