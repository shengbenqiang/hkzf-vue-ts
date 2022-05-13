import axios from "axios";
import { Notify } from "vant";
import { AxiosConfig } from "@/untils/ServiceType";
import { getToken } from "@/untils/solve";

const axiosConfig: AxiosConfig = {
  baseURL: "",
  timeout: 15000,
  withCredentials: true,
};

const errorHandle = (status: number, msg: string) => {
  switch (status) {
    case 401:
      Notify({ type: "danger", message: msg });
      break;
    case 403:
      Notify({ type: "danger", message: msg });
      break;
    case 404:
      Notify({ type: "danger", message: msg });
      break;
    default:
      Notify({ type: "danger", message: msg });
  }
};

const service = axios.create(axiosConfig);

service.interceptors.request.use(
  (config) => {
    if (
      config.url?.startsWith("/user") &&
      !config.url?.startsWith("/user/login") &&
      !config.url?.startsWith("/user/registered")
    ) {
      config.headers!.Authorization = getToken() as string;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => {
    if (response.data.status === 200) {
      return response;
    }
  },
  (error) => {
    if (error) {
      errorHandle(error.response.data.status, error.response.data.description);
    }
  }
);

export default service;
