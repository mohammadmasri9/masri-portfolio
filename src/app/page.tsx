import { Contact, Footer } from "@/components/closing";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Launcher } from "@/components/launcher";
import { Nav } from "@/components/nav";
import { PaletteProvider } from "@/components/palette";
import { Process } from "@/components/process";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <PaletteProvider>
      <Nav />
      <main>
        <Hero />
        <Launcher />
        <Work />
        <Process />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </PaletteProvider>
  );
}
