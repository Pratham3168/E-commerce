import apiClient from "../../lib/apiClient";
import { unwrap } from "../../lib/normalize";

export async function registerUser(payload) {
  return unwrap(await apiClient.post("/auth/register", payload));
}
export async function loginUser(payload) {
  const result = unwrap(await apiClient.post("/auth/login", payload));
  sessionStorage.setItem("ecommerce.authenticated", "true");
  sessionStorage.setItem("ecommerce.role", result.user?.role || "user");
  window.dispatchEvent(new Event("auth-change"));
  return result;
}
export async function logoutUser() {
  const result = unwrap(await apiClient.post("/auth/logout"));
  sessionStorage.removeItem("ecommerce.authenticated");
  sessionStorage.removeItem("ecommerce.role");
  window.dispatchEvent(new Event("auth-change"));
  return result;
}
export async function refreshAccessToken() {
  return unwrap(await apiClient.post("/auth/refresh-token"));
}
export async function changePassword(payload) {
  return unwrap(await apiClient.patch("/auth/change-password", payload));
}
export async function deleteAccount(password) {
  const result = unwrap(
    await apiClient.delete("/auth/delete-account", { data: { password } }),
  );
  sessionStorage.removeItem("ecommerce.authenticated");
  sessionStorage.removeItem("ecommerce.role");
  window.dispatchEvent(new Event("auth-change"));
  return result;
}
