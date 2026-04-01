import { redirect } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import axios from "../api/axios";
import { useUserStore } from "../store/store";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

export async function logoutAction() {
  const { clearUser, setTokenExpired } = useUserStore.getState();
  console.log("Logging out...");
  try {
    await axiosPrivate.post("/api/auth/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (err) {
    console.log("Logout error:", err);
  } finally {
    clearUser();
    setTokenExpired(false);
    redirect("/auth");
  }
}
