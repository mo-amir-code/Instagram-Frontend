import axios from "axios";

export const httpAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ORIGIN
});