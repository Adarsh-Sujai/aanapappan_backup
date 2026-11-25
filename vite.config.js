import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for Aana Pappan studio site.
// `npm run dev`   -> live-reload local server
// `npm run build` -> production build into ./dist/
// `npm run preview` -> serve the production build locally to test it
export default defineConfig({
  plugins: [react()],
  
  // Base path for GitHub Pages
  base: '/aanapappan_backup/',

  build: {
    // Output to ./dist/
    outDir: 'dist',
    emptyOutDir: true,

    // Inline small assets (favicons, etc.) under 4kb as base64
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // Use predictable filenames so server-side caching can be configured
        entryFileNames: 'assets/app-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
