import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Matched by resolved module path rather than by bare specifier. The
        // previous object form only named 'react', which left react/jsx-runtime
        // (a separate entry point of the package) unassigned -- Rollup folded it
        // into three-vendor, so every chunk in the app, overlays included, ended
        // up statically importing the 900 kB three.js bundle just to get `jsx`.
        manualChunks(id: string) {
          const path = id.replace(/\\/g, '/');
          // Vite's dynamic-import preload helper. Left unassigned, Rollup parked
          // it inside three-vendor -- which on its own was enough to make the
          // entry chunk statically import three.js. Pin it next to React, which
          // every page loads anyway.
          if (path.includes('vite/preload-helper')) return 'react-vendor';
          if (!id.includes('node_modules')) return;
          if (/\/node_modules\/(three|@react-three)\//.test(path)) return 'three-vendor';
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(path)) return 'react-vendor';
          if (/\/node_modules\/(socket\.io-client|socket\.io-parser|engine\.io-client|engine\.io-parser)\//.test(path)) return 'socket-vendor';
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    // public/ is ~156 MB of overlay artwork and fonts. The express server serves
    // those straight from client/public/source (see the /source mount in
    // server.js), so copying the whole tree into dist/ on every build only
    // duplicated it on disk. Takes dist from ~175 MB to ~2 MB and about 4s off
    // each build. NOTE: this makes client/public a runtime dependency -- dist/
    // alone can no longer serve the overlay artwork.
    // Dev is unaffected -- vite serves public/ from its own root either way.
    copyPublicDir: false
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      }
    }
  }
})
