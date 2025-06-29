import { defineConfig } from 'drizzle-kit'
import { envVars } from '@/env'

export default defineConfig({
	out: './migrations',
	schema: './src/db/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: envVars.DATABASE_URL,
	},
	casing: 'snake_case',
})
