import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-terminal/', // Remplacez par le nom de votre repo GitHub
  build: {
    outDir: 'dist',
  }
})
