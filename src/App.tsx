import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error";

import { tokenLoader, checkAuthLoader } from "./utils/auth";
import ArtistPage from "./pages/ArtistPage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage";
import ProfilePage from "./pages/ProfilePage";
import ExhibitionPage from "./pages/ExhibitionPage";
import ResetPassword from "./pages/ResetPassword";
import SpecificArtPage from "./pages/SpecificArtPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckOutPage from "./pages/CheckOutPage";
import ViewingRoomPage from "./pages/ViewingRoomPage";
import AboutUsPage from "./pages/AboutUsPage";
import UnderConstructionPage from "./pages/UnderConstructionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "artist", element: <ArtistPage /> },
      {
        path: "auth",
        // loader: checkAuthLoader,
        element: <AuthenticationPage />,
        action: authAction,
      },
      { path: "profile", loader: checkAuthLoader, element: <ProfilePage /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      {
        path: "exhibitions",
        element: <ExhibitionPage />,
      },
      {
        path: "viewing-room",
        element: <ViewingRoomPage />,
      },
      {
        path: "artists",
        element: <ArtistPage />,
      },
      {
        path: ":uid",
        element: <SpecificArtPage />,
      },
      {
        path: "shopping-cart",
        loader: checkAuthLoader,
        element: <ShoppingCartPage />,
      },
      {
        path: "checkout",
        loader: checkAuthLoader,
        element: <CheckOutPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "careers",
        element: <UnderConstructionPage />,
      },
      {
        path: "news",
        element: <UnderConstructionPage />,
      },
      {
        path: "press",
        element: <UnderConstructionPage />,
      },
      {
        path: "blog",
        element: <UnderConstructionPage />,
      },
      {
        path: "news-letter",
        element: <UnderConstructionPage />,
      },
      {
        path: "events",
        element: <UnderConstructionPage />,
      },
      {
        path: "help-center",
        element: <UnderConstructionPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
