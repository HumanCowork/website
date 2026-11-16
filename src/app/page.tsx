import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { FeaturesCurtain } from "@/components/features/FeaturesCurtain";
import { ProcessSection } from "@/components/process/ProcessSection";
import { CommunityCases } from "@/components/community/CommunityCases";
import { PartnersSection } from "@/components/partners/PartnersSection";
import { DiagnosticsBeacon } from "@/components/DiagnosticsBeacon";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-slate-900">
      <DiagnosticsBeacon />
      <Navbar />
      {/* Contenedor del Hero con altura de pista para el efecto cortina */}
      <div className="relative h-screen w-full">
        <div className="fixed inset-0 h-screen w-full pointer-events-auto">
          <Hero />
        </div>
      </div>
      {/* Cortina que sube por encima del Hero */}
      <FeaturesCurtain />
      {/* Etapas del proceso: escenario pinneado, riel que viaja al costado */}
      <ProcessSection />
      {/* Casos de la comunidad: banda propia entre las etapas y los partners */}
      <CommunityCases />
      {/* Banda de partners: superficie propia, fuera de la cortina */}
      <PartnersSection />
    </div>
  );
}
