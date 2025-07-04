import { z } from 'zod'
import { role } from '../roles'

export const userSchema = z.object({
	__typename: z.literal('User').default('User'),
	id: z.string(),
	role: role,
})

export type User = z.infer<typeof userSchema>
