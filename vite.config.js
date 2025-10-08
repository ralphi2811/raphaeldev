import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Repository à la racine pour raphaeldev.fr
  build: {
    outDir: 'dist',
  }
})
