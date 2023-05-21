import React, { useCallback, useReducer, useState } from "react";
import Button from "@mui/material/Button";

import GatewayService from "../../../shared/api/services/gateway.service";
import { dataFetchReducer } from "../../../shared/model/fetchReducer";
import { CreateModal } from "../CreateModal";

import "./styles.scss";

export const Create = ({ onRefetch }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [{ isLoading, isError }, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
  });

  const handleOpen = () => setIsOpenModal(true);

  const handleClose = useCallback(() => {
    setIsOpenModal(false);
    dispatch({ type: "FETCH_CLEAR", payload: null });
  }, []);

  const handleCreate = useCallback(
    async (name, ip) => {
      try {
        dispatch({ type: "FETCH_INIT" });
        await GatewayService.create({ name, ip });
        handleClose();
        onRefetch({});
      } catch (e) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    },
    [handleClose, onRefetch]
  );

  return (
    <>
      <Button sx={{ m: 2 }} onClick={handleOpen} variant="contained">
        Create Gateway
      </Button>

      <CreateModal
        open={isOpenModal}
        isLoading={isLoading}
        isError={isError}
        onClose={handleClose}
        onCreate={handleCreate}
      />
    </>
  );
};
