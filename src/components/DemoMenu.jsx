import { useEffect, useRef, useState } from "react";

/* Hero "live demo" dropdown — lets the visitor pick which explorer to open.
   Click toggles, click-outside or Esc closes; each item opens its target in a new tab. */

const DEMOS = [
  { label: "Chiplet explorer", href: "/chiplet-explorer.html" },
  { label: "Chip explorer", href: "/chip-explorer.html" },
];

export default function DemoMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="demomenu" ref={ref}>
      <button
        type="button"
        className="btn btn--ghost btn--lg demomenu__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Explore the live demo
        <span
          className={`demomenu__chev ${open ? "demomenu__chev--open" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="demomenu__panel" role="menu">
          {DEMOS.map((d) => (
            <a
              key={d.href}
              className="demomenu__item"
              role="menuitem"
              href={d.href}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
            >
              {d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
