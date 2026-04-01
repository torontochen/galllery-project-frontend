import axios from "axios";
import { useUserStore } from "../store/store";
const BASE_URL = "http://localhost:8000";

export default axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request Interceptor: Attach Access Token
axiosPrivate.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  console.log("Attaching token to request:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Token Refresh
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { setAccessToken, setTokenExpired } = useUserStore.getState();

      // if (refreshToken) {
      try {
        // Attempt to get a new access token
        const { data } = await axios.get(
          "http://localhost:8000/api/auth/refresh_token"
        );
        console.log("Token refreshed:", data);
        // Update store with new tokens
        setAccessToken(data.accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out
        // window.location.href = '/login';
        setTokenExpired(true);
        return Promise.reject(refreshError);
      }
      // }
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate };
