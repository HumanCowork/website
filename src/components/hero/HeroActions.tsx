import Link from "next/link";

import { JoinCommunityButton } from "@/components/ui/JoinCommunityButton";

/*
 * The two hero affordances. The primary one is the shared CTA in its celeste
 * variant — the colour it always had here — wearing the same lift as its
 * neighbour.
 *
 * The secondary one is now the inverse: a white surface with a celeste label, the
 * pair the client asked for. That is the same surface the curtain button uses, so
 * it reads --cta-inverted-* rather than naming a colour here; one white button and
 * the other cannot drift apart.
 *
 * The text shadow the outlined version carried is gone with the outline. It existed
 * to keep white type legible over the hero's moving photographs, and celeste on
 * white needs no help.
 */
export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
      <JoinCommunityButton variant="celeste" className="w-full sm:w-auto" />
      <Link
        href="#que-hacemos"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-(--cta-inverted-text) bg-white hover:bg-(--cta-inverted-hover) shadow-(--shadow-action-outline) transition-all duration-150 active:scale-98 sm:text-lg"
      >
        Quiénes somos
      </Link>
    </div>
  );
}
