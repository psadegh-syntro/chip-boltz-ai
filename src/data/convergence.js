/* ============================================================
   Illustrative data for the site graphics.

   These drive the on-brand visuals — they are deliberately
   illustrative, not the raw study export. The point is to convey
   the IDEA at a glance, not to present a results table.
   ============================================================ */

/* Design-language graphic.
   Each knob shows ~6 option "cells." A grammar knob has one choice
   lit (the high-performing designs converged on it). A dialect knob
   has several lit at varying strength (the choice stays open).
   cell intensity: 0 dim · 1 low · 2 mid · 3 full. */
export const GRAMMAR_KNOBS = [
  { label: "Process node", cells: [0, 0, 3, 0, 0, 0] },
  { label: "Clock frequency", cells: [0, 3, 0, 0, 0, 0] },
  { label: "PE array dimensions / Area", cells: [0, 0, 0, 3, 0, 0] },
  { label: "Memory channels", cells: [0, 0, 3, 0, 0, 0] },
];

export const DIALECT_KNOBS = [
  { label: "NoC topology", cells: [2, 0, 2, 1, 2, 1] },
  { label: "Cache hierarchy", cells: [1, 2, 0, 2, 1, 2] },
  { label: "Tile sizes", cells: [2, 1, 2, 1, 0, 2] },
  { label: "Numeric precision", cells: [0, 2, 1, 2, 2, 1] },
  { label: "Dataflow", cells: [2, 2, 0, 1, 2, 0] },
  { label: "Prefetch strategy", cells: [1, 1, 2, 0, 2, 1] },
  { label: "Parallelism", cells: [2, 0, 1, 2, 1, 2] },
  { label: "KV-cache layout", cells: [1, 2, 2, 1, 2, 0] },
];
