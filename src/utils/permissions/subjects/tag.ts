import { z } from 'zod'
import { tagSchema } from '../models/tag'

export const tagSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
	]),
	z.union([z.literal('Tag'), tagSchema]),
])

export type TagSubject = z.infer<typeof tagSubject>
