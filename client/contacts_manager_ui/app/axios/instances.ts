import axios from "axios";
import { BASE_API } from "../config";

export const authInstance = axios.create({
  baseURL: `${BASE_API}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contactsInstance = axios.create({
  baseURL: `${BASE_API}/contacts`,
  headers: {
    "Content-Type": "application/json",
  },
});
