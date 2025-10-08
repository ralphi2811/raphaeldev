import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/raphaeldev/', // GitHub Pages avec nom de repo
  build: {
    outDir: 'dist',
  }
})
