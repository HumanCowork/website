"use client";

import { useEffect } from "react";

/*
 * Diagnostic only, for the type comparison page.
 *
 * If the unlayered candidate class did NOT beat the layered base `h1..h4` rule
 * in globals.css, every heading here would resolve to the same family and the
 * whole comparison would be a lie. This records, per heading, the family the
 * browser actually resolved, whether its font file is loaded, and the rendered
 * width of the text itself — ten equal widths would expose the failure.
 */
export function TypeCheck({
  selector = "section[data-candidate] h2",
}: {
  selector?: string;
}) {
  useEffect(() => {
    const rows = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    ).map((h2) => {
      const style = getComputedStyle(h2);
      const family = style.fontFamily.split(",")[0].replace(/["']/g, "").trim();

      /*
       * The block children of this heading make Range measure the container,
       * not the glyphs. A temporary inline, nowrap probe carrying the same
       * computed font metrics measures the real text width instead.
       */
      const probe = document.createElement("span");
      probe.style.cssText =
        "position:absolute;visibility:hidden;white-space:nowrap;display:inline;top:-9999px;left:0";
      probe.style.fontFamily = style.fontFamily;
      probe.style.fontWeight = style.fontWeight;
      probe.style.fontSize = style.fontSize;
      probe.style.letterSpacing = style.letterSpacing;
      probe.textContent = h2.textContent?.split("\n")[0]?.trim() || h2.textContent || "";
      document.body.appendChild(probe);
      const textWidth = Math.round(probe.getBoundingClientRect().width);
      probe.remove();

      return {
        name: h2.closest("section")?.dataset.candidate ?? "?",
        family,
        // Asking for the weight this heading actually renders at, not the 400 default.
        loaded: document.fonts.check(`${style.fontWeight} 1em ${family}`),
        textWidth,
      };
    });
    document.documentElement.setAttribute("data-type-check", JSON.stringify(rows));

    /*
     * The decided heading face that sits above every sample: it has to be the
     * display token, not the body one, or the pairing on this page is a lie.
     *
     * The result goes in its own attribute. Writing it back into
     * `data-type-title` would make this query resolve to <html> (this element,
     * which is earlier in document order) on any second run, and the check would
     * silently measure the inherited body font instead of the sample.
     */
    const title = document.querySelector<HTMLElement>("[data-type-title]");
    const sample = title?.closest("section") ? title : null;
    if (sample) {
      const style = getComputedStyle(sample);
      const family = style.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      document.documentElement.setAttribute(
        "data-type-title-result",
        JSON.stringify({
          family,
          loaded: document.fonts.check(`${style.fontWeight} 1em ${family}`),
          tag: sample.tagName.toLowerCase(),
        }),
      );
    }
  }, [selector]);

  return null;
}
