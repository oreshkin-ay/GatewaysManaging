import React, { useCallback, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

import { Create as CreateGateway } from "./features/Gateway/Create";
import { List as GatewayList } from "./features/Gateway/List";
import { useDataApi } from "./entities/hooks/useDataApi";
import GatewayService from "./shared/api/services/gateway.service";
import { Devices } from "./features/Devices";
import "./App.css";

function App() {
  const [refetch, setRefetch] = useState({});
  const [search, setSearch] = useState("");
  const [gatewayInfo, setGatewayInfo] = useState({
    id: "6469de48c0cca48bb7d194e1",
    name: "df",
  });
  // const [gatewayId, setGatewayInfoId] = useState(null);

  const getList = useCallback(() => {
    return GatewayService.getList(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refetch]);

  const [{ isLoading, data, isError }, dispatch] = useDataApi(
    { data: null, isLoading: true },
    getList
  );

  const [isGeneralError, setIsGeneralError] = useState(isError);

  useEffect(() => {
    setIsGeneralError(isError);
  }, [isError]);

  const handleDeleteGateway = useCallback(async (id) => {
    try {
      setIsGeneralError(false);
      await GatewayService.delete(id);
      setRefetch({});
    } catch (e) {
      setIsGeneralError(true);
    }
  }, []);

  const onCloseDevicesModal = useCallback(() => setGatewayInfo(null), []);

  const handleSetError = useCallback(() => {
    dispatch({ type: "FETCH_FAILURE" });
  }, [dispatch]);

  return (
    <div className="App">
      <header>header</header>
      <main>
        <CreateGateway />
        <GatewayList
          isLoading={isLoading}
          onDeleteRow={handleDeleteGateway}
          isError={isGeneralError}
          data={data}
          onShowDevices={useCallback((data) => setGatewayInfo(data), [])}
        />
      </main>

      {!!gatewayInfo?.id && (
        <Devices
          id={gatewayInfo?.id}
          name={gatewayInfo?.name}
          onClose={onCloseDevicesModal}
          onSetError={handleSetError}
        />
      )}
      <Snackbar
        open={isGeneralError}
        autoHideDuration={3000}
        onClose={() => setIsGeneralError(false)}
        message="Something went wrong please. Try again"
      />
    </div>
  );
}

export default App;
