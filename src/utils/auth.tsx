import { redirect, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useUserStore } from "../store/store";
import toast from "react-hot-toast";

export function getAuthToken() {
  const accessToken = useUserStore.getState().accessToken;
  console.log("Access token from getAuthToken:", accessToken);
  return accessToken;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
    // return navigate("/");
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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  // roundingIncrement: 5,
  // trailingZeroDisplay: "auto",
});
export const currencyFormatter = (price: number) => formatter.format(price);
