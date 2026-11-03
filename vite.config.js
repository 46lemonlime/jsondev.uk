/**
 * @file vite.config.js
 * @description Vite configuration file for jsondev.uk.
 * @responsibility Configure React plugin and build bundling options for Vite.
 */

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
})
