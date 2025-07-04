import { z } from 'zod'

export const role = z.union([
	z.enum([
		'admin',
		'manager',
		'moderator',
		'uploader',
		'author',
		'reader',
	]),
	z.literal('guess').default('guess'),
])

export type Role = z.infer<typeof role>
