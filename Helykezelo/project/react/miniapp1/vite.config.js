import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Eredeti
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

export default defineConfig({
  base: './',
  plugins: [react()],
})
