import Link from "next/link";

import { JoinCommunityButton } from "@/components/ui/JoinCommunityButton";

/*
 * The two hero affordances. The primary one is the shared CTA in its celeste
 * variant — the colour it always had here — wearing the same lift as its
 * neighbour. The secondary one is a single-use outlined variant: transparent,
 * white border, and the label itself carries a text shadow, because a filter on
 * a transparent button would trace the box and the border too.
 */
export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
      <JoinCommunityButton variant="celeste" className="w-full sm:w-auto" />
      <Link
        href="#que-hacemos"
        className="hero-outline-label-shadow w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-white hover:bg-white/10 text-white shadow-(--shadow-action-outline) transition-all duration-150 active:scale-98 drop-shadow-sm"
      >
        Quiénes somos
      </Link>
    </div>
  );
}
