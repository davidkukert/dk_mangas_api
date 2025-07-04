import { z } from 'zod'

const envSchema = z.object({
	DATABASE_URL: z.string().url().min(1, 'DATABASE_URL is required'),
	PORT: z.coerce.number().int().min(1, 'PORT must be a positive integer').default(3333),
	ACCESS_KEY_ID: z.string().min(1, 'ACCESS_KEY_ID is required'),
	SECRET_ACCESS_KEY: z.string().min(1, 'SECRET_ACCESS_KEY is required'),
	BUCKET_NAME: z.string().min(1, 'BUCKET_NAME is required'),
	ENDPOINT_URL: z.string().url().min(1, 'ENDPOINT_URL is required'),
	JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
})

export const envVars = envSchema.parse(process.env)
