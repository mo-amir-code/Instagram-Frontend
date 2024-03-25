import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://instagram-backend-w2k6.onrender.com"
});