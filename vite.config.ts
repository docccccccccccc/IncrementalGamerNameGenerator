import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import obfuscatorPlugin from 'vite-plugin-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    process.env.NODE_ENV === 'production' &&
      obfuscatorPlugin({
        include: [/\.js$/, /\.ts$/, /\.vue$/],
        exclude: ['node_modules/**'],
        options: {
          // Basic compression
          compact: true, // Remove space
          simplify: true,

          // Core protect
          stringArray: true,
          stringArrayEncoding: ['base64'], // Endoce string
          stringArrayThreshold: 0.8, // 80%

          numbersToExpressions: true,

          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.7,
          deadCodeInjection: true, // Dead code
          deadCodeInjectionThreshold: 0.4,

          identifierNamesGenerator: 'hexadecimal',

          disableConsoleOutput: true,
          debugProtection: false,
          selfDefending: false,
        },
      }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: false,
        drop_console: true,
      },
    },
  },
})
