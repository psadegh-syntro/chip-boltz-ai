import Reveal from "./Reveal.jsx";

const STAGES = [
  { team: "Architecture", does: "commits to one fixed workload" },
  { team: "Compiler", does: "maps onto frozen hardware" },
  { team: "Verification", does: "finds the cost too late" },
  { team: "Supply chain", does: "inherits choices it never made" },
];

export default function Problem() {
  return (
    <section className="section section--alt" id="problem">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">The problem</span>
          <h2 className="h-section">
            Chip design is sequential. Each team inherits a frozen result.
          </h2>
        </Reveal>

        <Reveal>
          <ol className="flow">
            {STAGES.map((s, i) => (
              <li className="flow__stage" key={s.team}>
                <span className="flow__idx mono">{i + 1}</span>
                <span className="flow__team">{s.team}</span>
                <span className="flow__does">{s.does}</span>
                {i < STAGES.length - 1 && (
                  <span className="flow__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
