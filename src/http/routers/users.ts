import Elysia from 'elysia'
import UserModel from '@/models/user'
import { UsersService } from '@/services/users'
import setup from '@/setup'

export default new Elysia({
	prefix: '/users',
})
	.use(setup)
	.use(UserModel)
	.decorate('users', new UsersService())
	.get(
		'/',
		async ({ users }) => {
			const data = await users.findMany()
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
		async ({ HttpError, body, set, users }) => {
			const { username, password } = body
			const data = await users.create({
				username,
				password: await Bun.password.hash(password),
			})

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
		async ({ HttpError, params: { id }, users }) => {
			const data = await users.findById(id)

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
		async ({ HttpError, body, params: { id }, users }) => {
			const user = await users.findById(id)
			if (!user) {
				throw HttpError.NotFound('User not found')
			}

			const { username, password } = body

			if (username && !(user.username === username)) {
				const usernameExists = await users.existsByUsernameAndId(username, id)
				if (usernameExists) {
					throw HttpError.Conflict('Username already exists')
				}
			}

			const data = await users.update(id, {
				username,
				password: password && (await Bun.password.hash(password)),
			})

			return {
				data: data ?? user,
			}
		},
		{
			body: 'user.update',
			response: 'user.show',
		},
	)
	.delete('/:id', async ({ HttpError, params: { id }, users }) => {
		const user = await users.findById(id)
		if (!user) {
			throw HttpError.NotFound('User not found')
		}

		await users.delete(id)

		return {
			message: 'User deleted',
		}
	})
