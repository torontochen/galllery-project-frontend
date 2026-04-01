import { useState } from "react";

import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error";

import { tokenLoader } from "./utils/auth";
import ArtistPage from "./pages/ArtistPage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { logoutAction } from "./pages/LogOut";

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
        element: <AuthenticationPage />,
        action: authAction,
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
