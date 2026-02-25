import { build } from 'esbuild'
import { rmSync } from 'fs'

// 构建前清理 dist 目录
rmSync('dist', { recursive: true, force: true })

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'es2020',
  external: ['tyme4ts'],
  sourcemap: true,
}

// ESM 与 CJS 并行构建
await Promise.all([
  build({ ...shared, format: 'esm', outfile: 'dist/esm/index.js' }),
  build({ ...shared, format: 'cjs', outfile: 'dist/cjs/index.js' }),
])

console.log('Build completed successfully.')
