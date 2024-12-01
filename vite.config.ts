import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()  // This already handles all React and TypeScript transformations
  ],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL),
      VITE_ENCRYPTION_KEY: JSON.stringify(process.env.VITE_ENCRYPTION_KEY),
      POSTGRES_USER: JSON.stringify(process.env.POSTGRES_USER),
      POSTGRES_HOST: JSON.stringify(process.env.POSTGRES_HOST),
      POSTGRES_DB: JSON.stringify(process.env.POSTGRES_DB),
      POSTGRES_PASSWORD: JSON.stringify(process.env.POSTGRES_PASSWORD),
      POSTGRES_PORT: JSON.stringify(process.env.POSTGRES_PORT),
      REDIS_HOST: JSON.stringify(process.env.REDIS_HOST),
      REDIS_PORT: JSON.stringify(process.env.REDIS_PORT),
      REDIS_PASSWORD: JSON.stringify(process.env.REDIS_PASSWORD),
      MATTERMOST_URL: JSON.stringify(process.env.MATTERMOST_URL),
      MATTERMOST_TOKEN: JSON.stringify(process.env.MATTERMOST_TOKEN)
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['recharts', 'chart.js'],
          'editor-vendor': ['@tiptap/react', '@tiptap/starter-kit'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      '@heroicons/react',
    ],
    exclude: ['@codemirror/view'], // Heavy dependencies that aren't needed immediately
  },
});