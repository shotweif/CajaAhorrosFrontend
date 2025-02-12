import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// main config
export default defineConfig({
  // plugins: [react()],
  server: {
    port: 2025,
    open: true,
    cors: true,
  },
  // build: {
  //   outDir: './dist',
  // },
});


