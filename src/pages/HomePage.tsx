import React from "react";
import HeroSection from "../components/HeroSection";
import ArtistFeatured from "../components/ArtistFeatured";
import TheViewingRoom from "../components/TheViewingRoom";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ArtistFeatured />
      <TheViewingRoom />
    </>
  );
}
