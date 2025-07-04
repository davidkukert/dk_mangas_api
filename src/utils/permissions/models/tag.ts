import { z } from 'zod'

export const tagSchema = z.object({
	__typename: z.literal('Tag').default('Tag'),
	id: z.string(),
})

export type Tag = z.infer<typeof tagSchema>
