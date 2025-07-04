import { z } from 'zod'

export const authorSchema = z.object({
	__typename: z.literal('Author').default('Author'),
	id: z.string(),
})

export type Author = z.infer<typeof authorSchema>
