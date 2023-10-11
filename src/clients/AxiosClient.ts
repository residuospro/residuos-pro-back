import axios, { AxiosInstance } from "axios";

let restClient: AxiosInstance;

export const setupClient = (baseUrl: string | undefined) => {
  restClient = axios.create({
    baseURL: baseUrl,
  });
};

export const setBearerAuthorization = (
  client: AxiosInstance,
  token: string
) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const useClient = () => restClient;
