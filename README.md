# adriel1ft.github.io

Personal site for [Adriel Ferreira Trajano](https://adriel1ft.github.io).
Plain HTML, CSS, and one small JS file — no build step, no dependencies.

Preview locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Editing content

Everything lives in `index.html`. Look for the commented section markers.

**Projects** are `<article class="card">` blocks under `<!-- WORK -->`. Each one has three knobs:

| attribute / class | what it does |
| --- | --- |
| `card--red` `card--purple` `card--green` `card--pink` | accent colour of the border shadow and cover strip |
| `data-span="4"`–`"8"` | card width, out of a 12-column grid |
| `data-rot="-1.2"` | tilt in degrees; keep it between -2 and 2 |

To add a project, copy an existing `<article>`, change the text, and point the
`card-link` at a case study in `projects/` or at a GitHub repo. To remove one,
delete the whole `<article>`.

**Case studies** are the standalone pages in `projects/`. Copy any of them as a
starting point; they all share `styles.css`.

## Screenshots

`assets/projects/*.svg` are halftone placeholders. Drop in a real screenshot
with the same filename, or update the `src` in the case-study page.

## Notes

- Colours and fonts are defined once at the top of `styles.css` under `:root`.
- `script.js` only handles card tilts, scroll reveals, and the misprint toggle
  in the footer. The site works fine with JavaScript disabled.
- Animations are disabled automatically for `prefers-reduced-motion`.
