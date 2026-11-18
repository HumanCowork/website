import Image from "next/image";

export function HeroTitle() {
  return (
    <div className="flex justify-center items-center w-full py-2">
      <div className="hero-logo-shadow relative w-80 sm:w-96 md:w-(--hero-logo-size-md) lg:w-(--hero-logo-size-lg) xl:w-(--hero-logo-size-xl) aspect-square">
        <Image
          src="/images/brand/logo-hero.webp"
          alt="Human Cowork Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
