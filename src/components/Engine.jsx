import Reveal from "./Reveal.jsx";
import WorkloadExplore from "./WorkloadExplore.jsx";

export default function Engine() {
  return (
    <section className="section" id="engine">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">How it works</span>
          <h2 className="h-section">
            Architecture, mapping, and workload — explored together, not in
            sequence.
          </h2>
        </Reveal>

        <Reveal>
          <WorkloadExplore />
        </Reveal>

        <Reveal>
          <p className="proof__caption mono">
            Exploration favors combinations highly likely to pass verification
          </p>
        </Reveal>
      </div>
    </section>
  );
}
