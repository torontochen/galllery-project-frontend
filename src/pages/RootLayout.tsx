import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="overflow-scroll w-full h-[100vh]">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
