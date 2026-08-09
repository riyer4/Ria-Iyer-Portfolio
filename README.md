# Ria Iyer — Portfolio

A dual-theme portfolio site for Ria Iyer (Game Designer / HCI Researcher / UI-UX Designer).
Visitors land on a chooser page and pick between a clean **Professional** theme and a retro
pixel/arcade **Game Mode** theme — same content, two experiences.

Static HTML/CSS/JS, no build step — just open `index.html` or deploy the folder as-is (e.g. GitHub Pages).

## Structure
- `index.html` — pre-landing chooser page (Professional vs. Game Mode)
- `resume.html` — canonical resume page (game-themed; download button links to `assets/files/resume.pdf`)
- `assets/` — shared root assets (game theme CSS/JS, and `assets/files/resume.pdf`)
- `game/` — the arcade/pixel theme
  - `index.html`, `about.html`, `projects.html`, `archive.html`, `contact.html`
  - `projects/*.html` — 15 individual project detail pages
  - `assets/` — game theme's own copy of CSS/JS (mirrors root `assets/`)
- `pro/` — the clean/professional theme
  - `index.html`, `about.html`, `projects.html`, `contact.html`
  - `projects/*.html` — the same 15 projects, restyled
  - `assets/` — pro theme's CSS (`pro.css`) and JS (`pro.js`)
  - Resume nav item links directly to `assets/files/resume.pdf` (no embedded page)

Every page in `/game` and `/pro` has two fixed pill buttons: "Back to Start" (returns to the
root chooser) and "Switch to Game/Pro Mode" (jumps to the other theme's home page).

## Regenerating content
Both themes' project data live in generator scripts (not checked into this repo by default,
but used during the build): `gen.py` produces `game/projects.html`, `game/projects/*.html`,
and `game/archive.html`; `gen_pro.py` produces the `pro/` pages. If project data changes,
edit the `PROJECTS` list in the relevant script and rerun it rather than hand-editing the
generated HTML files, to keep both themes in sync.

Note: most project/art images are hotlinked from the previous Weebly site
(`iyerriaportfolio3.weebly.com`) rather than stored locally — swap in local copies under
`assets/img/` whenever convenient. The resume PDF itself is stored locally at
`assets/files/resume.pdf`.
