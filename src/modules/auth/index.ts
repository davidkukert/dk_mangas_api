import Elysia from 'elysia'
import { AuthModel } from '@/modules/auth/model'
import { AuthService } from '@/modules/auth/service'
import setup from '@/setup'

export const auth = new Elysia({
	prefix: '/auth',
})
	.use(setup)
	.use(AuthService)
	.use(AuthModel)
	.get(
		'/me',
		async ({ currentUser }) => {
			return {
				data: currentUser,
			}
		},
		{
			privateRoute: true,
			response: {
				200: 'user.show',
			},
		},
	)
	.post(
		'/login',
		async ({ HttpError, body, getToken, status, users }) => {
			const { username, password } = body
			const user = await users.findByUsername(username)
			if (!user || !(await Bun.password.verify(password, user.password))) {
				throw HttpError.Unauthorized('Invalid credentials')
			}

			const token = await getToken(user.id)
			return status('Created', {
				token,
				type: 'Bearer',
			})
		},
		{
			body: 'auth.login',
		},
	)
