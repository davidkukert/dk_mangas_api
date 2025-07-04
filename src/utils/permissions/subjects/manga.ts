import { z } from 'zod'
import { mangaSchema } from '../models/manga'

export const mangaSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('add_author'),
		z.literal('remove_author'),
		z.literal('add_tag'),
		z.literal('remove_tag'),
		z.literal('upload_cover'),
		z.literal('delete_cover'),
		z.literal('manage'),
	]),
	z.union([z.literal('Manga'), mangaSchema]),
])

export type MangaSubject = z.infer<typeof mangaSubject>
