import { useEffect, useRef, useState } from "react";

/* Sample scatter — the differentiator graphic.
   Not an optimization curve. A cloud of many distinct designs spread
   across the performance / efficiency tradeoff, with the delivered
   library sitting along the frontier. The spread IS the point:
   a large, diverse sample of options, not one optimum.
   Points are illustrative, generated deterministically. */

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 640;
const H = 400;
const M = { l: 56, r: 26, t: 28, b: 54 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const px = (x) => M.l + x * PW;
const py = (y) => M.t + (1 - y) * PH;

/* the tradeoff frontier: higher performance trades against efficiency */
const fX = (t) => 0.13 + 0.8 * t;
const fY = (t) => 0.93 - 0.72 * Math.pow(t, 1.5);

function build() {
  const rnd = mulberry32(20260520);
  const frontier = [];
  for (let i = 0; i < 27; i++) {
    const t = i / 26;
    frontier.push({
      x: fX(t) + (rnd() - 0.5) * 0.022,
      y: fY(t) + (rnd() - 0.5) * 0.03,
    });
  }
  const cloud = [];
  for (let i = 0; i < 132; i++) {
    const t = rnd();
    const depth = 0.22 + rnd() * 0.7;
    const x = fX(t) + (rnd() - 0.5) * 0.17;
    const y = fY(t) * depth + (rnd() - 0.5) * 0.04;
    cloud.push({
      x: Math.min(0.98, Math.max(0.035, x)),
      y: Math.min(0.97, Math.max(0.035, y)),
    });
  }
  return { frontier, cloud };
}

const { frontier: FRONTIER, cloud: CLOUD } = build();

export default function SampleScatter() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="scatter" ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="scatter__svg"
        role="img"
        aria-label="Many distinct chip designs spread across the performance and energy-efficiency tradeoff, with the delivered library along the frontier"
      >
        {/* axes */}
        <line
          x1={M.l}
          y1={H - M.b}
          x2={W - M.r}
          y2={H - M.b}
          stroke="var(--line-strong)"
        />
        <line
          x1={M.l}
          y1={M.t}
          x2={M.l}
          y2={H - M.b}
          stroke="var(--line-strong)"
        />
        <path
          d={`M${W - M.r},${H - M.b} l-8,-4.5 v9 z`}
          fill="var(--text-3)"
        />
        <path d={`M${M.l},${M.t} l-4.5,8 h9 z`} fill="var(--text-3)" />
        <text
          x={M.l + PW / 2}
          y={H - 16}
          textAnchor="middle"
          className="scatter__axis"
        >
          Performance →
        </text>
        <text
          x={18}
          y={M.t + PH / 2}
          textAnchor="middle"
          className="scatter__axis"
          transform={`rotate(-90 18 ${M.t + PH / 2})`}
        >
          Energy efficiency →
        </text>

        {/* explored designs — the wide sample */}
        {CLOUD.map((p, i) => (
          <circle
            key={"c" + i}
            cx={px(p.x)}
            cy={py(p.y)}
            r="3"
            className="scatter__cloud"
            style={{
              opacity: shown ? 1 : 0,
              transitionDelay: `${(i % 26) * 18}ms`,
            }}
          />
        ))}

        {/* the delivered library — distinct points along the frontier */}
        {FRONTIER.map((p, i) => (
          <circle
            key={"f" + i}
            cx={px(p.x)}
            cy={py(p.y)}
            r="5.5"
            className="scatter__lib"
            style={{
              opacity: shown ? 1 : 0,
              transitionDelay: `${320 + i * 26}ms`,
            }}
          />
        ))}
      </svg>

      <div className="scatter__legend">
        <span className="scatter__leg scatter__leg--lib">
          The design library you get — each a distinct tradeoff
        </span>
        <span className="scatter__leg scatter__leg--cloud">
          Designs explored
        </span>
      </div>
    </div>
  );
}
