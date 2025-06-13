import axios from "axios";

export const openaiApi = axios.create({
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
});
