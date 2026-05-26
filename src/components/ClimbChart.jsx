import { useEffect, useRef, useState } from "react";
import { CLIMB } from "../data/convergence.js";

/* Per-iteration climb of the median design score, re-rendered on-brand
   from the stress-test trajectory CSV. The engine starts on a
   deliberately degraded baseline and climbs to the design space's
   performance ceiling. */
export default function ClimbChart() {
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
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // ---- geometry ----
  const W = 640;
  const H = 320;
  const m = { t: 28, r: 24, b: 46, l: 44 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const maxIter = CLIMB.length - 1;

  const x = (it) => m.l + (it / maxIter) * pw;
  const y = (f) => m.t + (1 - f) * ph;

  const pts = CLIMB.map((d) => [x(d.iter), y(d.fMed)]);
  const linePath = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const areaPath =
    `M${pts[0][0]},${y(0)} ` +
    pts.map((p) => `L${p[0]},${p[1]}`).join(" ") +
    ` L${pts[pts.length - 1][0]},${y(0)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="climb" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="climb__svg" role="img"
        aria-label="The median design score climbs from a degraded baseline to the performance ceiling over ten iterations">
        <defs>
          <linearGradient id="climbFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* y gridlines + labels */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={m.l}
              x2={W - m.r}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--line)"
              strokeWidth="1"
            />
            <text
              x={m.l - 10}
              y={y(t) + 4}
              textAnchor="end"
              className="climb__axis"
            >
              {t.toFixed(2)}
            </text>
          </g>
        ))}

        {/* x labels */}
        {CLIMB.map((d) => (
          <text
            key={d.iter}
            x={x(d.iter)}
            y={H - m.b + 22}
            textAnchor="middle"
            className="climb__axis"
          >
            {d.iter}
          </text>
        ))}
        <text
          x={m.l + pw / 2}
          y={H - 6}
          textAnchor="middle"
          className="climb__axislbl"
        >
          iteration
        </text>
        <text
          x={14}
          y={m.t + ph / 2}
          textAnchor="middle"
          className="climb__axislbl"
          transform={`rotate(-90 14 ${m.t + ph / 2})`}
        >
          median design score
        </text>

        {/* area + line */}
        <path
          d={areaPath}
          fill="url(#climbFill)"
          style={{ opacity: shown ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}
        />
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: shown ? 0 : 1400,
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* points */}
        {CLIMB.map((d, i) => (
          <circle
            key={d.iter}
            cx={x(d.iter)}
            cy={y(d.fMed)}
            r={i === 0 || i === maxIter ? 5 : 3.2}
            fill={i === 0 ? "var(--bg)" : "var(--accent)"}
            stroke="var(--accent)"
            strokeWidth="2"
            style={{
              opacity: shown ? 1 : 0,
              transition: `opacity 0.4s ease ${0.6 + i * 0.07}s`,
            }}
          />
        ))}
      </svg>

      <div className="climb__notes">
        <span className="climb__note climb__note--start">
          Start · degraded baseline, top half of the design space withheld
        </span>
        <span className="climb__note climb__note--end">
          Iteration 10 · the performance ceiling, rediscovered
        </span>
      </div>
    </div>
  );
}
