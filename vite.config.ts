import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['src/repository/**', 'prisma'],
      ['src/http/*', 'prisma'],
    ],
  },
})
