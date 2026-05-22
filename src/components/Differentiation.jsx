import Reveal from "./Reveal.jsx";

const PIPE = [
  { label: "Workload + constraints", sub: "your inputs" },
  { label: "Boltz", sub: "joint exploration", boltz: true },
  { label: "EDA implementation", sub: "feeds existing Synopsys/Cadence toolchains" },
  { label: "Silicon", sub: "fabrication" },
];

export default function Differentiation() {
  return (
    <section className="section section--alt" id="different">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">Why this is different</span>
          <h2 className="h-section">
            See the downstream cost before the architecture locks.
          </h2>
        </Reveal>

        <Reveal>
          <div className="pipe">
            {PIPE.map((s, i) => (
              <div
                className={`pipe__stage ${
                  s.boltz ? "pipe__stage--boltz" : ""
                }`}
                key={s.label}
              >
                <span className="pipe__label">{s.label}</span>
                <span className="pipe__sub">{s.sub}</span>
                {i < PIPE.length - 1 && (
                  <span className="pipe__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
