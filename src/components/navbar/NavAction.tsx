import Link from "next/link";

export function NavAction() {
  return (
    <Link
      href="https://discord.gg/BXcWzan8x"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1271b7] hover:bg-[#0e5b94] text-white shadow-sm transition-all duration-150 active:scale-98"
    >
      Sumate
    </Link>
  );
}
