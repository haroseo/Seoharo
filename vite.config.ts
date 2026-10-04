import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), ...(isSsrBuild ? [{
    name: 'ssg-client-styles-only',
    enforce: 'pre' as const,
    // Styles are already compiled in the client build; the HTML renderer needs no CSS bundle.
    load(id: string) { if (id.endsWith('.css')) return ''; },
  }] : [])],
  base: '/',
  publicDir: isSsrBuild ? false : 'public',
}))
