/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Aquí habilitamos los comandos globales como describe, test, expect
    globals: true,
    projects: [
      // PROYECTO 1: El que ya tenías de Storybook con Playwright
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{
              browser: 'chromium'
            }]
          }
        }
      },
      // PROYECTO 2: EL NUEVO (Para tus pruebas de componentes de Perfil y Comparación)
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom', // Entorno rápido en memoria
          setupFiles: [path.join(dirname, 'src/setupTests.ts')], // Extensiones para HTML
          include: ['src/**/*.test.{ts,tsx}'] // Dónde buscar tus archivos de prueba
        }
      }
    ]
  }
});