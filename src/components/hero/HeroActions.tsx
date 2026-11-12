import Link from "next/link";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
      <Link
        href="https://discord.gg/BXcWzan8x"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base sm:text-lg font-semibold bg-primary hover:bg-[#0e5b94] text-white shadow-sm transition-all duration-150 active:scale-98"
      >
        Presentar mi proyecto
      </Link>
      <Link
        href="https://discord.gg/BXcWzan8x"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-primary hover:bg-primary-subtle text-primary transition-all duration-150 active:scale-98"
      >
        Sumarme a la comunidad
      </Link>
    </div>
  );
}
