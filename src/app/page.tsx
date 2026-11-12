import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { FeaturesCurtain } from "@/components/features/FeaturesCurtain";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <Navbar />
      {/* Contenedor del Hero con altura de pista para el efecto cortina */}
      <div className="relative h-screen w-full">
        <div className="fixed inset-0 h-screen w-full pointer-events-auto">
          <Hero />
        </div>
      </div>
      {/* Cortina blanca que sube por encima del Hero */}
      <FeaturesCurtain />
    </div>
  );
}
