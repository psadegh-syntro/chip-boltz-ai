import { useEffect, useRef, useState } from "react";

/* Workload-aware exploration.
   One column per workload. Each dot is a design choice the engine
   explored. The bright dots — the high-performing region — sit at a
   different place in each column: the best architecture and mapping
   shift with the workload. Points are illustrative, deterministic. */

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WORKLOADS = [
  { name: "LLM prefill", sweet: 0.73 },
  { name: "LLM decode", sweet: 0.38 },
  { name: "MoE inference", sweet: 0.61 },
  { name: "Diffusion", sweet: 0.28 },
  { name: "Recommender", sweet: 0.52 },
];

const W = 660;
const H = 388;
const M = { t: 30, b: 54, l: 42, r: 22 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const COLW = PW / WORKLOADS.length;
const py = (v) => M.t + (1 - v) * PH;

function build() {
  const rnd = mulberry32(424242);
  return WORKLOADS.map((wl, ci) => {
    const cx = M.l + (ci + 0.5) * COLW;
    const dots = [];
    for (let i = 0; i < 17; i++) {
      dots.push({
        x: cx + (rnd() - 0.5) * COLW * 0.62,
        v: 0.07 + rnd() * 0.86,
        good: false,
      });
    }
    for (let i = 0; i < 11; i++) {
      const g = (rnd() + rnd() + rnd()) / 3;
      dots.push({
        x: cx + (rnd() - 0.5) * COLW * 0.5,
        v: Math.min(0.95, Math.max(0.05, wl.sweet + (g - 0.5) * 0.24)),
        good: true,
      });
    }
    return { ...wl, ci, cx, dots };
  });
}

const COLUMNS = build();

export default function WorkloadExplore() {
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
    <div className="wlx" ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="wlx__svg"
        role="img"
        aria-label="One column per workload; each dot is a design the engine explored. The high-performing region sits at a different place for each workload."
      >
        {/* y-axis hint */}
        <text
          x={16}
          y={M.t + PH / 2}
          textAnchor="middle"
          className="wlx__ylabel"
          transform={`rotate(-90 16 ${M.t + PH / 2})`}
        >
          architecture + mapping space →
        </text>

        {COLUMNS.map((col) => (
          <g key={col.name}>
            <rect
              className="wlx__col"
              x={M.l + col.ci * COLW + 5}
              y={M.t}
              width={COLW - 10}
              height={PH}
              rx="9"
            />
            {col.dots
              .filter((d) => !d.good)
              .map((d, i) => (
                <circle
                  key={"e" + i}
                  cx={d.x}
                  cy={py(d.v)}
                  r="3"
                  className="wlx__dot-explored"
                  style={{
                    opacity: shown ? 1 : 0,
                    transitionDelay: `${col.ci * 90 + i * 7}ms`,
                  }}
                />
              ))}
            {col.dots
              .filter((d) => d.good)
              .map((d, i) => (
                <circle
                  key={"g" + i}
                  cx={d.x}
                  cy={py(d.v)}
                  r="4.6"
                  className="wlx__dot-good"
                  style={{
                    opacity: shown ? 1 : 0,
                    transitionDelay: `${260 + col.ci * 90 + i * 14}ms`,
                  }}
                />
              ))}
            <text
              x={col.cx}
              y={H - 30}
              textAnchor="middle"
              className="wlx__collabel"
            >
              {col.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="wlx__legend">
        <span className="wlx__leg wlx__leg--good">
          High-performing region for the workload
        </span>
        <span className="wlx__leg wlx__leg--explored">Designs explored</span>
      </div>
    </div>
  );
}
