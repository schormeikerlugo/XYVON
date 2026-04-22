import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xyvon.com',
  trailingSlash: 'ignore',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: {
          chrome: 100 << 16,
          firefox: 103 << 16,
          safari: 15 << 16,
          edge: 100 << 16,
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
