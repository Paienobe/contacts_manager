import axios from "axios";
import { BASE_API } from "../config";

export const authInstance = axios.create({
  baseURL: `${BASE_API}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
