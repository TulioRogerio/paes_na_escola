import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/paes_na_escola/',
  server: {
    port: 3000,
    open: true
  }
})

