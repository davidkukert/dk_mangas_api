import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { envVars } from '@/env'
import * as schema from './schema'

const pool = new Pool({
	connectionString: envVars.DATABASE_URL,
})

export const db = drizzle({
	client: pool,
	schema,
})
