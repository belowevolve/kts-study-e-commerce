import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { makeObservable, action } from "mobx";
import { HTTPMethod } from "./config";

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

      //When i send data: {}, api return Cross-Origin Request Blocked
      if (Object.keys(data).length > 0) {
        axiosConfig.data = data;
      }
      const response: AxiosResponse<TData> = await axios(axiosConfig);

      return { success: true, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error:
          (axiosError.response?.data as TError) ??
          (axiosError.message as TError),
      };
    }
  }
}

export default ApiStore;
