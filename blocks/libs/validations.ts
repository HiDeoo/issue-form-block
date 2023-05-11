import { z } from 'zod'

export * from 'zod'

export const zNonEmptyString = z.string().trim().min(1)
