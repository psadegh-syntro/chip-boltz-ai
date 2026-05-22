import Reveal from "./Reveal.jsx";

/* The idea, as one statement — no body copy. */
export default function Insight() {
  return (
    <section className="section statement" id="insight">
      <div className="container">
        <Reveal>
          <p className="statement__lead">
            Because this sequential pipeline is broken, we built a new
            paradigm.
          </p>
          <p className="statement__line">
            What large language models did for human language, our generative
            engine does for the{" "}
            <span className="accent-text">language of chip design.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
