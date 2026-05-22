import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Problem from "./components/Problem.jsx";
import Insight from "./components/Insight.jsx";
import Deliverable from "./components/Deliverable.jsx";
import Engine from "./components/Engine.jsx";
import Differentiation from "./components/Differentiation.jsx";
import Proof from "./components/Proof.jsx";
import Engagement from "./components/Engagement.jsx";
import Closing from "./components/Closing.jsx";
import Footer from "./components/Footer.jsx";

/* chip.boltz-ai.com — single-page, long-scroll marketing site.
   Each section is a headline + a graphic. The story, in order:
   hero → the sequential problem → the generative idea →
   the design-language map → how the engine works →
   why it's different → proof → engagement → contact.

   Accent color: locked to cyan via data-accent="cyan" on <html>
   in index.html. Swap that value for amber, violet, or emerald —
   see the theme blocks at the top of src/index.css. */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Insight />
        <Deliverable />
        <Engine />
        <Differentiation />
        <Proof />
        <Engagement />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
