import axios from "axios";

export const httpAxios = axios.create({
  baseURL: process.env.VITE_SERVER_ORIGIN,
  // baseURL: "http://localhost:8000",
});
