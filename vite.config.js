/**
 * @file vite.config.js
 * @description Vite configuration file for jsondev.uk.
 * @responsibility Configure React plugin and build bundling options for Vite.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
