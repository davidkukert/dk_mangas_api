import { z } from 'zod'

export const mangaSchema = z.object({
	__typename: z.literal('Manga').default('Manga'),
	id: z.string(),
})

export type Manga = z.infer<typeof mangaSchema>
