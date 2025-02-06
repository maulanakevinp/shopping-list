import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // base: '/shopping-list/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kalkulator Daftar Belanja',
        short_name: 'Kalkulator Daftar Belanja',
        description: 'Kalkulator Daftar Belanja',
        theme_color: '#ffffff',
        icons: [
          {
            // src: '/shopping-list/128x128.png',
            src: '/128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            // src: '/shopping-list/512x512.png',
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
})
