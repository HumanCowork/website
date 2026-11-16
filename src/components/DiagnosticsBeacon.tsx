"use client";

import { useEffect } from "react";

type Sample = {
  t: number;
  plane: string;
  canvas: string;
  grainTime: string;
};

// Temporary instrument: reports real browser capabilities for the two effects.
const capabilities = () => {
  const canvas = document.querySelector<HTMLCanvasElement>(".grainient-canvas");
  const container = document.querySelector(".grainient-container");

  let webgl2: string;
  try {
    webgl2 = document.createElement("canvas").getContext("webgl2") ? "yes" : "null";
  } catch (error) {
    webgl2 = `throw: ${(error as Error).message}`;
  }

  let renderer = "unknown";
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    renderer = ext ? String(gl?.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "no-debug-ext";
  } catch {
    renderer = "probe-failed";
  }

  return {
    ua: navigator.userAgent,
    url: location.href,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl2,
    renderer,
    grainContainer: container
      ? `client ${container.clientWidth}x${container.clientHeight}`
      : "MISSING",
    grainCanvas: canvas
      ? `attr ${canvas.width}x${canvas.height} client ${canvas.clientWidth}x${canvas.clientHeight}`
      : "MISSING",
  };
};

// Reads the live WebGL framebuffer to see whether the shader keeps producing new frames.
const canvasFingerprint = (canvas: HTMLCanvasElement | null): string => {
  if (!canvas) return "MISSING";
  try {
    const gl = canvas.getContext("webgl2");
    if (!gl) return "no-gl";
    const pixels = new Uint8Array(4 * 256);
    gl.readPixels(0, 0, 16, 16, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let sum = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      sum = (sum * 31 + pixels[i] + pixels[i + 1] * 3 + pixels[i + 2] * 7) % 1000000007;
    }
    return String(sum);
  } catch (error) {
    return `err: ${(error as Error).message}`;
  }
};

const planeFingerprint = (): string => {
  const plane = document.querySelector<HTMLElement>('[style*="rotateX"]');
  return plane?.style.transform ?? "MISSING";
};

/*
 * Splits an element's text into the lines the browser actually rendered, by
 * measuring each word with a Range and grouping by vertical position. Reading
 * the source only tells you where the line breaks are in the JSX, and JSX text
 * still wraps by width — so the source cannot answer "what does the last line
 * say on a 1440px screen".
 */
const renderedLines = (element: HTMLElement | null): string[] | string => {
  if (!element) return "MISSING";
  const lines: Array<{ top: number; parts: Array<{ left: number; text: string }> }> = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const chunks = (node.textContent ?? "").split(/(\s+)/);
    let offset = 0;
    for (const chunk of chunks) {
      const start = offset;
      offset += chunk.length;
      if (!chunk.trim()) continue;
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, offset);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      const top = Math.round(rect.top);
      let line = lines.find((l) => Math.abs(l.top - top) <= 2);
      if (!line) {
        line = { top, parts: [] };
        lines.push(line);
      }
      line.parts.push({ left: rect.left, text: chunk });
    }
  }
  return lines
    .sort((a, b) => a.top - b.top)
    .map((l) =>
      l.parts
        .sort((a, b) => a.left - b.left)
        .map((p) => p.text)
        .join(" "),
    );
};

const takeSample = (t: number): Sample => ({
  t,
  plane: planeFingerprint(),
  canvas: canvasFingerprint(document.querySelector<HTMLCanvasElement>(".grainient-canvas")),
  grainTime: String(document.timeline?.currentTime ?? "n/a"),
});

