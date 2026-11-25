# Aana Pappan — Logo Pack

Everything you need to use the brand across the web, email, social, and print.

---

## Quick reference: which file do I use?

| I want to... | Use this |
|---|---|
| Set the favicon for your website | `favicon.ico` (or `favicon-32.png`) |
| Apple touch icon (when someone adds your site to their home screen) | `favicon-180.png` |
| Set your Gmail / Google account profile picture | `avatar-400.png` |
| Set your LinkedIn / Instagram profile picture | `avatar-400.png` |
| Set your WhatsApp Business profile picture | `avatar-512.png` |
| Add a logo to email signatures | `lockup-horizontal-800.png` |
| Header on the website | `03-lockup-horizontal.svg` |
| Print on a business card / sticker | `04-lockup-stacked.svg` |
| Use on a dark background (footer, contact section, dark social posts) | `05-lockup-stacked-dark.svg` |
| The standalone elephant mark (anywhere) | `01-mark-elephant.svg` |
| Need to edit / resize indefinitely | Any `.svg` file (open in Figma, Illustrator, Inkscape) |
| Need to drop into a Word doc, slide, or chat | The matching `.png` file |

---

## File index

### Vector source files (`.svg`)
These are infinitely scalable. Use these in Figma, Illustrator, Inkscape, or anywhere SVG is supported.

- `01-mark-elephant.svg` — Elephant on transparent background (the icon, on its own)
- `02-mark-elephant-cream.svg` — Cream/turmeric version for dark backgrounds
- `03-lockup-horizontal.svg` — Elephant + "Aana Pappan" + "STUDIO · KOCHI" tagline, side-by-side
- `04-lockup-stacked.svg` — Same lockup but stacked vertically (square format)
- `05-lockup-stacked-dark.svg` — Stacked lockup on dark green background
- `06-favicon-32.svg` — Compact version optimized for tiny sizes
- `07-avatar-512.svg` — Profile-picture version with rounded cream backdrop

### Raster files (`.png`)
For platforms that don't accept SVG (most social networks, email clients, Word docs).

**Favicons** — `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-180.png`

**Profile pictures** — `avatar-200.png`, `avatar-400.png`, `avatar-512.png`

**Mark only (transparent)** — `mark-256.png`, `mark-512.png`, `mark-cream-512.png`

**Lockups** — `lockup-horizontal-800.png`, `lockup-horizontal-1600.png`, `lockup-stacked-600.png`, `lockup-stacked-dark-600.png`

---

## How to install the favicon on your website

Drop `favicon.ico` and the PNG variants into the same folder as your `index.html`, then add this inside the `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png">
```

If you're hosting on Netlify, Vercel, or GitHub Pages, just commit these files alongside your HTML.

---

## How to use in a Gmail signature

1. Open Gmail → Settings → "See all settings" → Signature
2. Create a new signature, click the image icon
3. Upload `lockup-horizontal-800.png`
4. Resize it small (Gmail will let you click and pick "Small")
5. Add your contact details below

Suggested format:
```
[logo image]
Adarsh · Co-founder · Aana Pappan Studio
hello@aanapappan.in · +91 98765 43210
aanapappan.in
```

---

## Brand colors

```
Leaf       #2F6E48   — primary brand green
Turmeric   #E8B23A   — accent yellow (the elephant ear)
Brick      #A03A26   — secondary accent (taglines, hovers)
Cream      #FBF4E2   — backgrounds
Ink        #2A1F14   — text
```

---

## A few rules to keep things consistent

1. **Keep clear space around the lockup** equal to the height of one elephant ear. Don't crowd it.
2. **Don't recolor the elephant.** Use the cream version on dark backgrounds, the original on light ones. That's it — no purple elephants, no gradients.
3. **Don't stretch.** If the file looks wrong at a size, use a different one (or open the SVG and resize properly).
4. **Don't add effects.** No drop shadows, no glows, no outlines. The mark already has all the structure it needs.
5. **Minimum size for the lockup**: 120px wide. Below that, use the elephant alone.

---

## If you need to edit anything

Open any `.svg` file in Figma (free) — just drag the file into a Figma canvas. You can change colors, swap the wordmark font, adjust spacing. Re-export as SVG or PNG when done.

If the wordmark renders as a different font on someone else's machine, that's because the SVG specifies "Geist, Outfit, system-ui" — these are sans-serif fallbacks. For maximum portability, the PNG versions have the typography baked in.
