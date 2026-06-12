import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
        allowedHosts: ["dev-aureavita.eviniegra.qzz.io", "dev-aureavita.consorciorazo.com"]
        }
});