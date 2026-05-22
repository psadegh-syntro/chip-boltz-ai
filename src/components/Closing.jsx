import Reveal from "./Reveal.jsx";

const MAILTO =
  "mailto:contact@boltz-ai.com" +
  "?subject=" +
  encodeURIComponent("Boltz AI chip — design-partner conversation") +
  "&body=" +
  encodeURIComponent(
    "Hi Payman,\n\nI'd like to talk about the Boltz AI chip-design platform.\n\n"
  );

export default function Closing() {
  return (
    <section className="section closing" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="h-section closing__big">
            Discover the design language. Then choose within it.
          </h2>
        </Reveal>

        <Reveal className="closing__contact" delay={100}>
          <a className="btn btn--primary btn--lg" href={MAILTO}>
            Email contact@boltz-ai.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}
