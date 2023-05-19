import fs from 'node:fs/promises'

import { build } from 'esbuild'

import config from '../blocks.config.json'

await fs.rm('dist', { recursive: true, force: true })

for (const block of config) {
  console.info(`Building block '${block.id}'.`)

  // https://github.com/githubnext/blocks-template-react/blob/9cf64078f61c85b746a1dcab6d61dcaf5cf63401/scripts/build.js
  await build({
    bundle: true,
    entryPoints: [`./${block.entry}`],
    // We cannot mark `@primer/react` as `external` because we need `@primer/react/drafts` which seems to be not
    // available.
    external: ['assert', 'fs', 'os', 'path', 'react', 'react-dom' /* , '@primer/react' */],
    format: 'iife',
    globalName: 'BlockBundle',
    minify: true,
    outdir: `dist/${block.id}`,
  })
}
