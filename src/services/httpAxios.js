import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://instagram-fullstack-amir.vercel.app",
  // baseURL: "http://localhost:8000",
});
