import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Snackbar } from "@mui/material";

import { Create as CreateGateway } from "./features/Gateway/Create";
import { List as GatewayList } from "./features/Gateway/List";
import { useDataApi } from "./entities/hooks/useDataApi";
import GatewayService from "./shared/api/services/gateway.service";
import { Devices } from "./features/Devices";
import { Search } from "./features/Search";
import { throttle } from "./shared/utils/throttle";
import "./App.css";

function App() {
  const [refetch, setRefetch] = useState({});
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [gatewayInfo, setGatewayInfo] = useState(null);

  const getList = useCallback(() => {
    return GatewayService.getList(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, refetch]);

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

  const throttled = useMemo(() => throttle(setQuery), []);

  return (
    <div className="App">
      <header className="header">
        <Search
          value={search}
          onChange={({ target: { value } }) => {
            setSearch(value);
            throttled(value);
          }}
        />
      </header>
      <main>
        <div>
          <CreateGateway onRefetch={setRefetch} />
          <Button
            onClick={async () => {
              try {
                await GatewayService.deleteAll();
                setRefetch({});
              } catch {
                handleSetError();
              }
            }}
            variant="contained"
          >
            Delete All
          </Button>
        </div>
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
