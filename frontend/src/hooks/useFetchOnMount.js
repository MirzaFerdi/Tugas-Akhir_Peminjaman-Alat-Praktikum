import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useLoader } from "./useLoader";

export const useFetchOnMount = ({
  url: url,
  method: method = "GET",
  body: body = null,
  onSuccess: onSuccess = null,
  onError: onError = null,
}) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const { startLoad, endLoad } = useLoader();

  // fetch data when component first rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoad();

        const response = await api({
          url: url,
          method: method,
          data: body,
        });

        if (response.status === 200) {
          if (onSuccess) {
            onSuccess(response?.data);
          }
          setData(response?.data);
        }
      } catch (error) {
        if (error?.response) {
          if (onError) {
            onError(error?.response?.data);
          }
          setError(error?.response?.data);
        }
      } finally {
        endLoad();
      }
    };

    fetchData();
  }, [body, method, onError, onSuccess, url]);

  return {
    data,
    error,
  };
};
