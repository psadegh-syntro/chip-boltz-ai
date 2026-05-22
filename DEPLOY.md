# Deploying chip.boltz-ai.com

A single-page marketing site for the Boltz AI chip-design vertical.
Built with **Vite + React**. Deploys as its own **standalone Vercel
project** on the subdomain `chip.boltz-ai.com` — it never touches the
existing `boltz-ai.com` project.

Total time end-to-end: about 20–30 minutes, most of it waiting for DNS.

---

## Step 1 — Preview it locally

```bash
cd "chip-site"
npm install      # first time only
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Scroll the
whole page. Edit any file in `src/` and the browser updates instantly.

---

## Step 2 — Accent color (already locked)

The accent is locked to **cyan / electric blue** — set by
`data-accent="cyan"` on the `<html>` tag in `index.html`. The temporary
preview switcher has been removed.

To try a different accent later, change that one attribute value to
`amber`, `violet`, or `emerald`. The full theme tokens live at the top
of `src/index.css`.

---

## Step 3 — Put the code on GitHub

Create a new, empty GitHub repository (suggested name: `chip-boltz-ai`).
Then, from inside the `chip-site` folder:

```bash
cd "chip-site"
git init
git add .
git commit -m "chip.boltz-ai.com — initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/chip-boltz-ai.git
git push -u origin main
```

> Only the `chip-site` folder is the website. `node_modules`, `dist`,
> and the scratch files are already excluded by `.gitignore`.

---

## Step 4 — Create the Vercel project

1. Go to **vercel.com → Add New → Project**.
2. Import the `chip-boltz-ai` GitHub repo.
3. Vercel auto-detects the **Vite** framework. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**. In ~1 minute you get a live URL like
   `chip-boltz-ai.vercel.app` — open it and confirm the site looks right.

> Create this as a **new project**. Do not add it to the existing
> `boltz-ai.com` project — keeping them separate means this site can
> never affect the live main site.

---

## Step 5 — Connect the `chip.boltz-ai.com` subdomain

This has two halves: tell Vercel about the domain, then point DNS at it
in Squarespace.

### 5a — In Vercel

1. Open the new project → **Settings → Domains**.
2. Enter `chip.boltz-ai.com` and click **Add**.
3. Vercel shows the DNS record it needs. For a subdomain this is a
   **CNAME record**, and the value is normally:

   ```
   cname.vercel-dns.com
   ```

   Use whatever value the Vercel screen displays — that is the source
   of truth. Leave this tab open.

### 5b — In Squarespace (DNS for boltz-ai.com)

1. Squarespace → **Settings → Domains** → click **boltz-ai.com**.
2. Open **DNS Settings** (also labelled "DNS").
3. Under **Custom Records**, add one record:

   | Field | Value |
   |-------|-------|
   | Host  | `chip` |
   | Type  | `CNAME` |
   | Data / Value | `cname.vercel-dns.com` |

4. Save.

That is the **only** DNS change. The apex `boltz-ai.com` and `www`
records are untouched, so the main site keeps working exactly as before.

---

## Step 6 — Verify

- Back in the Vercel **Domains** screen, the status flips from
  "Invalid Configuration" to a green **Valid** within a few minutes
  (DNS can take up to a couple of hours — usually much faster).
- Vercel issues the HTTPS certificate automatically.
- Visit **https://chip.boltz-ai.com** — it should load the site with a
  valid padlock.

---

## Revising the site later

Every section is its own file in `src/components/`, in page order:

| File | Section |
|------|---------|
| `Hero.jsx` | Headline + design-language motif |
| `Problem.jsx` | The sequential-design problem |
| `Insight.jsx` | Generative vs. point-predictive |
| `Deliverable.jsx` | The design-language map (grammar / dialect) |
| `Proof.jsx` | Proof-of-concept study |
| `Heatmap.jsx` | The on-brand convergence heatmap |
| `ClimbChart.jsx` | The stress-test climb chart |
| `Engine.jsx` | How the engine works |
| `Differentiation.jsx` | Why this is different |
| `Engagement.jsx` | Engagement model |
| `Closing.jsx` | Closing + contact |

The heatmap numbers live in `src/data/convergence.js` — re-rendered
fresh from the study CSVs, not embedded images.

Styling: `src/index.css` (design tokens, accent colors) and
`src/components.css` (per-section styles).

To publish a change: edit, commit, `git push`. Vercel rebuilds and
redeploys `chip.boltz-ai.com` automatically on every push to `main`.

---

## Two things flagged in the build brief

**Naming.** The methodology's internal name "GCN" collides with "Graph
Convolutional Network", so the public site never uses the bare acronym.
Per your decision it is written out in full as **"Generative Cooperative
Network"** (currently in `Engine.jsx` and the footer).

**Honest claims.** The proof-of-concept section is deliberately written
against an *analytical performance model* — no silicon performance
numbers are presented as measured results, there is a visible
"proof-of-concept" disclaimer, and the stage is stated honestly
(research preview, pre-seed, provisional patent filed).
