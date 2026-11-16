"use client";

import { useCallback, useSyncExternalStore } from "react";

import { MOBILE_MAX_WIDTH_QUERY } from "@/lib/breakpoints";

function subscribe(onStoreChange: () => void) {
  const mediaQueryList = window.matchMedia(MOBILE_MAX_WIDTH_QUERY);
  mediaQueryList.addEventListener("change", onStoreChange);
  return () => mediaQueryList.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_MAX_WIDTH_QUERY).matches;
}

/**
 * Server and pre-hydration render report `true`.
 *
 * The expensive rendering paths (WebGL backgrounds, long animation loops) are
 * opt-in on the desktop side, so the cheap path is the safe default: a phone
 * never mounts the heavy tree, not even for the first frame.
 */
function getServerSnapshot() {
  return true;
}

/** Whether the viewport is currently below Tailwind's `md` breakpoint. */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
