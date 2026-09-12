# adriel1ft.github.io

Personal site for [Adriel Ferreira](https://adriel1ft.github.io).
Plain HTML, CSS, and one small JS file — no build step, no dependencies.

Preview locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Layout

One narrow column, centred, that never reaches the edge of the screen. Width
and side padding are `--col` and `--edge` at the top of `styles.css`.

## Editing content

Everything on the home page is in `index.html`, under the commented section
markers: Intro, Work, Education, Papers, Hackatons, Projects, Contact.

**Work / Education / Papers / Hackatons** entries all use the same block. Copy
one to add an item, delete it to remove one:

```html
<div class="entry">
  <div class="entry-head">
    <p class="entry-title">Role, Company</p>
    <p class="entry-date">2025—present</p>
  </div>
  <p class="entry-desc">description of what I did there</p>
</div>
```

Drop the `entry-head` wrapper when there is no date, as in Papers and Hackatons.

**Projects** use `<div class="project">`: a title, a square thumbnail, a short
description, and a "Get to know more" pill. Point the pill at a page in
`projects/` or straight at a GitHub repo.

**Case studies** are the standalone pages in `projects/`. Copy any of them as a
starting point; they all share `styles.css`.

## Screenshots

`assets/projects/*.svg` are neutral placeholders. Drop in a real screenshot with
the same filename, or update the `src`. Thumbnails are cropped to a square, so
keep the subject centred.

## Type

Small by design: `--fs-body` is 13.5px and `--fs-small` is 12.5px. Apple devices
render **SF Pro** from the system stack with no download; **Inter** loads from
Google Fonts as the fallback for Windows and Android and is the only web font on
the page. Both are set in `--sans`.

## Notes

- Colours, type sizes, and column width are defined once under `:root`.
- `script.js` only fades sections in on scroll. Add or remove the `reveal` class
  to control what animates. The site works fine with JavaScript disabled.
- Animations are skipped automatically for `prefers-reduced-motion`.
