import Reveal from "./Reveal.jsx";

const STEPS = [
  { n: "01", title: "You share", sub: "workload + constraints" },
  { n: "02", title: "Boltz delivers", sub: "a deployed explorer" },
  { n: "03", title: "Your team runs it", sub: "we retrain on new workloads" },
];

export default function Engagement() {
  return (
    <section className="section section--alt" id="engagement">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">Engagement</span>
          <h2 className="h-section">
            We train the engine. You explore a library of options by
            workload.
          </h2>
        </Reveal>

        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal className="step" key={s.n} delay={i * 100}>
              <span className="step__n mono">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <span className="step__sub">{s.sub}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
