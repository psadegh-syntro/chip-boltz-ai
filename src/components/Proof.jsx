import Reveal from "./Reveal.jsx";
import SampleScatter from "./SampleScatter.jsx";

export default function Proof() {
  return (
    <section className="section" id="proof">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">Evidence</span>
          <h2 className="h-section">
            Thousands of distinct designs, spread across the Pareto frontier.
          </h2>
        </Reveal>

        <Reveal>
          <SampleScatter />
        </Reveal>

        <Reveal>
          <p className="proof__caption mono">
            Analytical performance model, calibrated to published A100 / H100 /
            MI300 specs (throughput ±18%, thermal gate validated) — directional,
            not yet measured silicon
          </p>
        </Reveal>
      </div>
    </section>
  );
}
