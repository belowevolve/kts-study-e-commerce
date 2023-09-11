import axios from "axios";
import { useState, useEffect } from "react";

export type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const API_URL = "https://kts-store-api.glitch.me/api";
const useApi = <T>(initialUrl: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + initialUrl);
        if (response && response.data) setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [initialUrl]);

  return { data, loading, error };
};

export default useApi;
