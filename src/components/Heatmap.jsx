import { useEffect, useRef, useState } from "react";
import { ARCH_KNOBS, MAP_KNOBS, band } from "../data/convergence.js";

const TABS = [
  { id: "arch", label: "Architecture knobs", knobs: ARCH_KNOBS },
  { id: "map", label: "Mapping knobs", knobs: MAP_KNOBS },
];

const BAND_COPY = {
  grammar: "Grammar — converged",
  partial: "Leans one way",
  dialect: "Dialect — open",
};

function pct(f) {
  return Math.round(f * 100);
}

function Row({ knob, animate, delay }) {
  const b = band(knob.freq);
  return (
    <div
      className={`hm__row hm__row--${b}`}
      title={`${knob.label}: ${knob.nLevels} distinct level${
        knob.nLevels > 1 ? "s" : ""
      } survived in the high-performing designs`}
    >
      <div className="hm__knob">{knob.label}</div>
      <div className="hm__level">{knob.level}</div>
      <div className="hm__track">
        <div
          className="hm__fill"
          style={{
            width: animate ? `${pct(knob.freq)}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <div className="hm__pct mono">{pct(knob.freq)}%</div>
    </div>
  );
}

export default function Heatmap() {
  const [tab, setTab] = useState("arch");
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.16 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const active = TABS.find((t) => t.id === tab);
  const counts = active.knobs.reduce(
    (acc, k) => {
      acc[band(k.freq)] += 1;
      return acc;
    },
    { grammar: 0, partial: 0, dialect: 0 }
  );

  return (
    <div className="hm" ref={ref}>
      <div className="hm__head">
        <div className="hm__tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`hm__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => {
                setTab(t.id);
                setAnimate(false);
                requestAnimationFrame(() => setAnimate(true));
              }}
            >
              {t.label}
              <span className="hm__tabcount">{t.knobs.length}</span>
            </button>
          ))}
        </div>

        <div className="hm__legend">
          {["grammar", "partial", "dialect"].map((b) => (
            <span className={`hm__legend-item hm__legend-item--${b}`} key={b}>
              <span className="hm__swatch" />
              {BAND_COPY[b]}
            </span>
          ))}
        </div>
      </div>

      <div className="hm__caption mono">
        Convergence across the high-performing designs · 0% diverse → 100%
        unanimous
      </div>

      <div className="hm__rows" role="tabpanel">
        {active.knobs.map((knob, i) => (
          <Row
            key={knob.column}
            knob={knob}
            animate={animate}
            delay={i * 28}
          />
        ))}
      </div>

      <div className="hm__summary">
        <span>
          <strong className="accent-text">{counts.grammar}</strong> of{" "}
          {active.knobs.length} knobs converged into grammar
        </span>
        <span className="hm__summary-dot">·</span>
        <span>
          <strong>{counts.partial + counts.dialect}</strong> stayed open as
          dialect
        </span>
      </div>
    </div>
  );
}
