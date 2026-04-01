import { useEffect } from "react";
import { Outlet, useNavigate, useSubmit } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserStore } from "../store/store";
import { axiosPrivate } from "../api/axios";
// import { logout } from "../utils/auth";

export default function RootLayout() {
  const {
    accessToken: token,
    tokenExpired: expired,
    user,
    setAccessToken,
    setUser,
  } = useUserStore();
  const navigate = useNavigate();
  const submit = useSubmit();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const { data } = await axiosPrivate.post("/api/auth/refresh_token", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log("Token refreshed Layout:", data);

        // Update store with new tokens
        if (!user.uid) setUser(data.user);

        setAccessToken(data.access_token);
      } catch (err) {
        console.log("Token check error:", err);
        // If the token is invalid or expired, mark it as expired in the store
        // setTokenExpired(true);
      }
    };
    // if (token) {
    checkTokenValidity();
    // }
  }, []);

  useEffect(() => {
    if (token && expired) {
      navigate("/logout", { replace: true });
      return;
    }

    if (!token) {
      return;
    }

    // if (token === 'EXPIRED') {
    //   submit(null, { action: '/logout', method: 'post' });
    //   return;
    // }

    // const tokenDuration = getTokenDuration();
    // console.log(tokenDuration);

    // setTimeout(() => {
    //   submit(null, { action: '/logout', method: 'post' });
    // }, tokenDuration);
  }, [token, expired, navigate, submit]);

  return (
    <>
      <div className=" flex flex-col justify-between min-h-[100vh]">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
