import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/detail":"http://localhost:7000",
    },
  },
  plugins: [react()],
})