import { HeroTitle } from "./HeroTitle";
import { HeroSubtitle } from "./HeroSubtitle";
import { HeroActions } from "./HeroActions";
import { HeroBackground } from "./HeroBackground";

import "./Hero.css";

export function Hero() {
  return (
    <section className="h-full w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <HeroBackground />
      <div className="w-full max-w-(--hero-max-width) 2xl:max-w-(--hero-max-width-wide) mx-auto space-y-5 sm:space-y-6 flex flex-col items-center justify-center relative z-10 pt-16 sm:pt-20">
        <HeroTitle />
        <HeroSubtitle />
        <HeroActions />
      </div>
    </section>
  );
}
