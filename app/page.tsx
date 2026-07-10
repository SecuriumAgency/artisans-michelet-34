import { Hero } from "@/components/sections/Hero";
import { BackgroundCanvasLoader } from "@/components/three/BackgroundCanvasLoader";

export default function Home() {
  return (
    <main className="relative flex-1 bg-michelet-dark">
      <BackgroundCanvasLoader />
      <Hero />
    </main>
  );
}
