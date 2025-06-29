import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { idColumn, timestamps } from './helpers/columns'

export const roleUserEnum = pgEnum('role_user_enum', [
	'admin',
	'manager',
	'moderator',
	'uploader',
	'author',
	'reader',
])

export const usersTable = pgTable('users', {
	...idColumn,
	username: varchar('username').unique().notNull(),
	password: varchar('password').notNull(),
	role: roleUserEnum('role').default('reader').notNull(),
	...timestamps,
})
