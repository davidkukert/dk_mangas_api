import { timestamp, varchar } from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'

export const idColumn = {
	id: varchar('id')
		.primaryKey()
		.$defaultFn(() => ulid()),
}

export const timestamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
}
