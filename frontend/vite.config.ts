import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    // base: '/app/',  // your base URL
    plugins: [
      tailwindcss(),
      react(),
  ],
    server: {
        allowedHosts: true,
        proxy: {
            '/api': {
                 target: 'http://localhost:8080', // Spring Boot server
                 changeOrigin: true,
                 rewrite: (path) => path.replace(/^\/api/, ''),
                 secure: false,
            },
        },
    }
})
