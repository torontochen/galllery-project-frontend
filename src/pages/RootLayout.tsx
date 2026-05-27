import { useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useSubmit,
  useParams,
  useLocation,
} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserStore, useArtStore, useArtistStore } from "../store/store";
import { axiosPrivate } from "../api/axios";
import axios from "../api/axios";
import { Spinner } from "../components/Spinner";
import ToasterProvider from "../components/ToasterProvider";
import type { Art } from "../types";

export default function RootLayout() {
  const params = useParams();
  const location = useLocation();

  const {
    accessToken: token,
    tokenExpired: expired,
    user,
    setAccessToken,
    setUser,
    isInitializing,
    setIsInitializing,
    setBrowserWidth,
    setBrowserHeight,
  } = useUserStore();
  const { setArts, setFilteredArts, setViewingRoomArt, arts } = useArtStore();
  const { setArtists, setCurrentArtist } = useArtistStore();
  const navigate = useNavigate();

  useEffect(() => {
    setBrowserWidth(window.innerWidth);
    setBrowserHeight(window.innerHeight);
    if (location.state && location.state.message) return;
    const handleResize = () => {
      setBrowserWidth(window.innerWidth), setBrowserHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    setIsInitializing(true);
    const checkRefreshToken = async () => {
      try {
        const { data } = await axiosPrivate.post("/api/auth/refresh_token", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        // console.log("Token refreshed Layout:", data);

        // Update store with new tokens
        if (!user.uid) setUser(data.user);

        setAccessToken(data.access_token);
        if (!params.token) navigate("/", { replace: true });
      } catch (err) {
        console.log("Token check error:", err);
        // If the token is invalid or expired, mark it as expired in the store
        // setTokenExpired(true);
      }
    };

    const getAllArts = async () => {
      try {
        const { data } = await axios.get("/api/arts/");
        console.log("All arts:", data);
        setArts(data);

        setFilteredArts(data);
        setViewingRoomArt(data[0].image_url);
        setIsInitializing(false);
      } catch (err) {
        console.log("Error fetching arts:", err);
        setIsInitializing(false);
      }
    };

    const getAllArtists = async () => {
      try {
        const { data } = await axios.get("/api/auth/");
        console.log("All artists:", data);
        setArtists(data);
        setCurrentArtist(data[1]);
      } catch (err) {
        console.log("Error fetching artists:", err);
      }
    };

    checkRefreshToken();
    getAllArts();
    getAllArtists();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (token && user.shopping_cart && user.shopping_cart.arts.length > 0) {
      console.log("Arts", arts);
      console.log("user.shopping_cart.arts", user.shopping_cart.arts);
      const cartArts = user.shopping_cart.arts;
      let updatedArts: Art[] = [];
      arts.forEach((art: Art) => {
        const isInCart = cartArts.some((cartArt) => {
          // console.log("cartArt.art_id", cartArt);
          // console.log("art.uid", art);
          return cartArt.art_id === art.uid;
        });
        // console.log("isInCart", isInCart);
        if (!isInCart) {
          updatedArts.push(art);
        }
      });
      console.log("updatedArts", updatedArts);
      setFilteredArts(updatedArts);
    }

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
  }, [token, expired, user, arts]);

  return (
    <>
      <div className=" flex flex-col justify-start min-h-[100vh]">
        <ToasterProvider />
        <Header />
        {isInitializing && <Spinner />}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
