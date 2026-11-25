# Aana Pappan — Vite build

Modern production build setup for the Aana Pappan studio site.

---

## First-time setup
Open a terminal in this folder and run:

```bash
npm install
```

### `npm run dev` — develop
Starts a local development server with live reload. Open the URL it prints
(usually http://localhost:5173). Edit files in `src/` — the browser auto-refreshes.

### `npm run build` — produce production files
Bundles everything into `dist/`. 



## What's where

```
aana-pappan/
├── index.html              
├── src/
│   ├── main.jsx            ← all React code.
│   └── index.css           ← Custom styles + Tailwind directives
├── package.json            ← Dependency list.
├── vite.config.js          ← Build tool config
├── tailwind.config.js      ← Brand colors, fonts
├── postcss.config.js       ← internal plumbing
└── .gitignore              
```
