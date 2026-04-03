import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: 'CinéList',
        short_name: 'CinéList',
        start_url: '/',
        display: 'standalone',
        background_color: '#121212',
        theme_color: '#e50914',
        icons: [
          {
            src: '/favicon_movie.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon.ico',
            sizes: '512x512',
            type: 'image/x-icon'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
