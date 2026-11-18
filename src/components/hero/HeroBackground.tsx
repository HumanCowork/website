"use client";

import { TiltedTiles } from "@/components/ui/tilted-tiles";
import { HERO_IMAGES } from "@/lib/heroImages";

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <TiltedTiles
        images={HERO_IMAGES}
        columns={13}
        tilesPerColumn={6}
        rowGap={5}
        columnGap={5}
        perspective={750}
        rotateX={17}
        rotateY={4}
        rotateZ={-23}
        stagger={24}
        fadeTop={0}
        saturation={1.4500000000000002}
        duration={60}
        parallax={true}
        parallaxStrength={1.5}
        className="w-full h-full"
      />
    </div>
  );
}
