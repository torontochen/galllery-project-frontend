import { redirect } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useUserStore } from "../store/store";
import toast from "react-hot-toast";

export function getAuthToken() {
  const accessToken = useUserStore.getState().accessToken;
  return accessToken;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
}

export async function logoutAction() {
  const { clearUser, setTokenExpired } = useUserStore.getState();
  // console.log("Logging out...");
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
    toast.success("Logged out successfully!");
    redirect("/");
  }
}
