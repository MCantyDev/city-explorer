import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      // https://vite.dev/guide/build.html#chunking-strategy
      output: {
        // Customize how the chunk files and assets will be named
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',

        // Manually chunking js scripts
        manualChunks: {
          react: ['react', 'react-dom', 'react-helmet-async'],
          reactRouter: ['react-router-dom', 'react-error-boundary'],
          bootstrap: ['bootstrap', 'react-bootstrap'],
          leaflets: ['leaflet', 'react-leaflet'],
          misc: ['axios', 'throttle-debounce'],
        }
      }
    }
  }
})
