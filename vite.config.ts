import { defineConfig } from 'vite'

// Pre-bundle JSXGraph up front. It is imported from components/lib/*.ts, which Vite's
// initial dependency scan does not reach; discovering it later triggers a re-optimisation
// that loads two copies of the Slidev client in dev mode (blank page).
export default defineConfig({
  optimizeDeps: {
    include: ['jsxgraph'],
  },
})
