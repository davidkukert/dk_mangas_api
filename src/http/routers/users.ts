import { and, eq, ne } from 'drizzle-orm'
import Elysia from 'elysia'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import UserModel from '@/models/user'
import setup from '@/setup'

export default new Elysia({
	prefix: '/users',
})
	.use(setup)
	.use(UserModel)
	.get(
		'/',
		async () => {
			const data = await db.select().from(usersTable)
			return {
				data,
			}
		},
		{
			response: 'user.index',
		},
	)
	.post(
		'/',
		async ({ HttpError, body, set }) => {
			const { username, password } = body
			const data = (
				await db
					.insert(usersTable)
					.values({
						username,
						password: await Bun.password.hash(password),
					})
					.returning()
					.onConflictDoNothing()
			)[0]

			if (!data) {
				throw HttpError.Conflict('User already exists')
			}

			set.status = 201
			return {
				data,
			}
		},
		{
			body: 'user.create',
			response: {
				201: 'user.show',
			},
		},
	)
	.get(
		'/:id',
		async ({ HttpError, params: { id } }) => {
			const data = (
				await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)
			)[0]

			if (!data) {
				throw HttpError.NotFound('User not found')
			}

			return {
				data,
			}
		},
		{
			response: 'user.show',
		},
	)
	.put(
		'/:id',
		async ({ HttpError, body, params: { id } }) => {
			const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)
			if (!user[0]) {
				throw HttpError.NotFound('User not found')
			}

			const { username, password } = body

			if (username && !(user[0].username === username)) {
				const usernameExists = await db
					.select()
					.from(usersTable)
					.where(and(eq(usersTable.username, username), ne(usersTable.id, id)))
				if (usernameExists.length > 0) {
					throw HttpError.Conflict('Username already exists')
				}
			}

			const data = (
				await db
					.update(usersTable)
					.set({
						username,
						password: password && (await Bun.password.hash(password)),
					})
					.where(eq(usersTable.id, id))
					.returning()
			)[0]

			return {
				data: data ?? user[0],
			}
		},
		{
			body: 'user.update',
			response: 'user.show',
		},
	)
	.delete('/:id', async ({ HttpError, params: { id } }) => {
		const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)
		if (!user[0]) {
			throw HttpError.NotFound('User not found')
		}

		await db.delete(usersTable).where(eq(usersTable.id, id))

		return {
			message: 'User deleted',
		}
	})
