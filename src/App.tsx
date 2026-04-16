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
import ResetPassword from "./pages/ResetPassword";

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
        loader: checkAuthLoader,
        element: <AuthenticationPage />,
        action: authAction,
      },
      { path: "profile", loader: checkAuthLoader, element: <ProfilePage /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
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
