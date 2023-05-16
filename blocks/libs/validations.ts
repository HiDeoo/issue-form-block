import { z } from 'zod'

export * from 'zod'

export const zNonEmptyString = z.string().trim().min(1)

export const zTokenList = z.union([z.string(), z.string().array()])
