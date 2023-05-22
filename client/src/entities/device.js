import React, { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import "./styles.scss";

export const CreateGateway = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Create Gateway
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
            <TextField type="text" label="Name"></TextField>
            <TextField placeholder="10.10.1.1" label="IPv4 address" />
          </div>

          <Button onClick={handleOpen} variant="contained">
            Create Gateway
          </Button>
        </Box>
      </Modal>
    </>
  );
};
