import { z } from 'zod'
import { authorSchema } from '../models/author'

export const authorSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
	]),
	z.union([z.literal('Author'), authorSchema]),
])

export type AuthorSubject = z.infer<typeof authorSubject>
