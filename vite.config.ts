import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 兼容旧 iOS / 鸿蒙 WebView（Chromium 87+ / Safari 14+）
    target: ['chrome87', 'safari14', 'firefox88', 'edge88'],
    cssTarget: 'chrome87',
  },
  server: {
    port: 5585,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 5585,
    host: true,
    strictPort: true,
  },
})
