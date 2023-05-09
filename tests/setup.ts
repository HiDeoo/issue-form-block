import crypto from 'node:crypto'

Object.defineProperty(global.self, 'crypto', {
  value: {
    randomUUID: crypto.randomUUID,
  },
})
