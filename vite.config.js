import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/paes_na_escola/', // Não necessário com HashRouter
  server: {
    port: 3000,
    open: true
  }
})

