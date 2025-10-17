import axios from "axios";

export const axiosInstamce = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3300/api"
      : "/api",
  withCredentials: true,
});
