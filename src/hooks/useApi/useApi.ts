import axios from "axios";
import { useState, useEffect } from "react";

export type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useApi = <T>(apiUrl: string, query: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + query);
        if (response && response.data) setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, query]);

  return { data, loading, error };
};

export const useFakeStoreApi = <T>(query: string): ApiResponse<T> => {
  return useApi<T>("https://kts-store-api.glitch.me/api", query);
};

export default useApi;
