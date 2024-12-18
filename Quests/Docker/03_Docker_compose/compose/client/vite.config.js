import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// https://stackoverflow.com/questions/77136878/vite-app-in-docker-container-not-accessible-on-localhost
export default defineConfig({
  plugins: [react()],
  server: { host: true }
});
