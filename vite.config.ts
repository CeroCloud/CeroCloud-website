import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  base: '/CeroCloud-website/',
  plugins: [
    { enforce: 'pre', ...mdx() },
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
