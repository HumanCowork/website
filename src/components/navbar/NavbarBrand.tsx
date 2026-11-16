import Image from "next/image";
import Link from "next/link";

export function NavbarBrand() {
  return (
    <Link
      href="/"
      className="ml-(--navbar-logo-optical-pull) flex items-center gap-3 group transition-opacity hover:opacity-90"
      aria-label="Human Cowork - Inicio"
    >
      {/*
        The box is sized by --navbar-logo-size; the `sizes` hint must mirror that
        number. Point it too low and the browser downloads a variant smaller than
        the box, which is then upscaled and looks soft.
      */}
      <div className="relative size-(--navbar-logo-size) flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Human Cowork Logo"
          fill
          priority
          sizes="32px"
          className="object-contain"
        />
      </div>
      <div className="relative h-4 sm:h-4.5 w-28 sm:w-32 flex-shrink-0">
        <Image
          src="/images/wordmark.webp"
          alt="Human Cowork"
          fill
          priority
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
