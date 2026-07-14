import Background from "./components/Background";
import HomeHero from "./components/HomeHero";
import HomeContent from "./components/HomeContent";
import UserMenu from "./components/UserMenu";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505]">
      <Background />
      <UserMenu />
      <HomeHero />
      <HomeContent />
    </main>
  );
}