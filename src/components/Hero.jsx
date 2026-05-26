import Reveal from "./Reveal.jsx";

/* Faint perspective grid behind the hero. */
function GridBackdrop() {
  return (
    <svg
      className="hero__grid-bg"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hg" width="46" height="46" patternUnits="userSpaceOnUse">
          <path
            d="M46 0H0V46"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="url(#hg)" />
    </svg>
  );
}

/* Abstract die motif: a knob grid where a few cells converge bright
   (the grammar) and most stay dim (the dialect). A restrained preview
   of the design-language map idea — no stock imagery. */
function DieVisual() {
  const COLS = 9;
  const ROWS = 9;
  // cells that "converged" — the bright grammar cluster
  const bright = new Set([
    "1,1", "2,1", "3,1", "1,2", "2,2", "4,1", "2,3",
  ]);
  const mid = new Set([
    "5,2", "3,3", "6,1", "1,4", "4,3", "5,4", "2,5", "7,2",
  ]);
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const key = `${c},${r}`;
      const kind = bright.has(key) ? "b" : mid.has(key) ? "m" : "d";
      cells.push({ c, r, kind, i: r * COLS + c });
    }
  }
  const G = 30; // cell pitch
  const S = 22; // cell size
  const pad = 26;
  const dim = pad * 2 + COLS * G - (G - S);

  return (
    <svg
      className="die"
      viewBox={`0 0 ${dim} ${dim}`}
      role="img"
      aria-label="Abstract design-language map: a few architectural choices converge, most stay open"
    >
      <rect
        x="6"
        y="6"
        width={dim - 12}
        height={dim - 12}
        rx="18"
        fill="var(--bg-2)"
        stroke="var(--line-strong)"
      />
      {/* corner registration ticks */}
      {[
        [16, 16], [dim - 16, 16], [16, dim - 16], [dim - 16, dim - 16],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="var(--text-3)" />
      ))}
      {cells.map((cell) => (
        <rect
          key={cell.i}
          x={pad + cell.c * G}
          y={pad + cell.r * G}
          width={S}
          height={S}
          rx="4"
          className={`die__cell die__cell--${cell.kind}`}
          style={{ animationDelay: `${(cell.i % 14) * 0.18}s` }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <GridBackdrop />
      <div className="container hero__inner">
        <Reveal>
          <span className="hero__tagpill">
            <span className="pulse" />
            Workload-aware chip-design exploration platform
          </span>

          <h1 className="h-display">
            The design language of{" "}
            <span className="accent-text">AI acceleration.</span>
          </h1>

          <p className="lede hero__sub">
            Our generative AI learns architectural and mapping patterns by
            workload, and generates them to give designers{" "}
            <strong>Pareto tradeoffs.</strong>
          </p>

          <div className="hero__cta-row">
            <a className="btn btn--primary btn--lg" href="#contact">
              Talk to us about a design-partner engagement
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href="/chip-explorer.html"
              target="_blank"
              rel="noopener"
            >
              Explore the live demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="hero__visual">
          <DieVisual />
        </Reveal>
      </div>
    </section>
  );
}
