import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 0, // keep every image a real, browser-cacheable file
  },
})
