import { z } from 'zod'

const envSchema = z.object({
	DATABASE_URL: z.string().url().min(1, 'DATABASE_URL is required'),
	PORT: z.coerce.number().default(3333),
})

export const envVars = envSchema.parse(process.env)
