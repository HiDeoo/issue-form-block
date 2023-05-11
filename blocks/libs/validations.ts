import { z } from 'zod'

export { z } from 'zod'

export const zNonEmptyString = z.string().trim().min(1)
