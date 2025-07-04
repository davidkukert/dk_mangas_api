import { z } from 'zod'

export const chapterSchema = z.object({
	__typename: z.literal('Chapter').default('Chapter'),
	id: z.string(),
})

export type Chapter = z.infer<typeof chapterSchema>
