import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Esto hace que "@" apunte a la carpeta "src"
    },
  },
  server: {
    allowedHosts: [ "mifrontend.loca.lt","69aa-186-0-28-200.ngrok-free.app"],
  },
});
