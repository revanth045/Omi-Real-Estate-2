import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: Number(process.env.PORT) || 8181,
    host: '0.0.0.0'
  },
  preview: {
    port: Number(process.env.PORT) || 8181,
    host: '0.0.0.0'
  },
  base: process.env.BASE_PATH || '/'
})
