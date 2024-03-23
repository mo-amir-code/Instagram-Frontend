import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://instagram-backend-amir.vercel.app",
  // baseURL: "http://localhost:8000",
});
