import Link from "next/link";

import { DISCORD_INVITE_URL } from "@/lib/links";

/*
 * The primary call to action. One definition for every place it appears, so the
 * label, the destination and the size can never drift between the hero and the
 * curtain. Callers pass the surface variant plus layout constraints, such as
 * making it full width on phones.
 *
 * The two variants keep their old look: the hero one is celeste, as it always
 * was, and the curtain one is the inverted white surface with a celeste label.
 * Each carries the shadow that suits the field it sits on — the hero's media
 * needs the stronger outline-strength lift, the flat curtain blue does not.
 *
 * Every value here is either a token-backed utility or the project's own spacing
 * and type scale — nothing is written as a raw value.
 */
const VARIANTS = {
  celeste: "bg-primary text-white hover:bg-primary-hover shadow-(--shadow-action-outline)",
  white: "bg-white text-(--cta-inverted-text) hover:bg-(--cta-inverted-hover) shadow-action",
} as const;

export function JoinCommunityButton({
  variant = "celeste",
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <Link
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-150 active:scale-98 sm:text-lg ${VARIANTS[variant]} ${className}`}
    >
      Sumate a la comunidad
    </Link>
  );
}
