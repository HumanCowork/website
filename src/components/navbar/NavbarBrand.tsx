import Image from "next/image";
import Link from "next/link";

export function NavbarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group transition-opacity hover:opacity-90"
      aria-label="Human Cowork - Inicio"
    >
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Human Cowork Logo"
          fill
          priority
          sizes="(max-width: 640px) 36px, 40px"
          className="object-contain"
        />
      </div>
      <span className="font-semibold text-sm sm:text-base tracking-tight text-[#0f172a]">
        Human Cowork
      </span>
    </Link>
  );
}
