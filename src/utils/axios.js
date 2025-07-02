import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Axios para rutas públicas (no incluye token)
export const axiosPublic = axios.create({
  baseURL: BASE_URL + "/api",
});

// Axios para rutas privadas (incluye token automáticamente si hay)
export const axiosPrivado = (token) =>
  axios.create({
    baseURL: BASE_URL + "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
