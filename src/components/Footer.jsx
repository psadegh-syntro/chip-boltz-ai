export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">
            Boltz<span className="accent-text"> AI</span>
          </span>
          <p className="footer__tag">
            The design language of AI acceleration.
          </p>
        </div>

        <div className="footer__meta">
          <p>
            Research preview · Pre-seed · Provisional patent filed on the
            Generative Cooperative Network methodology.
          </p>
          <p>
            <a href="mailto:contact@boltz-ai.com">contact@boltz-ai.com</a>
            <span className="footer__dot">·</span>
            <a href="https://boltz-ai.com">boltz-ai.com</a>
          </p>
          <p className="footer__fine">
            © {new Date().getFullYear()} Boltz AI. Figures come from an
            analytical performance model calibrated to published A100 / H100 /
            MI300 specs (throughput ±18%; thermal gate validated against real
            junction temperatures; power-delivery, signal-integrity and cost
            remain reduced-order) — a methodology demonstration, not measured
            silicon.
          </p>
        </div>
      </div>
    </footer>
  );
}
