import { DrizzleQueryError } from 'drizzle-orm/errors'
import { drizzle } from 'drizzle-orm/node-postgres'
import Elysia from 'elysia'
import { type DatabaseError, Pool } from 'pg'
import * as schema from '@/db/schema'
import { envVars } from '@/env'

const pool = new Pool({
	connectionString: envVars.DATABASE_URL,
})

export const db = drizzle({
	client: pool,
	schema,
})

export const dbErrors = new Elysia({
	name: 'Plugin.DBErrors',
})
	.error({
		DrizzleQueryError,
	})
	.onError(
		{
			as: 'global',
		},
		({ error, code, set }) => {
			if (code === 'DrizzleQueryError') {
				if (error.cause) {
					const cause = error.cause as DatabaseError
					if (cause.code === 'ECONNREFUSED') {
						set.status = 503
						return 'DATABASE_UNAVAILABLE'
					}
				}
			}
		},
	)
