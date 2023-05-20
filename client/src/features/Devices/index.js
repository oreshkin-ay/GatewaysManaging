import React, { useReducer, useState } from "react";

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

export const Devices = ({ id, name, onClose }) => {

  return (
    <Modal open={!!id} onClose={onClose}>
      <Box
        className="modal_content"
        component="form"
        noValidate
        autoComplete="off"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {name}
        </Typography>

        <Create />

        <div className="modal_content_actions">
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
