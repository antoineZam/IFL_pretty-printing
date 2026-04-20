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
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'socket-vendor': ['socket.io-client'],
          // Split pages into logical chunks
          'tdeu-pages': [
            './src/pages/TDEU/TDEUDashboardPage.tsx',
            './src/pages/TDEU/IFLMatchControlPage.tsx',
            './src/pages/TDEU/IFLMatchOverlayPage.tsx',
            './src/pages/TDEU/TagTeamControlPage.tsx',
            './src/pages/TDEU/TagTeamOverlayPage.tsx'
          ],
          'tdeu-top8': [
            './src/pages/TDEU/IFLTop8ControlPage.tsx',
            './src/pages/TDEU/IFLTop8OverlayPage.tsx',
            './src/pages/TDEU/IFLTop8StandingsControlPage.tsx',
            './src/pages/TDEU/IFLTop8StandingsOverlayPage.tsx'
          ],
          'tdeu-data': [
            './src/pages/TDEU/TournamentDataPage.tsx'
          ],
          'rib-pages': [
            './src/pages/IFF/RIBDashboardPage.tsx',
            './src/pages/IFF/RIBMatchControlPage.tsx',
            './src/pages/IFF/RIBMatchCardsEditorPage.tsx'
          ],
          'rib-overlays': [
            './src/pages/IFF/RIBSingleMatchOverlay.tsx',
            './src/pages/IFF/RIBPlayerStatsOverlay.tsx',
            './src/pages/IFF/RIBPartOneOverlay.tsx',
            './src/pages/IFF/RIBStreamOverlay.tsx',
            './src/pages/IFF/RIBUnifiedOverlay.tsx'
          ],
          'love-and-war': [
            './src/pages/IFF/LoveAndWarDashboardPage.tsx',
            './src/pages/IFF/LoveAndWarControlPage.tsx',
            './src/pages/IFF/LoveAndWarTeamStatsOverlay.tsx',
            './src/pages/IFF/LoveAndWarTournamentsPage.tsx',
            './src/pages/IFF/LoveAndWarBracketPage.tsx',
            './src/pages/IFF/LoveAndWarRankingsPage.tsx',
            './src/pages/IFF/LoveAndWarMatchControlPage.tsx',
            './src/pages/IFF/LoveAndWarMatchOverlay.tsx',
            './src/pages/IFF/LoveAndWarUnifiedOverlay.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
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
