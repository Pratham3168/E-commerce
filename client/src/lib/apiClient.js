import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// let refreshPromise = null;

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response?.status !== 401 ||
//       sessionStorage.getItem("ecommerce.authenticated") !== "true" ||
//       originalRequest?._retry ||
//       originalRequest?.url?.includes("/auth/refresh-token")
//     ) {
//       return Promise.reject(error);
//     }
//     originalRequest._retry = true;
//     refreshPromise ||= apiClient.post("/auth/refresh-token").finally(() => {
//       refreshPromise = null;
//     });
//     try {
//       await refreshPromise;
//       return apiClient(originalRequest);
//     } catch {
//       sessionStorage.removeItem("ecommerce.authenticated");
//       return Promise.reject(error);
//     }
//   },
// );



let refreshPromise = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      sessionStorage.getItem("ecommerce.authenticated") !== "true" ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    refreshPromise ||= apiClient
      .post("/auth/refresh-token")
      .finally(() => {
        refreshPromise = null;
      });

    try {
      await refreshPromise;
      return apiClient(originalRequest);
    } catch {
      sessionStorage.removeItem("ecommerce.authenticated");
      sessionStorage.removeItem("ecommerce.role");
      window.dispatchEvent(new Event("auth-change"));

      return Promise.reject(error);
    }
  },
);


export default apiClient;
