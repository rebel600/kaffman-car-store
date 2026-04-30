import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5713",
        target: "https://kaffman-car-store.onrender.com",
        changeOrigin: true,
      }
    },
  },
})
