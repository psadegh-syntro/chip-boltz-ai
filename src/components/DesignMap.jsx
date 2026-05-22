import { useEffect, useRef, useState } from "react";
import { GRAMMAR_KNOBS, DIALECT_KNOBS } from "../data/convergence.js";

/* The design-language map — an illustrative graphic.
   A grammar knob has one option locked; a dialect knob keeps several
   open. The contrast is the whole point — no numbers needed. */

function Row({ knob, kind, shown, delay }) {
  return (
    <div className={`dm__row dm__row--${kind}`}>
      <span className="dm__label">{knob.label}</span>
      <div className="dm__cells">
        {knob.cells.map((intensity, i) => (
          <span
            key={i}
            className={`dm__cell dm__cell--${intensity}`}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.6)",
              transitionDelay: `${delay + i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DesignMap() {
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
    <div className="dm" ref={ref}>
      <div className="dm__group">
        <div className="dm__grouphead">
          <span className="dm__grouptag">Grammar</span>
          <span className="dm__groupdesc">
            one choice locks — the physics has decided
          </span>
        </div>
        {GRAMMAR_KNOBS.map((k, i) => (
          <Row key={k.label} knob={k} kind="grammar" shown={shown} delay={i * 90} />
        ))}
      </div>

      <div className="dm__group">
        <div className="dm__grouphead">
          <span className="dm__grouptag dm__grouptag--dialect">Dialect</span>
          <span className="dm__groupdesc">
            many choices stay open — your team decides
          </span>
        </div>
        {DIALECT_KNOBS.map((k, i) => (
          <Row
            key={k.label}
            knob={k}
            kind="dialect"
            shown={shown}
            delay={360 + i * 70}
          />
        ))}
      </div>
    </div>
  );
}
