import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://94.131.246.109:5555/";
const DEMO_API_KEY = "2";

const axiosConfig: AxiosRequestConfig = {
  responseType: "json",
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": DEMO_API_KEY,
  },
};

export const apiService = axios.create(axiosConfig);
