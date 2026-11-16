import type { CSSProperties } from "react";
import { PROCESS_HEADING, PROCESS_STEPS } from "./processSteps";
import "./ProcessSection.css";

/**
 * The process steps: the stage holds still while each step arrives in turn, from
 * the right, and stays. Each step is joined to the next by a connector that
 * draws itself in step with the step it points at.
 *
 * The structure is the curtain's, deliberately. Two siblings, in this order:
 *
 *   .process-stage   the pinned screen, holding the heading and every step
 *   .process-run     an empty, tall box whose only job is to define the
 *                    timeline the steps are driven by
 *
 * The timeline must live on that separate empty box. Putting it on an ancestor
 * of the steps -- which is what this section did first -- appears to freeze it:
 * measured, its currentTime sat at its scroll-0 value across the whole page
 * while an anonymous view() on the same element advanced normally.
 *
 * The steps are an ordered list because they are one: a screen reader announces
 * how many there are and which one it is on.
 */
export function ProcessSection() {
  const lastIndex = PROCESS_STEPS.length - 1;

  return (
    <section
      className="process-root"
      aria-labelledby="process-heading"
      data-process-section="true"
    >
      <div className="process-stage">
        <div className="process-inner">
          {/*
            * The heading is the first item in the queue, not a static label: it
            * arrives from the right ahead of the first step, with the same
            * motion. That is why it carries `--i: 0` and the steps start at 1 --
            * one sequence, one set of numbers.
            */}
          <h2
            className="process-heading"
            id="process-heading"
            style={{ "--i": 0 } as CSSProperties}
          >
            {PROCESS_HEADING}
          </h2>

          <ol className="process-rail">
            {PROCESS_STEPS.map((step, index) => (
              <li
                className="process-step"
                key={step.number}
                /*
                 * `--i` is the position in the reveal queue, and both this
                 * step's window and its connector's are derived from it in CSS.
                 * It starts at 1 because the heading took 0: the queue is the
                 * heading, then the steps. That is what makes adding a step a
                 * single entry in the data file -- nothing else needs to know the
                 * order or the count. The grid does need `--process-count` raised
                 * to match, or the new step has no column.
                 */
                style={{ "--i": index + 1 } as CSSProperties}
              >
                <span className="process-number" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-body">{step.body}</p>

                {/*
                 * The connector to the next step, drawn in the gap on the right.
                 * It carries no information of its own -- the list is ordered and
                 * numbered -- so it is hidden from assistive technology, and the
                 * last step, which points at nothing, gets none.
                 */}
                {index < lastIndex && (
                  <span className="process-arrow" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Empty on purpose: it exists only to give the timeline a subject. */}
      <div className="process-run" aria-hidden="true" />
    </section>
  );
}
