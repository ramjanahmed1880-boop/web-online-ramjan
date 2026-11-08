import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          freeWebsite: path.resolve(__dirname, 'free-website.html'),
          premiumApps: path.resolve(__dirname, 'premium-apps.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          pcTools: path.resolve(__dirname, 'pc-tools.html'),
          security: path.resolve(__dirname, 'security.html'),
          apiKey: path.resolve(__dirname, 'api-key.html'),
          botMaking: path.resolve(__dirname, 'bot-making.html'),
          apkBuilding: path.resolve(__dirname, 'apk-building.html'),
          reviewProject: path.resolve(__dirname, 'review-project.html'),
          services: path.resolve(__dirname, 'services.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          admin: path.resolve(__dirname, 'admin.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
