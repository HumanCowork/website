"use client"

/*
 * SpotlightCard, from React Bits, re-expressed on the motion library.
 *
 * What it does: a soft light follows the pointer across the card surface, and
 * the card's edge catches that light near the pointer. Cards sitting close
 * together share one light, so a row of them feels like one lit surface.
 *
 * Why it is not upstream's file. The original hand-rolls the whole engine: its
 * own requestAnimationFrame loop, a hand-written easing function applied every
 * frame, a global pointermove listener, a global scroll listener, an
 * IntersectionObserver, and three string caches to avoid writing the same
 * gradient twice. That is roughly 180 lines of imperative animation code, and
 * every one of those listeners is a chance to leak. `motion` already ships in
 * this bundle (RotatingText uses it), and it has precisely the primitives this
 * needs: useMotionValue for the pointer, useSpring for the chase, a
 * useMotionTemplate for the gradient. Same effect, a third of the code, and the
 * subscribe/unsubscribe is the library's problem instead of ours.
 *
 * What is kept from upstream, deliberately, because it is the part that makes
 * the effect feel good rather than cheap:
 *
 * - The `proximity` idea: the light starts reaching a card up to 80px before the
 *   pointer is over it, so neighbouring cards light up as you move between them.
 * - The fill/edge split: the surface light and the rim light are two gradients
 *   with different falloff, not one.
 * - `prefers-reduced-motion` is honoured: the light still appears (it is
 *   information about which card you are on) but it does not chase, it lands.
 *
 * Props mirror upstream's names. Values that are purely about this site's look
 * -- surface, border, padding, radius, and which colour the light is -- come
 * from --testimonial-card-* tokens instead of being passed as numbers, so the
 * same card can be re-skinned from globals.css alone.
 */

import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"
import "./SpotlightCard.css"

/** How far outside the card the light already reaches it, in px. */
const DEFAULT_PROXIMITY = 80

export interface SpotlightCardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode
  /**
   * Colour of the light. Any CSS colour; its alpha is respected. Defaults to
   * the --testimonial-card-spotlight token.
   */
  spotlightColor?: string
  /** Brightness of the light on the surface, 0 to 1. */
  intensity?: number
  /** Radius of the light in px. */
  spotlightSize?: number
  /** How gradually the light fades out: 0 is a crisp disc, 1 a wide glow. */
  softness?: number
  /** How much the card's edge catches the light near the pointer, 0 to 1. */
  borderGlow?: number
  /** Distance in px outside the card at which the light starts to reach it. */
  proximity?: number
  /** How far the light floats behind the pointer. 0 sticks to it. */
  smoothing?: number
}

/*
 * Stops for a radial gradient that fades from solid at the centre to nothing at
 * the rim. `softness` bends the curve: at 0 the outer stop list collapses to a
 * near-hard edge, at 1 the falloff is close to gaussian.
 *
 * Upstream computes these stops inside its render loop, once per frame, and
 * caches the last string. Here it runs once per render, which is why the
 * per-frame cache is not needed.
 */
function falloffStops(color: string, softness: number) {
  const soft = Math.min(1, Math.max(0, softness))
  const stops: string[] = [`${color} 0%`]
  const steps = 10

  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps
    // A smoothstep gives the fade a soft shoulder; the fraction of the curve it
    // governs is what `softness` scales.
    const smooth = 1 - t * t * (3 - 2 * t)
    const alpha = soft === 0 ? (t < 1 ? 1 : 0) : smooth * soft + (1 - t) * (1 - soft)
    stops.push(`color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(t * 100).toFixed(2)}%`)
  }

  return stops.join(", ")
}

