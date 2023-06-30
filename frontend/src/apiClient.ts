import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "/",
  headers: { "Content-type": "application/json" },
});

export default apiClient;
