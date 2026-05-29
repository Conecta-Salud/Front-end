// src/services/api.ts
import axios, { AxiosHeaders } from "axios";
import { signOut } from "firebase/auth";
import { auth } from "./auth/firebase";
import { queryClient } from "../lib/queryClient";
import { env } from "../config/env";

const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  config.headers = AxiosHeaders.from(config.headers);

  config.headers.set("Accept", "application/json");

  const firebaseUser = auth.currentUser;

  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      queryClient.clear();

      if (auth.currentUser) {
        await signOut(auth);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
