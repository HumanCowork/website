"use client";

import Grainient from "@/components/ui/Grainient";
import { AboutSection } from "@/components/about/AboutSection";
import { JoinCommunityButton } from "@/components/ui/JoinCommunityButton";
import RotatingText from "@/components/ui/RotatingText";
import { useIsMobile } from "@/lib/useIsMobile";

import { CURTAIN_ROTATING_WORDS } from "./curtainRotatingWords";
import "./FeaturesCurtain.css";

/*
 * The rotating word's own parameters. Timings, effect and stagger are the
 * effect's configuration, not design values — the colours and the mask padding
 * come from tokens in globals.css. `highlightColor` is passed as a custom
 * property on purpose: the component then skips its automatic contrast colour
 * and the letters are painted by CSS, so no colour is written here.
 */
const ROTATING_WORD = {
  effect: "slide",
  direction: "up",
  highlight: true,
  highlightColor: "var(--curtain-rotating-highlight)",
  rotationInterval: 2300,
  staggerFrom: "last",
  staggerDuration: 0.015,
  splitLevelClassName: "overflow-hidden py-(--curtain-rotating-mask-padding)",
} as const;

import "./FeaturesCurtain.css";

export function FeaturesCurtain() {
  // The WebGL curtain is desktop-only: on a phone the fragment shader is the
  // single most expensive thing on the page, so it is never mounted there.
  // `bg-primary` on the section is the intended mobile backdrop.
  const isMobile = useIsMobile();

  return (
    <section
      id="que-hacemos"
      className="curtain-root relative z-20 w-full rounded-t-(--curtain-radius) border-t border-slate-200/20 bg-(--curtain-backdrop) shadow-(--curtain-edge-shadow)"
    >
      {/*
        Sticky, not fixed: this stage pins to the viewport for the whole length of
        the run that follows it, which is what separates phase 1 (title centred,
        still) from phase 2 (title leaves, second text arrives).
        `overflow-hidden` belongs here — never on an ancestor, which would break
        this element's own stickiness.
      */}
      <div className="curtain-stage sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 text-center sm:px-10 lg:px-16">
        {/* Fondo interactivo Grainient (solo escritorio) */}
        {!isMobile && (
          <div className="pointer-events-auto absolute inset-0 z-0 h-full w-full">
            <Grainient
              /*
               * The palette is a ramp around the brand celeste. The middle stop is
               * the official #0f70b7, exact; the two to its left darken it and the
               * two to its right lighten it, all on the same hue (205) so the effect
               * reads as one colour moving through light, not as five colours.
               *
               * Previous palette, in case this is reverted:
               *   #3171c4, #057eb2, #0695d4, #80add5, #bed5e9
               */
              colors={["#084b7d", "#0b5c98", "#0f70b7", "#1389dd", "#8dc4ec"]}
              angle={55}
              flow={0.95}
              silk={0.35}
              grainAmount={0}
              speed={2.55}
              grainSize={1.6}
              grainAnimated={false}
              stir={0.95}
              className="h-full w-full"
            />
          </div>
        )}

        <div className="curtain-swap relative z-10 mx-auto w-full max-w-(--curtain-max-width) lg:max-w-5xl 2xl:max-w-6xl">
          {/* Fase 1 — centrado y quieto, como siempre */}
          <div className="curtain-title flex w-full flex-col items-center space-y-6 sm:space-y-8">
            <h2 className="curtain-title-shadow w-full text-center text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block">El punto de encuentro</span>
              <span className="block">
                para <RotatingText texts={CURTAIN_ROTATING_WORDS} {...ROTATING_WORD} />
              </span>
              <span className="block">de tecnología en Córdoba.</span>
            </h2>
            <p className="curtain-subtitle-shadow w-full max-w-none text-center text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-2xl md:whitespace-nowrap lg:text-3xl">
              Sumate a la nueva generación de futuros empresarios.
            </p>

            {/*
              Fase 1 · CTA. It arrives on scroll rather than with the curtain, and
              is fully in well before the title starts to leave: both ends of that
              window are tokens, so it can be retimed without touching this markup.
            */}
            <div className="curtain-cta">
              <JoinCommunityButton variant="white" />
            </div>
          </div>

          {/*
            Fase 2 — la sección "Quiénes somos" toma el lugar del título. Su texto
            vive en src/components/about/aboutContent.ts; acá queda sólo el envoltorio
            que la coreografía de la cortina mueve.
          */}
          <div className="curtain-next-text w-full">
            <AboutSection />
          </div>
        </div>
      </div>

      {/* Recorrido extra que sólo existe cuando el efecto está soportado */}
      <div className="curtain-run" aria-hidden="true" />

      {/*
        La espera del final. Repite la cortesía del `--curtain-hold` de apertura,
        pero como distancia propia en lugar de como porción del recorrido: así el
        About se queda en pantalla y se lee antes de que llegue la banda de
        partners, y ninguna coreografía ya ajustada se mueve de lugar.
      */}
      <div className="curtain-tail" aria-hidden="true" />
    </section>
  );
}
