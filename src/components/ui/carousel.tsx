"use client"

/*
 * Carousel primitive, from shadcn/ui, built on Embla.
 *
 * Kept close to upstream on purpose: this file is the reusable block, and every
 * decision about how the testimonials look belongs to the section that composes
 * it. The visual customising is the className passed by the caller plus the
 * --carousel-* tokens in Carousel.css, so the same primitive can drive a
 * different carousel later without being forked.
 *
 * Two departures from upstream:
 *
 * 1. Icons. Upstream imports ArrowLeft and ArrowRight from lucide-react, which
 *    this project does not have. Drawing them in CSS keeps the dependency list
 *    where it was and lets the arrows take the site's tokens, including their
 *    44x44 hit area.
 *
 * 2. Button variants. Upstream's control carries `variant="outline"` and
 *    `size="icon"`, which are shadcn Button variants this project never
 *    installed. The both-classes-below do the same job with our own CSS.
 */

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "@/lib/utils"
import "./Carousel.css"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("carousel", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="carousel-viewport"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "carousel-container",
          orientation === "vertical" && "carousel-container--vertical",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "carousel-item",
        orientation === "vertical" && "carousel-item--vertical",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      className={cn(
        "carousel-control carousel-control--previous",
        orientation === "vertical" && "carousel-control--vertical",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <span className="carousel-control__arrow" aria-hidden="true" />
      <span className="carousel-control__label">Anterior</span>
    </button>
  )
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      type="button"
      data-slot="carousel-next"
      className={cn(
        "carousel-control carousel-control--next",
        orientation === "vertical" && "carousel-control--vertical",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <span className="carousel-control__arrow" aria-hidden="true" />
      <span className="carousel-control__label">Siguiente</span>
    </button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
