/* Hero "live demo" button — opens the chip explorer directly (single demo). */

export default function DemoMenu() {
  return (
    <a
      className="btn btn--ghost btn--lg demomenu__btn"
      href="/chip-explorer-v212.html"
      target="_blank"
      rel="noopener"
    >
      Explore the live demo →
    </a>
  );
}
