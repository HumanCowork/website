import { HeroTitle } from "./HeroTitle";
import { HeroSubtitle } from "./HeroSubtitle";
import { HeroActions } from "./HeroActions";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="h-full w-full flex flex-col justify-start items-center text-center px-4 sm:px-6 lg:px-8 pt-44 sm:pt-48 md:pt-52 relative overflow-hidden">
      <HeroBackground />
      <div className="w-full max-w-[94vw] 2xl:max-w-[90vw] mx-auto space-y-6 sm:space-y-8 flex flex-col items-center relative z-10">
        <HeroTitle />
        <HeroSubtitle />
        <HeroActions />
      </div>
    </section>
  );
}
