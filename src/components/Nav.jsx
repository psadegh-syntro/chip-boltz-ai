import { useEffect, useState } from "react";

const LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#deliverable", label: "The map" },
  { href: "#engine", label: "How it works" },
  { href: "#proof", label: "Evidence" },
  { href: "#contact", label: "Contact" },
];

/* Chip mark — converged grammar cells bright, dialect cells dim. */
function Mark() {
  return (
    <svg className="nav__mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="6" width="6" height="6" rx="1.3" className="cell on" />
      <rect x="13" y="6" width="6" height="6" rx="1.3" className="cell on" />
      <rect x="20" y="6" width="6" height="6" rx="1.3" className="cell off" />
      <rect x="6" y="13" width="6" height="6" rx="1.3" className="cell on" />
      <rect x="13" y="13" width="6" height="6" rx="1.3" className="cell off" />
      <rect x="20" y="13" width="6" height="6" rx="1.3" className="cell off" />
      <rect x="6" y="20" width="6" height="6" rx="1.3" className="cell off" />
      <rect x="13" y="20" width="6" height="6" rx="1.3" className="cell off" />
      <rect x="20" y="20" width="6" height="6" rx="1.3" className="cell off" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label="Boltz AI — home">
          <Mark />
          <span className="nav__name">
            Boltz<span className="accent-text"> AI</span>
          </span>
          <span className="nav__vertical">chip</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary nav__cta" href="#contact">
          Talk to us
        </a>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__drawer">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--primary"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Talk to us
          </a>
        </div>
      )}
    </header>
  );
}
