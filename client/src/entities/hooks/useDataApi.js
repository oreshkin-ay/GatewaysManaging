import { useEffect, useReducer } from "react";
import { dataFetchReducer } from "../../shared/model/fetchReducer";

export const useDataApi = ({ data, isLoading = false }, callbackFetch) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading,
    isError: false,
    data,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await callbackFetch();

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [callbackFetch]);

  return [state, dispatch];
};
