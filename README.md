# Ria Iyer, Portfolio

Portfolio for Ria Iyer (Product Designer / UX Researcher / Game Designer).
Static HTML/CSS/JS, no build step. Deploy the folder as-is (e.g. GitHub Pages, custom domain in `CNAME`).

## Structure
- `index.html`: redirects to `pro/index.html`
- `assets/files/resume.pdf`: resume PDF (shown and downloaded on the Resume page)
- `pro/`: the site
  - `index.html`: full-screen intro scene with two playing-card buttons (Work, Resume) and About / Contact links
  - `about.html`, `projects.html`, `resume.html`, `contact.html`
  - `projects/*.html`: 15 project detail pages
  - `assets/css/pro.css`: all styling (violet + teal + coral palette, Playfair Display / DM Sans)
  - `assets/js/pro.js`: contact form notice, email links (mail app first, Gmail compose as fallback)

## Intro transition
Clicking a card on the intro plays an upright card sweeping across with a fading color train
(left to right on wide windows, bottom to top on narrow/portrait ones). The destination page is
fetched during the animation and swapped in under the card, so it needs to be served over http(s);
opened straight from disk it falls back to a normal page load.

Most project images are hotlinked from the previous Weebly site (`iyerriaportfolio3.weebly.com`).
