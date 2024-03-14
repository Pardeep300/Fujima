import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../config/extras";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(async (req: any) => {
  const token = await AsyncStorage.getItem("token");
  req.headers.Authorization = `Bearer ${token}`;
  req.headers = { ...req.headers };
  const headers = {
    ...req.headers,
    ...req.headers.common,
    ...req.headers[req.method],
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  ["common", "get", "post", "head", "put", "patch", "delete"].forEach(
    (header) => {
      delete headers[header];
    }
  );

  const printable = `${new Date()} | Request: ${req.method.toUpperCase()} | ${
    req.url
  } | ${JSON.stringify(req.data)} | ${JSON.stringify(headers)}`;
  console.log(printable);
  return req;
});

API.interceptors.response.use(
  async (res: any) => {
    return res;
  },
  (error: any) => {
    if (error.response?.status === 401) {
      throw error;
    }
    throw error;
  }
);

export default API;