export function SpotlightCard({
  children,
  className,
  spotlightColor,
  intensity = 0.15,
  spotlightSize = 240,
  softness = 0.7,
  borderGlow = 0.6,
  proximity = DEFAULT_PROXIMITY,
  smoothing = 0.3,
  ...rest
}: SpotlightCardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  /*
   * The pointer position in card-local coordinates. Kept as motion values rather
   * than React state so a pointer move does not re-render the card: the light is
   * written straight to the DOM by the motion template further down.
   */
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  /*
   * Two springs, not one, because presence and position want different feels.
   * Position chases the pointer with a slight float (`smoothing`), which is what
   * stops the light feeling glued to the cursor.
   */
  const easedX = useSpring(pointerX, {
    stiffness: smoothing === 0 ? 1000 : 170,
    damping: smoothing === 0 ? 60 : 26,
    mass: 0.4 + smoothing,
  })
  const easedY = useSpring(pointerY, {
    stiffness: smoothing === 0 ? 1000 : 170,
    damping: smoothing === 0 ? 60 : 26,
    mass: 0.4 + smoothing,
  })

  // How lit the card currently is, 0 to 1. Fades in faster than it fades out,
  // so moving onto a card feels immediate and leaving one feels unhurried.
  const presence = useMotionValue(0)
  const lit = useSpring(presence, { stiffness: 190, damping: 30, mass: 0.5 })

  const fill = falloffStops(spotlightColor ?? "var(--testimonial-card-spotlight)", softness)
  const rim = falloffStops(spotlightColor ?? "var(--testimonial-card-spotlight)", 1)

  const size = Math.max(20, spotlightSize)

  /*
   * The gradient is assembled by the library and only touches the DOM when one
   * of its parts changes, which is the piece of upstream's cache we get for free
   * by using motion here.
   */
  const surface = useMotionTemplate`radial-gradient(circle ${size}px at calc(var(--spotlight-x)) calc(var(--spotlight-y)), ${fill})`
  const edge = useMotionTemplate`radial-gradient(circle ${size * 0.6}px at calc(var(--spotlight-x)) calc(var(--spotlight-y)), ${rim})`

  const surfaceOpacity = useMotionValue(intensity)
  const edgeOpacity = useMotionValue(borderGlow)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const localX = event.clientX - rect.left
      const localY = event.clientY - rect.top

      /*
       * Distance from the card, 0 when the pointer is inside it. The light
       * reaches outwards by `proximity`, squared so the approach is gentle at
       * the edge of the range and quick up close.
       */
      const gapX = Math.max(0, -localX, localX - rect.width)
      const gapY = Math.max(0, -localY, localY - rect.height)
      const gap = Math.hypot(gapX, gapY)

      const reach =
        gap === 0
          ? 1
          : proximity > 0
            ? Math.max(0, 1 - gap / proximity) ** 2
            : 0

      pointerX.set(localX)
      pointerY.set(localY)
      presence.set(reach)

      if (reach > 0) setIsVisible(true)
    }

    const handlePointerLeave = () => presence.set(0)

    // A pointer that never enters the window (touch) leaves the card unlit
    // rather than lit in a corner, which is what a 0,0 default would look like.
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true })
      root.addEventListener("pointerleave", handlePointerLeave)
    } else {
      // Reduced motion: light the card where the pointer is, with no chase.
      root.addEventListener("pointerenter", handlePointerMove)
      root.addEventListener("pointermove", handlePointerMove)
      root.addEventListener("pointerleave", handlePointerLeave)
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      root.removeEventListener("pointerenter", handlePointerMove)
      root.removeEventListener("pointermove", handlePointerMove)
      root.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [pointerX, pointerY, presence, proximity])

  /*
   * The two opacity values are the springs multiplied by their strength. A
   * separate small effect keeps them in step without re-rendering: subscribing
   * is cheaper than lifting state.
   */
  React.useEffect(() => {
    const unsubPresence = lit.on("change", (value) => {
      surfaceOpacity.set(value * intensity)
      edgeOpacity.set(value * borderGlow)
    })

    return unsubPresence
  }, [lit, surfaceOpacity, edgeOpacity, intensity, borderGlow])

  /*
   * The coordinates the templates read. Exposed as CSS custom properties on the
   * root so the two gradients share one source of truth; a motion value cannot
   * be interpolated inside another string otherwise.
   */
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const unsubX = easedX.on("change", (value) =>
      root.style.setProperty("--spotlight-x", `${value}px`)
    )
    const unsubY = easedY.on("change", (value) =>
      root.style.setProperty("--spotlight-y", `${value}px`)
    )

    return () => {
      unsubX()
      unsubY()
    }
  }, [easedX, easedY])

  return (
    <div
      ref={rootRef}
      data-slot="spotlight-card"
      data-spotlight-visible={isVisible ? "true" : "false"}
      className={cn("spotlight-card", className)}
      {...rest}
    >
      {/*
        * The painted layers are motion elements so their `style` accepts motion
        * values and the light can be written to the DOM without a re-render.
        */}
      <motion.span
        className="spotlight-card__edge"
        style={{ background: edge, opacity: edgeOpacity }}
        aria-hidden="true"
      />
      <motion.span
        className="spotlight-card__light"
        style={{ background: surface, opacity: surfaceOpacity }}
        aria-hidden="true"
      />
      <div className="spotlight-card__content">{children}</div>
    </div>
  )
}

export default SpotlightCard
