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
            Illustrative — based on an analytical performance model, not
            measured silicon
          </p>
        </Reveal>
      </div>
    </section>
  );
}
