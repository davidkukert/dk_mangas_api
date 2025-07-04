import { z } from 'zod'
import { chapterSchema } from '../models/chapter'

export const chapterSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('upload_pages'),
		z.literal('delete_pages'),
		z.literal('manage'),
	]),
	z.union([z.literal('Chapter'), chapterSchema]),
])

export type ChapterSubject = z.infer<typeof chapterSubject>
