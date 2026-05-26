import Reveal from "./Reveal.jsx";
import DesignMap from "./DesignMap.jsx";

export default function Deliverable() {
  return (
    <section className="section section--alt" id="deliverable">
      <div className="container">
        <Reveal className="section__head section__head--wide">
          <span className="kicker">What you get</span>
          <h2 className="h-section">
            Not one optimized chip — a large ensemble of strong designs, and
            the map of what's settled.
          </h2>
        </Reveal>

        <Reveal>
          <DesignMap />
        </Reveal>

        <Reveal className="deliv__demo">
          <a
            className="btn btn--primary btn--lg"
            href="/chip-explorer.html"
            target="_blank"
            rel="noopener"
          >
            Open the chip explorer →
          </a>
          <a
            className="btn btn--ghost btn--lg"
            href="/chiplet-explorer.html"
            target="_blank"
            rel="noopener"
          >
            Open the chiplet explorer →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
