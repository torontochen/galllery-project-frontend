import HeroSection from "../components/HeroSection";
import ArtistFeatured from "../components/ArtistFeatured";
import TheViewingRoom from "../components/TheViewingRoom";

export default function HomePage() {
  // const { isInitializing } = useUserStore();
  return (
    <>
      <HeroSection />
      <ArtistFeatured />
      <TheViewingRoom />
    </>
  );
}
