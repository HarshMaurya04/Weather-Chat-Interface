import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import 'dotenv/config';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // This custom plugin runs api/weather.js file locally
    {
      name: 'local-api-server',
      configureServer(server) {
        server.middlewares.use('/api/weather', async (req, res) => {
          try {
            const { default: handler } = await import('./api/weather.js');
            await handler(req, res);
          } catch (error) {
            console.error('API middleware error:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        });
      },
    },
  ],
});