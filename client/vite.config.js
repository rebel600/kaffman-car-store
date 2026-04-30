import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const API_URL = import.meta.env.VITE_API_URL_PRODUCTION || import.meta.env.VITE_API_URL_DEVELOPMENT;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "",
        target: API_URL,
        changeOrigin: true,
      }
    },
  },
})
