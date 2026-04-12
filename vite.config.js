import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), visualizer({ open: true, gzipSize: true })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react-dom'
          if (id.includes('node_modules/react/'))   return 'vendor-react'
          if (id.includes('node_modules/react-router-dom') || 
              id.includes('node_modules/react-router/') ||
              id.includes('node_modules/@remix-run')) return 'vendor-router'
        },
      },
    },
  },
})