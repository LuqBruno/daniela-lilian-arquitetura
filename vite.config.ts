import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: a prévia abre de qualquer pasta servida, sem depender de domínio.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: '127.0.0.1' },
})
