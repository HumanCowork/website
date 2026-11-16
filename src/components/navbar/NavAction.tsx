import Link from "next/link";

import { DISCORD_INVITE_URL } from "@/lib/links";

export function NavAction() {
  return (
    <Link
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary hover:bg-primary-hover text-white shadow-sm transition-all duration-150 active:scale-98"
    >
      Sumate
    </Link>
  );
}
