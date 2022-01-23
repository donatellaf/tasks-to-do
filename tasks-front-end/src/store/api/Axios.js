import axios from "axios";
import { store } from "./../../App";
import { token } from "./admin/token";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AxiosInstance = axios.create({ baseURL: BASE_URL, timeout: 6000 });

AxiosInstance.defaults.timeout = 60000;

AxiosInstance.interceptors.request.use(
  (config) => {
    config.headers.post["Content-Type"] = "application-json";
    config.headers.patch["Content-Type"] = "application-json";
    config.headers.put["Content-Type"] = "application-json";
    const state = store.getState();
    const accessToken = token(state);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (request) => {
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (config) => {
    const state = store.getState();
    const accessToken = token(state);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (response) => {
    if (response.isAxiosError) {
      if (response.response?.status === 401) {
        store.dispatch({ type: "login/signOut", payload: null });
        return;
      }

      throw response;
    }
    return response.data;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default AxiosInstance;
