import { and, eq, exists, ne } from 'drizzle-orm'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import type { UserInsertInput, UserUpdateInput } from '@/models/user'

export class UsersService {
	async findMany() {
		const result = await db.select().from(usersTable)
		return result
	}

	async findById(id: string) {
		const result = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)
		return result[0]
	}

	async create(data: UserInsertInput) {
		const result = await db.insert(usersTable).values(data).returning().onConflictDoNothing()
		return result[0]
	}

	async update(id: string, data: UserUpdateInput) {
		const result = await db
			.update(usersTable)
			.set(data)
			.where(eq(usersTable.id, id))
			.returning()
		return result[0]
	}

	async delete(id: string) {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}

	async existsByUsernameAndId(username: string, id?: string) {
		const result = await db.$count(
			usersTable,
			id
				? and(eq(usersTable.username, username), ne(usersTable.id, id))
				: eq(usersTable.username, username),
		)

		return result > 0
	}
}
