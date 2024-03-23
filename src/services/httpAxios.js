import axios from "axios";

export const httpAxios = axios.create({
  baseURL: process.env.SERVER_ORIGIN,
  // baseURL: "http://localhost:8000",
});
