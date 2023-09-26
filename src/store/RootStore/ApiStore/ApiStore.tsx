import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { makeObservable, action } from "mobx";
import { HTTPMethod } from "config/globalEnums";

export type ApiResponse<TData, TError> = {
  success: boolean;
  data?: TData;
  error?: TError;
};

interface RequestConfig extends AxiosRequestConfig {
  method: HTTPMethod;
  endpoint: string;
}

class ApiStore {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    makeObservable(this, {
      request: action,
    });
  }

  async request<TData, TError = string>({
    method,
    data,
    headers,
    endpoint,
  }: RequestConfig): Promise<ApiResponse<TData, TError>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        url: endpoint,
        method: method,
        baseURL: this.baseUrl,
        headers: headers,
      };
      if (Object.keys(data).length > 0) {
        axiosConfig.data = data;
      }

      const response: AxiosResponse<TData> = await axios(axiosConfig);

      return { success: true, data: response.data };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data ?? error.message,
        };
      } else {
        return {
          success: false,
        };
      }
    }
  }
}

export default ApiStore;
