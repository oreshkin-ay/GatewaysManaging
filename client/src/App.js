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
    id: "6468bc609a7d4b9cefc3a530",
    name: "df",
  });
  // const [gatewayId, setGatewayInfoId] = useState(null);

  const getList = useCallback(() => {
    return GatewayService.getList(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refetch]);

  const { isLoading, data, isError } = useDataApi(
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

  console.log("gatewayId", gatewayInfo);

  const onCloseDevicesModal = useCallback(() => setGatewayInfo(null), []);

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
