/*
 * Types for the JavaScript RotatingText component, written from its published
 * props table so the component itself can stay byte-for-byte as React Bits
 * ships it. Nothing here changes runtime behaviour: it only tells TypeScript
 * what the component accepts.
 */
import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";

/** Imperative handle exposed through the ref. */
export interface RotatingTextHandle {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export type RotatingTextEffect = "slide" | "flip" | "blur" | "scale" | "drop";
export type RotatingTextDirection = "up" | "down";
export type RotatingTextStaggerFrom = "first" | "last" | "center" | "random" | number;
export type RotatingTextSplitBy = "characters" | "words" | "lines" | (string & {});

export interface RotatingTextProps {
  /** The texts to rotate through. */
  texts?: string[];
  /** How letters swap. */
  effect?: RotatingTextEffect;
  /** Which way letters travel. */
  direction?: RotatingTextDirection;
  /** Puts the text on a coloured block that resizes to fit each new text. */
  highlight?: boolean;
  /** Colour of the highlight block. Hex, rgb or a CSS custom property. */
  highlightColor?: string;
  /** Time each text stays on screen, in milliseconds. */
  rotationInterval?: number;
  /** Blurs letters as they come and go, in px. */
  blur?: number;
  /** Delay between letters, in seconds. */
  staggerDuration?: number;
  /** Which letter moves first. */
  staggerFrom?: RotatingTextStaggerFrom;
  /** How each text is split into moving pieces. */
  splitBy?: RotatingTextSplitBy;
  /** Goes back to the first text after the last one. */
  loop?: boolean;
  /** Rotates on its own. Turn off to drive it with the ref methods. */
  auto?: boolean;
  /** Holds the current text while the pointer is over it. */
  pauseOnHover?: boolean;
  /** Overrides the state each letter enters from. */
  initial?: object;
  /** Overrides the state each letter settles into. */
  animate?: object;
  /** Overrides the state each letter leaves to. */
  exit?: object;
  /** Overrides the Motion transition used for every letter. */
  transition?: object;
  /** 'wait' lets the old text leave before the new one enters. */
  animatePresenceMode?: "wait" | "sync";
  /** Animates the first text in on mount. */
  animatePresenceInitial?: boolean;
  /** Called with the new index whenever the text changes. */
  onNext?: (index: number) => void;
  /** Extra class names for the outer element. */
  mainClassName?: string;
  /** Extra class names for each group of letters. */
  splitLevelClassName?: string;
  /** Extra class names for each moving letter. */
  elementLevelClassName?: string;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: (event: unknown) => void;
  onMouseLeave?: (event: unknown) => void;
}

declare const RotatingText: ForwardRefExoticComponent<
  RotatingTextProps & RefAttributes<RotatingTextHandle>
>;

export default RotatingText;