export function DiagnosticsBeacon() {
  useEffect(() => {
    // Scroll-pan probe: scrolls through the curtain track and records the real
    // computed transform at each stop, then publishes it into the DOM so a
    // headless `--dump-dom` run can read it back without a human.
    const panProbe = async () => {
      const title = document.querySelector<HTMLElement>(".curtain-title");
      const cta = document.querySelector<HTMLElement>(".curtain-cta");
      const next = document.querySelector<HTMLElement>(".curtain-next-text");
      const stage = document.querySelector<HTMLElement>("#que-hacemos");
      const run = document.querySelector<HTMLElement>(".curtain-run");
      const stickyStage = document.querySelector<HTMLElement>("#que-hacemos > div");
      if (!title || !next || !stage || !run || !stickyStage) {
        document.documentElement.setAttribute(
          "data-pan-probe",
          JSON.stringify({ error: "elements missing", title: !!title, next: !!next, stage: !!stage, run: !!run }),
        );
        return;
      }

      const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

      // `requestAnimationFrame` never fires under headless `--dump-dom`, so the
      // probe waits on timers instead; virtual time fast-forwards them.
      const readAt = async (y: number) => {
        window.scrollTo(0, y);
        await wait(250);
        const anim = title.getAnimations()[0];
        const timing = anim?.effect?.getComputedTiming();
        return {
          y,
          stageTopInViewport: Math.round(stickyStage.getBoundingClientRect().top),
          title: getComputedStyle(title).transform,
          titleOpacity: getComputedStyle(title).opacity,
          ctaOpacity: cta ? getComputedStyle(cta).opacity : "MISSING",
          ctaTransform: cta ? getComputedStyle(cta).transform : "MISSING",
          nextOpacity: getComputedStyle(next).opacity,
          timelineTime: String(anim?.timeline?.currentTime ?? "n/a"),
          timelineKind: anim?.timeline?.constructor?.name ?? "none",
          progress: timing?.progress ?? "NO-ANIMATION",
        };
      };

      // The run spans exactly the window in which the stage stays pinned.
      const travel = Math.max(run.offsetHeight, 0);
      const stops = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(stage.offsetTop + travel * f));
      const points: Array<Record<string, unknown>> = [];

      // Snapshot taken before any programmatic scrolling. With a hash URL this
      // reflects a genuinely scrolled position, which is the only way to see the
      // timeline advance in a headless run (frames there are nearly stalled).
      const initialAnim = title.getAnimations()[0];
      const initial = {
        hash: location.hash,
        scrollY: window.scrollY,
        stageTop: stage.offsetTop,
        runHeight: run.offsetHeight,
        sectionHeight: stage.offsetHeight,
        stickyStageHeight: stickyStage.offsetHeight,
        titleRangeStart: (getComputedStyle(title) as unknown as Record<string, string>).animationRangeStart,
        h2FontFamily: (() => {
          const h2 = document.querySelector<HTMLElement>("#que-hacemos h2");
          return h2 ? getComputedStyle(h2).fontFamily : "none";
        })(),
        subtitleFontFamily: (() => {
          const subtitle = document.querySelector<HTMLElement>("#que-hacemos .curtain-title p");
          return subtitle ? getComputedStyle(subtitle).fontFamily : "none";
        })(),
        displayFontLoaded: (() => {
          const h2 = document.querySelector<HTMLElement>("#que-hacemos h2");
          const family = h2 ? getComputedStyle(h2).fontFamily.split(",")[0].trim() : "";
          return family ? document.fonts.check(`1em ${family}`) : false;
        })(),
        viewportWidth: window.innerWidth,
        /*
         * The about section. Two columns of staggered photo grids, so the numbers
         * that matter are the ones a bounding box cannot fake: how far the right
         * column actually drops, how far the second sub-column inside each grid
         * drops, how many photographs are in the DOM and how many really loaded.
         */
        snap: (() => {
          const round = (n: number) => Math.round(n * 10) / 10;
          const doc = document.documentElement;
          const scrollY = window.scrollY;
          const docTop = (el: Element) => round(el.getBoundingClientRect().top + scrollY);
          const targets = Array.from(
            document.querySelectorAll<HTMLElement>(
              "section, article, header, footer, aside, main",
            ),
          ).filter((el) => getComputedStyle(el).scrollSnapAlign !== "none");
          const maxScroll = round(doc.scrollHeight - window.innerHeight);
          return {
            typeOnHtml: getComputedStyle(doc).scrollSnapType,
            viewportHeight: window.innerHeight,
            docHeight: doc.scrollHeight,
            maxScroll,
            targets: targets.map((el) => {
              const top = docTop(el);
              const height = round(el.getBoundingClientRect().height);
              const align = getComputedStyle(el).scrollSnapAlign;
              /*
               * Reachability has to be read through the alignment the element
               * declared. Reporting only the `start` reading once sent me chasing a
               * bug that did not exist: an `end`-aligned target at the bottom of
               * the page can never sit at the top of the screen, and that is a
               * property of the layout, not a defect. Map each alignment to the
               * scroll position it actually asks for.
               */
              const alignedAt = align.startsWith("end")
                ? round(top + height - window.innerHeight)
                : top;
              return {
                tag: el.tagName.toLowerCase(),
                cls: (el.className || "").toString().split(" ").slice(0, 2).join(" "),
                align,
                stop: getComputedStyle(el).scrollSnapStop,
                top,
                height,
                /* The scroll position this target asks for, given its alignment. */
                alignedAt,
                /*
                 * With a rounding tolerance. `end` alignment asks for the bottom of
                 * the target, and the document's own height is reported by the
                 * browser as a whole number, so a target flush with the bottom of
                 * the page lands a fraction of a pixel past the last scrollable
                 * position. Flagging that as unreachable is a broken measurement,
                 * not a finding -- the same 0.2px false positive that sent me
                 * chasing the wrong bug once already.
                 */
                reachable: alignedAt >= -1 && alignedAt <= maxScroll + 1,
                overshootPx: round(Math.max(0, alignedAt - maxScroll)),
              };
            }),
          };
        })(),
        curtainTail: await (async () => {
          const root = document.querySelector<HTMLElement>(".curtain-root");
          const stage = root ? root.querySelector<HTMLElement>(".curtain-stage") : null;
          const run = root ? root.querySelector<HTMLElement>(".curtain-run") : null;
          const tail = root ? root.querySelector<HTMLElement>(".curtain-tail") : null;
          const next = root ? root.querySelector<HTMLElement>(".curtain-next-text") : null;
          const band = document.querySelector<HTMLElement>(".partners-band");
          if (!root || !stage || !tail || !next) return "MISSING";
          const round = (n: number) => Math.round(n * 10) / 10;
          const h = (el: Element) => round(el.getBoundingClientRect().height);
          const viewport = window.innerHeight;
          const rootHeight = h(root);
          const rootTop = round(root.getBoundingClientRect().top + window.scrollY);
          const stageHeight = h(stage);
          const nextHeight = h(next);
          const runHeight = h(run as Element);
          const tailHeight = h(tail);
          const releaseAt = round(rootTop + rootHeight - viewport);

          /*
           * The question this answers is whether the wait is a hold or a hide. The
           * stage is stuck at the top of the screen for the whole wait, so if the
           * About is taller than the stage, its bottom is off-screen the entire
           * time and the wait is not giving anyone time to read it -- it is only
           * postponing the band. So scroll to both ends of the wait and read where
           * the About's bottom edge actually sits.
           */
          const at = async (y: number) => {
            window.scrollTo(0, y);
            await wait(250);
            return {
              scroll: Math.round(window.scrollY),
              aboutTop: round(next.getBoundingClientRect().top),
              aboutBottom: round(next.getBoundingClientRect().bottom),
              aboutBottomVisible: next.getBoundingClientRect().bottom <= viewport + 1,
              bandTop: band ? round(band.getBoundingClientRect().top) : null,
              bandVisible: band ? band.getBoundingClientRect().top < viewport : null,
            };
          };
          const waitStart = await at(releaseAt - tailHeight);
          const waitEnd = await at(releaseAt);
          /* The probe scrolls; every later reading assumes the page is back at rest. */
          window.scrollTo(0, 0);
          await wait(250);

          return {
            viewportHeight: viewport,
            stagePosition: getComputedStyle(stage).position,
            rootHeight,
            rootTopInDocument: rootTop,
            stageHeight,
            runHeight,
            tailHeight,
            runInViewports: round(runHeight / viewport),
            tailInViewports: round(tailHeight / viewport),
            nextTextHeight: nextHeight,
            aboutFitsStage: nextHeight <= stageHeight + 1,
            aboutOverflowPx: round(Math.max(0, nextHeight - stageHeight)),
            pinReleasesAtScrollY: releaseAt,
            bandTopInDocument: band ? round(band.getBoundingClientRect().top + window.scrollY) : "MISSING",
            waitStart,
            waitEnd,
          };
        })(),
        curtainCtaSpacing: (() => {
          const root = document.querySelector<HTMLElement>(".curtain-root");
          const subtitle = root ? root.querySelector<HTMLElement>(".curtain-subtitle-shadow") : null;
          const wrapper = root ? root.querySelector<HTMLElement>(".curtain-cta") : null;
          const button = wrapper ? wrapper.querySelector<HTMLElement>(":scope > *") : null;
          const next = root ? root.querySelector<HTMLElement>(".curtain-next-text") : null;
          const title = root ? root.querySelector<HTMLElement>(".curtain-title") : null;
          if (!root || !subtitle || !button || !wrapper || !title) return "MISSING";
          const round = (n: number) => Math.round(n * 10) / 10;
          const sBox = subtitle.getBoundingClientRect();
          const wrapperStyle = getComputedStyle(wrapper);
          const bBox = button.getBoundingClientRect();
          const nBox = next ? next.getBoundingClientRect() : null;
          const declared = getComputedStyle(document.documentElement);
          return {
            /* Both tokens, read back live, so the branch in use is never assumed. */
            gapToken: declared.getPropertyValue("--curtain-cta-gap").trim(),
            gapMobileToken: declared.getPropertyValue("--curtain-cta-gap-mobile").trim(),
            wrapperPosition: wrapperStyle.position,
            wrapperMarginTop: wrapperStyle.marginTop,
            wrapperMarginBlockStart: wrapperStyle.marginBlockStart,
            titleBlockTop: round(title.getBoundingClientRect().top),
            titleBlockBottom: round(title.getBoundingClientRect().bottom),
            titleBlockHeight: round(title.getBoundingClientRect().height),
            /* What the offset actually resolves to, so the parts can be separated. */
            titleBottomToButtonTop: round(bBox.top - title.getBoundingClientRect().bottom),
            wrapperTop: round(wrapper.getBoundingClientRect().top),
            subtitleTop: round(sBox.top),
            /* Distance from the headline to the subtitle: must not move. */
            headlineToSubtitlePx: round(sBox.top - title.getBoundingClientRect().top),
            subtitleBottom: round(sBox.bottom),
            buttonTop: round(bBox.top),
            /* The number the eye reads: the air between subtitle and button. */
            subtitleToButtonPx: round(bBox.top - sBox.bottom),
            buttonHeight: round(bBox.height),
            buttonBottom: round(bBox.bottom),
            nextTextTop: nBox ? round(nBox.top) : "MISSING",
            /* Negative means the button is sitting on top of the About section. */
            buttonToNextTextPx: nBox ? round(nBox.top - bBox.bottom) : "MISSING",
            overlapsAbout: nBox ? bBox.bottom > nBox.top : null,
          };
        })(),
        partners: (() => {
          const band = document.querySelector<HTMLElement>(".partners-band");
          if (!band) return "MISSING";
          const inner = band.querySelector<HTMLElement>(".partners-inner");
          const label = band.querySelector<HTMLElement>(".partners-label");
          const rows = Array.from(band.querySelectorAll<HTMLElement>(".partners-row"));
          const round = (n: number) => Math.round(n * 10) / 10;
          const copyOf = (row: HTMLElement) =>
            row.querySelector<HTMLElement>('.partners-group:not([aria-hidden="true"])');
          const trackOf = (row: HTMLElement) =>
            row.querySelector<HTMLElement>(".partners-track");
          const marks = Array.from(band.querySelectorAll<HTMLImageElement>(".partners-mark"));
          const heights = Array.from(
            new Set(marks.map((m) => round(m.getBoundingClientRect().height))),
          );
          const drift = marks.map((m) => {
            const r = m.getBoundingClientRect();
            const natural = m.naturalWidth / (m.naturalHeight || 1);
            const box = r.height ? r.width / r.height : 0;
            return natural && box ? Math.abs(box / natural - 1) : 0;
          });

          return {
            reducedMotionActive: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            /*
             * How many marks share the screen at once: the window width divided by
             * the average advance of one mark, which is its own width plus its gap.
             * This is the number the owner tuned, so it is the number to report.
             */
            marksInView: (() => {
              const row = rows[0];
              const copy = row ? copyOf(row) : null;
              if (!row || !copy) return "MISSING";
              const items = Array.from(copy.querySelectorAll<HTMLElement>(".partners-slot"));
              if (!items.length) return "MISSING";
              const style = getComputedStyle(copy);
              const advance =
                (copy.getBoundingClientRect().width -
                  parseFloat(style.paddingInlineEnd)) /
                items.length;
              return advance ? round(row.getBoundingClientRect().width / advance) : "MISSING";
            })(),
            /*
             * Expected to be zero. The pause control was built, verified and then
             * removed on request, so the band knowingly does not meet WCAG 2.2.2
             * (Level A) any more. Reported rather than hidden.
             */
            pauseControls: band.querySelectorAll("button").length,
            wcag222: "not met: no pause mechanism; reduced motion is the only accommodation",
            bandBackground: getComputedStyle(band).backgroundColor,
            bandHeight: round(band.getBoundingClientRect().height),
            bandZIndex: getComputedStyle(band).zIndex,
            bandTopPx: round(band.getBoundingClientRect().top),
            bandPaddingBlock: round(parseFloat(getComputedStyle(band).paddingTop)),
            innerMaxWidth: inner ? getComputedStyle(inner).maxWidth : "MISSING",
            labelText: label ? (label.textContent ?? "").trim() : "MISSING",
            labelSize: label ? getComputedStyle(label).fontSize : "MISSING",
            labelColour: label ? getComputedStyle(label).color : "MISSING",
            rowGap: rows[0]
              ? round(
                  parseFloat(getComputedStyle(band.querySelector(".partners-marquee")!).rowGap) ||
                    0,
                )
              : "MISSING",
            marksTotal: marks.length,
            distinctFiles: new Set(
              marks.map((m) => (m.currentSrc || m.src).split("/").pop()?.split("?")[0] ?? ""),
            ).size,
            allLoaded: marks.every((m) => m.complete && m.naturalWidth > 0),
            renderedHeights: heights,
            worstAspectDrift: marks.length ? round(Math.max(...drift)) : null,
            alts: Array.from(new Set(marks.map((m) => m.alt))),
            chosenWidths: Array.from(
              new Set(
                marks.map((m) => {
                  const match = (m.currentSrc || m.src).match(/[?&]w=(\d+)/);
                  return match ? Number(match[1]) : 0;
                }),
              ),
            ),
            rows: rows.map((row) => {
              const track = trackOf(row);
              const copy = copyOf(row);
              const duplicate = row.querySelector<HTMLElement>('.partners-group[aria-hidden="true"]');
              const style = track ? getComputedStyle(track) : null;
              const duration = style ? parseFloat(style.animationDuration) : 0;
              const copyWidth = copy ? round(copy.getBoundingClientRect().width) : null;
              const duplicateWidth = duplicate ? round(duplicate.getBoundingClientRect().width) : null;
              const rowWidth = round(row.getBoundingClientRect().width);
              return {
                direction: row.getAttribute("data-direction"),
                windowWidth: rowWidth,
                copyWidth,
                duplicateWidth,
                copiesIdentical:
                  copyWidth !== null && duplicateWidth !== null
                    ? Math.abs(copyWidth - duplicateWidth) < 0.5
                    : null,
                /* One copy has to be wider than the window or the loop shows a gap. */
                copyFillsWindow: copyWidth !== null ? copyWidth >= rowWidth : null,
                trackWidth: track ? round(track.getBoundingClientRect().width) : null,
                animation: style?.animationName,
                durationSeconds: duration,
                directionProperty: style?.animationDirection,
                playState: style?.animationPlayState,
                pixelsPerSecond: copyWidth !== null && duration ? round(copyWidth / duration) : null,
                marks: row.querySelectorAll(".partners-mark").length,
                masked: /gradient/.test(getComputedStyle(row).maskImage || ""),
              };
            }),
            speedsDifferByPxPerSecond: (() => {
              const speeds = rows
                .map((row) => {
                  const track = trackOf(row);
                  const copy = copyOf(row);
                  if (!track || !copy) return null;
                  const duration = parseFloat(getComputedStyle(track).animationDuration);
                  return duration ? copy.getBoundingClientRect().width / duration : null;
                })
                .filter((s): s is number => s !== null);
              if (speeds.length !== 2) return "MISSING";
              return round(Math.abs(speeds[0] - speeds[1]));
            })(),
          };
        })(),
        about: (() => {
          const section = document.querySelector(".about-section");
          if (!section) return "MISSING";
          const round = (n: number) => Math.round(n * 10) / 10;
          const columns = [...section.querySelectorAll(".about-column")];
          const grids = [...section.querySelectorAll(".about-grid")];
          const boxes = [...section.querySelectorAll(".about-photo")];
          const images = [...section.querySelectorAll<HTMLImageElement>(".about-photo img")];
          const topOf = (element: Element | undefined) =>
            element ? element.getBoundingClientRect().top : 0;
          const subcolumnsOf = (grid: Element | undefined) =>
            grid ? [...grid.querySelectorAll(".about-subcolumn")] : [];
          return {
            columns: columns.length,
            columnWidthsPx: columns.map((c) => round(c.getBoundingClientRect().width)),
            columnOffsetPx: round(topOf(columns[1]) - topOf(columns[0])),
            grids: grids.length,
            subcolumnsPerGrid: grids.map((g) => subcolumnsOf(g).length),
            subcolumnOffsetPx: (() => {
              const subs = subcolumnsOf(grids[0]);
              return subs.length > 1 ? round(topOf(subs[1]) - topOf(subs[0])) : 0;
            })(),
            photos: images.length,
            photosLoaded: images.filter((img) => img.complete && img.naturalWidth > 0).length,
            /* The panel clips: this says whether the lowered column survives it. */
            lowestPhotoBottomPx: Math.round(
              Math.max(0, ...boxes.map((b) => b.getBoundingClientRect().bottom))
            ),
            viewportHeightPx: window.innerHeight,
            /* Left column only: from the end of its text to its first photo. */
            textGridGapPx: (() => {
              const col = document.querySelector(".about-column");
              const paragraphs = col?.querySelectorAll(".about-paragraph");
              const firstPhoto = col?.querySelector("img");
              if (!paragraphs?.length || !firstPhoto) return "MISSING";
              return Math.round(
                firstPhoto.getBoundingClientRect().top -
                  paragraphs[paragraphs.length - 1].getBoundingClientRect().bottom
              );
            })(),
            /* Every centred grid: is the single photograph in the middle? */
            centredPhotosPx: Array.from(
              document.querySelectorAll(".about-grid--centered")
            ).map((grid) => {
              const subs = grid.querySelectorAll(".about-subcolumn");
              const single = subs[0]?.querySelector("img");
              if (subs.length < 2 || !single) return "MISSING";
              const tall = subs[1].getBoundingClientRect();
              const one = single.getBoundingClientRect();
              return {
                above: Math.round(one.top - tall.top),
                below: Math.round(tall.bottom - one.bottom),
              };
            }),
            /* Which edge each text block hugs, as the browser actually computed it. */
            textAligns: Array.from(document.querySelectorAll(".about-text")).map(
              (block) => getComputedStyle(block).textAlign
            ),
            /* Both headings must read the same size, from one token. */
            headingFontPx: Array.from(document.querySelectorAll(".about-heading")).map(
              (heading) => getComputedStyle(heading).fontSize
            ),
            /*
             * Reading order on a phone: the four blocks must appear in this order,
             * so their tops have to increase. -1 means the block was not found.
             */
            sequenceTopsPx: [
              ".about-text--right",
              ".about-column--lowered .about-grid",
              ".about-text--left",
              ".about-column--offset .about-grid",
            ].map((selector) => {
              const block = document.querySelector(selector);
              return block ? Math.round(block.getBoundingClientRect().top) : -1;
            }),
            /*
             * The curtain's own title: its size, and how far it sits from the top
             * of the stage. The difference is the air the stage gives it.
             */
            curtainTitleFontPx: (() => {
              const title = document.querySelector(".curtain-title h2");
              return title ? getComputedStyle(title).fontSize : "MISSING";
            })(),
            curtainTitleTopPx: (() => {
              const title = document.querySelector(".curtain-title h2");
              return title ? Math.round(title.getBoundingClientRect().top) : -1;
            })(),
            curtainStageTopPx: (() => {
              const stage = document.querySelector(".curtain-stage");
              return stage ? Math.round(stage.getBoundingClientRect().top) : -1;
            })(),
            /* How far the right column's grid sits below its own column's top. */
            rightGridOffsetPx: (() => {
              const col = document.querySelector(".about-column--offset");
              const grid = col?.querySelector(".about-grid");
              if (!col || !grid) return "MISSING";
              return Math.round(grid.getBoundingClientRect().top - col.getBoundingClientRect().top);
            })(),
            photoBoxesPx: boxes.map((b) => {
              const r = b.getBoundingClientRect();
              return `${Math.round(r.width)}x${Math.round(r.height)}`;
            }),
            headingTags: [...section.querySelectorAll(".about-heading")].map((h) => h.tagName),
            /* The curtain owns the anchor: a duplicated id silently breaks it. */
            idsNamedQueHacemos: document.querySelectorAll("#que-hacemos").length,
          };
        })(),
        /* The rotating word in the curtain title. */
        rotatingWord: (() => {
          const root = document.querySelector(".curtain-title .text-rotate");
          if (!root) return "MISSING";
          const letter = root.querySelector(".text-rotate-element");
          const content = root.querySelector(".text-rotate-highlight-content");
          const box = content ? content.getBoundingClientRect() : null;
          const outer = root.getBoundingClientRect();
          const round = (n: number) => Math.round(n * 10) / 10;
          return {
            display: getComputedStyle(root).display,
            isHighlight: root.classList.contains("text-rotate-highlight"),
            background: getComputedStyle(root).backgroundColor,
            letterColor: letter ? getComputedStyle(letter).color : "MISSING",
            letterCount: root.querySelectorAll(".text-rotate-element").length,
            /* The component puts `text-rotate` on its outer AND inner span, so the
               sr-only span is the reliable instance count. */
            instances: document.querySelectorAll(".curtain-title .text-rotate-sr-only").length,
            /* The white block is painted by the outer element, which adds the
               component's own 0.1em padding; the content box is the line box. */
            whiteBlockHeight: round(outer.height),
            whiteBlockWidth: round(outer.width),
            /*
             * Air between the outermost letters' boxes and the block's edges — what
             * reads as the last letter being cut off. Measured from real rects, so
             * a change here is a change on screen and not a CSS intention.
             */
            edgeAir: (() => {
              const letters = root.querySelectorAll(".text-rotate-element");
              if (!letters.length) return "MISSING";
              const first = letters[0].getBoundingClientRect();
              const last = letters[letters.length - 1].getBoundingClientRect();
              return {
                letterCount: letters.length,
                lastChar: JSON.stringify(letters[letters.length - 1].textContent),
                airLeftPx: round(first.left - outer.left),
                airRightPx: round(outer.right - last.right),
              };
            })(),
            /*
             * Whether the white block cuts a letter. The block is clipped at its
             * own box, so the honest check is the ink of the tallest and the
             * deepest glyph against the block's edges — "d" and "p". Everything
             * here is measured in the browser: the line box's position inside the
             * block comes from a real rect, not from arithmetic on the CSS.
             */
            inkFit: (() => {
              const element = root.querySelector(".text-rotate-element");
              const word = root.querySelector(".text-rotate-word");
              if (!element || !word) return "MISSING";
              const style = getComputedStyle(element);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (!ctx) return "MISSING";
              ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
              const deep = ctx.measureText("p");
              const tall = ctx.measureText("d");
              const lineHeight = parseFloat(style.lineHeight);
              const wordRect = word.getBoundingClientRect();
              const baselineInLineBox =
                (lineHeight - (deep.fontBoundingBoxAscent + deep.fontBoundingBoxDescent)) / 2 +
                deep.fontBoundingBoxAscent;
              const lineBoxTopInBlock = wordRect.top - outer.top;
              const inkTop = lineBoxTopInBlock + baselineInLineBox - tall.actualBoundingBoxAscent;
              const inkBottom = lineBoxTopInBlock + baselineInLineBox + deep.actualBoundingBoxDescent;
              return {
                blockHeight: round(outer.height),
                lineBoxHeight: round(wordRect.height),
                lineBoxTopInBlock: round(lineBoxTopInBlock),
                inkTopInBlock: round(inkTop),
                inkBottomInBlock: round(inkBottom),
                airAbovePx: round(inkTop),
                airBelowPx: round(outer.height - inkBottom),
                inkFits: inkTop >= 0 && inkBottom <= outer.height,
              };
            })(),
            contentHeight: box ? round(box.height) : 0,
            /*
             * Whether the sliding mask clips the letters cannot be read off a
             * bounding box: the mask is a line box and the glyphs are ink. The
             * canvas gives the font's real ascent/descent and the ink descent of
             * the deepest glyph, which is what a descender such as the `p` in
             * "emprendedores" needs room for.
             */
            ink: (() => {
              const element = root.querySelector(".text-rotate-element");
              const word = root.querySelector(".text-rotate-word");
              if (!element || !word) return "MISSING";
              const style = getComputedStyle(element);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (!ctx) return "MISSING";
              ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
              const p = ctx.measureText("p");
              const lineHeight = parseFloat(style.lineHeight);
              const fontAscent = p.fontBoundingBoxAscent;
              const fontDescent = p.fontBoundingBoxDescent;
              const baselineFromTop = (lineHeight - (fontAscent + fontDescent)) / 2 + fontAscent;
              return {
                maskHeight: round(word.getBoundingClientRect().height),
                letterBoxHeight: round(element.getBoundingClientRect().height),
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                inkDescentPx: round(p.actualBoundingBoxDescent),
                roomBelowBaselinePx: round(lineHeight - baselineFromTop),
                descenderFits: round(lineHeight - baselineFromTop) >= round(p.actualBoundingBoxDescent),
              };
            })(),
          };
        })(),
        /* The celeste hero CTA, so its label can be proven shadow-free. */
        heroSolidCta: (() => {
          const btn = [...document.querySelectorAll("a")].find(
            (a) =>
              a.textContent?.trim() === "Sumate a la comunidad" &&
              getComputedStyle(a).backgroundColor !== "rgb(255, 255, 255)",
          );
          if (!btn) return "MISSING";
          const s = getComputedStyle(btn);
          return { background: s.backgroundColor, text: s.color, textShadow: s.textShadow };
        })(),
        /* The outlined hero button: transparent surface, white border, to the right
           of the community CTA. Measured so its shadow is a fact, not a claim. */
        outlineCta: (() => {
          const btn = [...document.querySelectorAll("a")].find(
            (a) => a.textContent?.trim() === "Quiénes somos",
          );
          if (!btn) return "MISSING";
          const s = getComputedStyle(btn);
          return {
            background: s.backgroundColor,
            border: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`,
            text: s.color,
            boxShadow: s.boxShadow,
            filter: s.filter,
            textShadow: s.textShadow,
          };
        })(),
        /* Every "Sumate a la comunidad" affordance, hero first then curtain. */
        ctaColours: [...document.querySelectorAll("a")]
          .filter((a) => a.textContent?.trim() === "Sumate a la comunidad")
          .map((a) => {
            const s = getComputedStyle(a);
            return { background: s.backgroundColor, text: s.color, shadow: s.boxShadow };
          }),
        /*
         * Hero geometry and shadows, so the move from raw values to tokens can be
         * proven visual-neutral: the numbers must be identical before and after.
         */
        hero: (() => {
          /* The navbar carries its own logo with the same alt text, so the hero's is
             the first one that is not inside the header. */
          const logoImg =
            [...document.querySelectorAll<HTMLImageElement>('img[alt="Human Cowork Logo"]')].find(
              (img) => !img.closest("header"),
            ) ?? null;
          const logoBox = logoImg?.parentElement ?? null;
          if (!logoBox) return "MISSING";
          const container = logoBox.parentElement?.parentElement ?? null;
          const subtitle =
            [...document.querySelectorAll("p")].find((p) =>
              p.textContent?.includes("Comunidad Autónoma"),
            ) ?? null;
          const round = (n: number) => Math.round(n * 10) / 10;
          const filterOf = (el: Element | null) =>
            el ? getComputedStyle(el).filter : "MISSING";
          return {
            logoWidth: round(logoBox.getBoundingClientRect().width),
            logoHeight: round(logoBox.getBoundingClientRect().height),
            logoFilter: filterOf(logoBox),
            subtitleFilter: filterOf(subtitle),
            containerMaxWidth: container ? getComputedStyle(container).maxWidth : "MISSING",
            containerWidth: container ? round(container.getBoundingClientRect().width) : 0,
          };
        })(),
        cta: (() => {
          if (!cta) return "MISSING";
          const style = getComputedStyle(cta);
          const asRecord = style as unknown as Record<string, string>;
          const ctaRect = cta.getBoundingClientRect();
          const titleRect = title.getBoundingClientRect();
          const stageRect = stickyStage.getBoundingClientRect();
          const round = (n: number) => Math.round(n * 10) / 10;
          return {
            position: style.position,
            opacity: style.opacity,
            rangeStart: asRecord.animationRangeStart,
            rangeEnd: asRecord.animationRangeEnd,
            timeline: cta.getAnimations()[0]?.timeline?.constructor?.name ?? "none",
            ctaTop: round(ctaRect.top),
            titleBottom: round(titleRect.bottom),
            belowTitle: ctaRect.top >= titleRect.bottom - 1,
            titleHeight: round(titleRect.height),
            titleCentreOffsetFromStage: round(
              titleRect.top + titleRect.height / 2 - (stageRect.top + stageRect.height / 2),
            ),
          };
        })(),
        navbar: (() => {
          const bar = document.querySelector<HTMLElement>("header > div");
          if (!bar) return "MISSING";
          const rect = bar.getBoundingClientRect();
          return {
            height: Math.round(rect.height * 10) / 10,
            width: Math.round(rect.width),
            links: bar.querySelectorAll("a").length,
            buttons: bar.querySelectorAll("button").length,
            labels: Array.from(bar.querySelectorAll("a")).map((a) =>
              (a.textContent ?? a.getAttribute("aria-label") ?? "").trim(),
            ),
          };
        })(),
        nextParagraphLines: renderedLines(
          document.querySelector<HTMLElement>(
            "#que-hacemos .curtain-next-text p:last-of-type",
          ),
        ),
        brandImages: Array.from(
          document.querySelectorAll<HTMLImageElement>("header img"),
        ).map((img) => {
          const rect = img.getBoundingClientRect();
          const box = img.parentElement?.getBoundingClientRect();
          return {
            file: (img.currentSrc || img.src).split("/").pop()?.split("?")[0] ?? "",
            natural: `${img.naturalWidth}x${img.naturalHeight}`,
            rendered: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            box: box ? `${Math.round(box.width)}x${Math.round(box.height)}` : "none",
            complete: img.complete,
            visible: getComputedStyle(img).display !== "none" && rect.width > 0,
          };
        }),
        navbarBox: (() => {
          const pill = document.querySelector<HTMLElement>("header > div");
          if (!pill) return "MISSING";
          const at = (el: Element | null | undefined) => {
            const rect = el?.getBoundingClientRect();
            if (!rect) return null;
            const round = (n: number) => Math.round(n * 10) / 10;
            return {
              left: round(rect.left),
              right: round(rect.right),
              width: round(rect.width),
              height: round(rect.height),
            };
          };
          const images = document.querySelectorAll<HTMLImageElement>("header img");
          const sumate =
            Array.from(document.querySelectorAll<HTMLAnchorElement>("header a")).find(
              (a) => (a.textContent ?? "").includes("Sumate"),
            ) ?? null;
          return {
            pill: at(pill),
            logo: at(images[0]),
            wordmark: at(images[1]),
            toggle: at(document.querySelector("header button")),
            sumate: at(sumate),
          };
        })(),
        logoMark: (() => {
          const img = document.querySelector<HTMLImageElement>("header img");
          if (!img || !img.complete || !img.naturalWidth) return "MISSING";
          const rect = img.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width));
          const h = Math.max(1, Math.round(rect.height));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return "no-ctx";
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;
          let minX = w;
          let minY = h;
          let maxX = -1;
          let maxY = -1;
          for (let y = 0; y < h; y += 1) {
            for (let x = 0; x < w; x += 1) {
              if (data[(y * w + x) * 4 + 3] > 16) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          if (maxX < 0) return "fully-transparent";
          const scaleX = rect.width / w;
          const scaleY = rect.height / h;
          const round = (n: number) => Math.round(n * 10) / 10;
          return {
            box: `${w}x${h}`,
            gapLeftInBox: round(minX * scaleX),
            gapRightInBox: round((w - 1 - maxX) * scaleX),
            markWidth: round((maxX - minX + 1) * scaleX),
            markHeight: round((maxY - minY + 1) * scaleY),
            markLeftOnScreen: round(rect.left + minX * scaleX),
          };
        })(),
        titleRangeEnd: (getComputedStyle(title) as unknown as Record<string, string>).animationRangeEnd,
        nextRangeStart: (getComputedStyle(next) as unknown as Record<string, string>).animationRangeStart,
        nextRangeEnd: (getComputedStyle(next) as unknown as Record<string, string>).animationRangeEnd,
        title: getComputedStyle(title).transform,
        titleOpacity: getComputedStyle(title).opacity,
        nextOpacity: getComputedStyle(next).opacity,
        timelineTime: String(initialAnim?.timeline?.currentTime ?? "n/a"),
        progress: initialAnim?.effect?.getComputedTiming()?.progress ?? "NO-ANIMATION",
      };
      document.documentElement.setAttribute("data-pan-initial", JSON.stringify(initial));

      for (const y of stops) {
        points.push(await readAt(y));
        // Partial write, so a stall still leaves evidence behind.
        document.documentElement.setAttribute("data-pan-probe-partial", JSON.stringify(points));
      }
      window.scrollTo(0, 0);

      const unique = new Set(points.map((p) => p.title as string));
      const progresses = points.map((p) => p.progress);
      document.documentElement.setAttribute(
        "data-pan-probe",
        JSON.stringify({
          timelineSupported: CSS.supports("animation-timeline", "--probe"),
          stageTop: stage.offsetTop,
          runHeight: run.offsetHeight,
          viewportHeight: window.innerHeight,
          animationsFound: title.getAnimations().length,
          distinctTransforms: unique.size,
          distinctProgress: new Set(progresses.map(String)).size,
          titleMoves: unique.size > 1,
        }),
      );

      // Also report to the dev server so a real browser's measurements land in
      // /tmp/hc-diag.log without anyone reading the DOM by hand.
      void fetch("/api/diag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase: "pan-probe", url: location.href, initial, points }),
      }).catch(() => {});
    };

    const panTimer = window.setTimeout(() => void panProbe(), 6000);

    return () => window.clearTimeout(panTimer);
  }, []);

  /*
   * Process arrival probe.
   *
   * Verifies the one thing this section promises: the steps arrive one at a
   * time, in order, and stay. It samples across the pinned stretch and reports
   * every step's opacity and horizontal offset at each stop, so a reader can
   * see step one alone, then one and two, then three, then all four -- without
   * needing to look at the page.
   */
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".process-root");
    if (!root) return;

    const probe = async () => {
      const stage = root.querySelector<HTMLElement>(".process-stage");
      const run = root.querySelector<HTMLElement>(".process-run");
      const steps = Array.from(root.querySelectorAll<HTMLElement>(".process-step"));
      const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
      const round = (n: number) => Math.round(n * 10) / 10;

      if (!stage || !run || steps.length === 0) {
        document.documentElement.setAttribute(
          "data-process-probe",
          JSON.stringify({ error: "elements missing", stage: !!stage, run: !!run, steps: steps.length }),
        );
        return;
      }

      /* Walk up from the stage: any ancestor with overflow other than visible
         anchors the pin to a box that never scrolls, silently. */
      const overflowOffenders: string[] = [];
      let el: HTMLElement | null = stage.parentElement;
      while (el) {
        const cs = getComputedStyle(el);
        if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
          overflowOffenders.push(`${el.tagName.toLowerCase()}.${el.className || "(no class)"}: ${cs.overflowX}/${cs.overflowY}`);
        }
        el = el.parentElement;
      }

      const readTx = (s: HTMLElement) => {
        const m = getComputedStyle(s).transform;
        if (m === "none") return 0;
        const parts = m.match(/matrix\(([^)]+)\)/);
        return parts ? round(Number(parts[1].split(",")[4])) : "unparsed";
      };

      /*
       * The reveal windows, read from computed style. These resolve without a
       * rendering frame, which matters: this environment cannot update a
       * scroll-driven timeline at all -- the curtain, which works in a real
       * browser, reports a frozen timeline here too. So the windows are checked
       * as values rather than as motion.
       */
      const windows = steps.map((s) => {
        const cs = getComputedStyle(s);
        return {
          name: cs.animationName,
          fill: cs.animationFillMode,
          duration: cs.animationDuration,
          from: cs.getPropertyValue("animation-range-start"),
          to: cs.getPropertyValue("animation-range-end"),
          timeline: cs.getPropertyValue("animation-timeline"),
        };
      });

      /* The connectors, read the same way: one fewer than the steps, and each
         one's window should be the next step's. */
      const arrowWindows = Array.from(
        root.querySelectorAll<HTMLElement>(".process-arrow"),
      ).map((a) => {
        const cs = getComputedStyle(a);
        return {
          display: cs.display,
          width: round(a.getBoundingClientRect().width),
          from: cs.getPropertyValue("animation-range-start"),
          to: cs.getPropertyValue("animation-range-end"),
        };
      });

      /* The tokens as the browser resolved them, not as the file spells them.
         A stale stylesheet is invisible otherwise: every measurement agrees with
         itself and disagrees with the source, which is a hard thing to notice. */
      const rootStyle = getComputedStyle(root);
      const tokens = {
        run: rootStyle.getPropertyValue("--process-run").trim(),
        pitch: rootStyle.getPropertyValue("--process-reveal-pitch").trim(),
        revealRun: rootStyle.getPropertyValue("--process-reveal-run").trim(),
        shift: rootStyle.getPropertyValue("--process-reveal-shift").trim(),
        gap: rootStyle.getPropertyValue("--process-column-gap").trim(),
        count: rootStyle.getPropertyValue("--process-count").trim(),
      };

      /* Does the connector actually paint? A pseudo-element with a failed
         colour resolves to nothing visible and raises no error anywhere, so its
         computed style is the only way to know short of looking. */
      const firstArrow = root.querySelector<HTMLElement>(".process-arrow");
      const paint = firstArrow
        ? {
            colour: getComputedStyle(firstArrow).color,
            rule: getComputedStyle(firstArrow, "::before").backgroundImage,
            headTop: getComputedStyle(firstArrow, "::after").borderBlockStartWidth,
            headSide: getComputedStyle(firstArrow, "::after").borderInlineEndWidth,
            headSize: getComputedStyle(firstArrow, "::after").inlineSize,
            headRotation: getComputedStyle(firstArrow, "::after").rotate,
          }
        : null;

      /* And where does it sit? It should begin exactly where its card ends and
         be vertically centred with it. */
      const firstCard = steps[0].getBoundingClientRect();
      const arrowBox = firstArrow?.getBoundingClientRect();
      const geometry = arrowBox
        ? {
            cardRight: round(firstCard.right),
            arrowStart: round(arrowBox.left),
            offsetFromCardEdge: round(arrowBox.left - firstCard.right),
            cardCentreY: round(firstCard.top + firstCard.height / 2),
            arrowCentreY: round(arrowBox.top + arrowBox.height / 2),
            verticalOffset: round(
              arrowBox.top + arrowBox.height / 2 - (firstCard.top + firstCard.height / 2),
            ),
          }
        : null;

      const readAt = async (y: number) => {
        window.scrollTo(0, y);
        await wait(260);
        const stageRect = stage.getBoundingClientRect();
        return {
          y,
          actualScrollY: Math.round(window.scrollY),
          stageTop: round(stageRect.top),
          timelineTime: String(steps[0].getAnimations()[0]?.timeline?.currentTime ?? "null"),
          steps: steps.map((s) => ({
            opacity: Number(getComputedStyle(s).opacity),
            tx: readTx(s),
          })),
        };
      };

      /* The pin lasts from when the section reaches the top of the viewport
         until its bottom does. Sampling inside that window is the whole test. */
      const rootTop = Math.round(root.getBoundingClientRect().top + window.scrollY);
      const rootHeight = root.offsetHeight;
      const pinStart = rootTop;
      const pinEnd = Math.round(rootTop + Math.max(0, rootHeight - window.innerHeight));
      const stops = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1].map((f) => Math.round(pinStart + (pinEnd - pinStart) * f));

      const points: Array<Record<string, unknown>> = [];
      for (const y of stops) {
        points.push(await readAt(y));
        document.documentElement.setAttribute("data-process-probe-partial", JSON.stringify(points));
      }

      /* Did each step cross into view, and in which order? */
      const arrivalOrder: number[] = [];
      for (let i = 0; i < steps.length; i += 1) {
        const firstVisible = points.findIndex((p) => Number((p.steps as Array<{ opacity: number }>)[i].opacity) > 0.5);
        arrivalOrder.push(firstVisible);
      }

      const firstPoint = points[1] as { steps: Array<{ opacity: number }> };
      const lastPoint = points[points.length - 1] as { steps: Array<{ opacity: number }> };
      const visibleAtFirst = firstPoint.steps.filter((s) => s.opacity > 0.5).length;
      const visibleAtLast = lastPoint.steps.filter((s) => s.opacity > 0.9).length;

      window.scrollTo(0, 0);
      await wait(200);

      const verdict = {
        timelineSupported: CSS.supports("animation-timeline", "view()"),
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        stagePosition: getComputedStyle(stage).position,
        runHeight: run.offsetHeight,
        runHeightInViewports: round(run.offsetHeight / window.innerHeight),
        rootHeight,
        documentHeight: document.documentElement.scrollHeight,
        overflowOffenders,
        tokens,
        paint,
        geometry,
        windows,
        arrowWindows,
        stepCount: steps.length,
        stepWidths: steps.map((s) => round(s.getBoundingClientRect().width)),
        /* The widest card against the stage, not the sum of all of them: a
           stacked column sums to something meaningless, and reporting it as a
           failure sends the next reader after a bug that is not there. */
        widestStepFitsStage:
          round(Math.max(...steps.map((s) => s.getBoundingClientRect().width))) <=
          stage.clientWidth,
        columnsOfRail: getComputedStyle(root.querySelector(".process-rail") as HTMLElement).gridTemplateColumns,
        pinStart,
        pinEnd,
        /* The promise: one alone, then two, then three, then four. */
        visibleAtFirstStop: visibleAtFirst,
        visibleAtLastStop: visibleAtLast,
        arrivalOrder, /* [0,1,2,3] means each step appeared after the previous */
        arrivalsInOrder: arrivalOrder.every((v, i) => v >= 0 && (i === 0 || v >= (arrivalOrder[i - 1] as number))),
        allArrive: arrivalOrder.every((v) => v >= 0),
        allArriveAndStay: visibleAtLast === steps.length,
        points,
      };
      document.documentElement.setAttribute("data-process-probe", JSON.stringify(verdict));

      void fetch("/api/diag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase: "process-probe", url: location.href, verdict }),
      }).catch(() => {});
    };

    const timer = window.setTimeout(() => void probe(), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const samples: Sample[] = [];
    let rafTicks = 0;
    let rafId = 0;

    const countFrames = () => {
      rafTicks += 1;
      rafId = requestAnimationFrame(countFrames);
    };
    rafId = requestAnimationFrame(countFrames);

    const timers: number[] = [];
    const capture = (t: number) => {
      timers.push(window.setTimeout(() => samples.push(takeSample(t)), t));
    };
    capture(700);
    capture(1800);
    capture(4200);

    const finish = window.setTimeout(() => {
      const [a, b, c] = samples;
      void fetch("/api/diag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: "motion-probe",
          ...capabilities(),
          rafTicksIn5s: rafTicks,
          sampleAt700: a,
          sampleAt1800: b,
          sampleAt4200: c,
          planeMoves: Boolean(a && b && a.plane !== b.plane),
          canvasRepaints: Boolean(a && b && a.canvas !== b.canvas),
        }),
      }).catch(() => {});
    }, 5200);

    return () => {
      window.clearTimeout(finish);
      timers.forEach((id) => window.clearTimeout(id));
      cancelAnimationFrame(rafId);
    };
  }, []);

  /*
   * The rotating word is time-based, so it needs its own sampler. This records
   * which word is on screen at six moments: more than one distinct value proves
   * the rotation is actually running, and the sequence shows its order.
   */
  useEffect(() => {
    const seen: string[] = [];
    const timers: number[] = [];
    const sample = () => {
      const el = document.querySelector(".curtain-title .text-rotate-sr-only");
      seen.push(el?.textContent ?? "MISSING");
      if (seen.length >= 6) {
        document.documentElement.setAttribute("data-rotate-probe", JSON.stringify(seen));
        return;
      }
      timers.push(window.setTimeout(sample, 2500));
    };
    timers.push(window.setTimeout(sample, 2500));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return null;
}
