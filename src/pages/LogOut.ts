import axios from "../api/axios";
import { useUserStore } from "../store/store";
import { redirect } from "react-router-dom";

export async function logoutAction() {
  const { clearUser, setTokenExpired } = useUserStore.getState();
  console.log("Logging out...");
  clearUser();
  //   setTokenExpired(false);
  return redirect("/auth");
  //   try {
  //     await axios.post("/api/auth/logout", null, {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     });
  //   } catch (err) {
  //     console.log("Logout error:", err);
  //   } finally {
  //     return;
  //   }
}
