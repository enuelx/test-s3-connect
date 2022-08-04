import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const production = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteAliases(),
    !production &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      })
  ],
  build: {
    outDir: './build',
    rollupOptions: {
      plugins: [nodePolyfills()],
      external: ['uuid']
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
