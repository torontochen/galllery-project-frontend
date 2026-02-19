import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
