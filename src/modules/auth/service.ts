import type { CanParameters } from '@casl/ability'
import bearer from '@elysiajs/bearer'
import jwt from '@elysiajs/jwt'
import { eq } from 'drizzle-orm'
import Elysia from 'elysia'
import { httpErrorDecorator } from 'elysia-http-error'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { envVars } from '@/env'
import type { UserSelectOutput } from '@/modules/users/model'
import { UsersService } from '@/modules/users/service'
import { type AppAbilities, defineAbilityFor } from '@/utils/permissions'

export const AuthService = new Elysia({
	name: 'Service.Auth',
})
	.decorate('users', new UsersService())
	.use(httpErrorDecorator)
	.use(
		jwt({
			secret: envVars.JWT_SECRET,
			exp: 60 * 60 * 24 * 7,
		}),
	)
	.use(bearer())
	.derive(
		{
			as: 'global',
		},
		({ HttpError, bearer, jwt }) => ({
			async getCurrentUser() {
				if (!bearer) {
					throw HttpError.Unauthorized('Token not provided or invalid')
				}

				const payload = await jwt.verify(bearer)
				if (!payload) {
					throw HttpError.Unauthorized('Token not provided or invalid')
				}

				if (payload.sub === undefined) {
					throw HttpError.Unauthorized('Token not provided or invalid')
				}

				const result = await db
					.select()
					.from(usersTable)
					.where(eq(usersTable.id, payload.sub))
					.limit(1)

				if (!result[0]) {
					throw HttpError.Unauthorized('Authentication failed, please try again')
				}

				return result[0]
			},
			async getToken(userId: string) {
				const token = await jwt.sign({
					sub: userId,
				})

				return token
			},
			async authorization(user: UserSelectOutput, ...args: CanParameters<AppAbilities>) {
				if (defineAbilityFor(user).cannot(...args)) {
					throw HttpError.Forbidden('You are not allowed to perform this action')
				}
			},
		}),
	)
	.macro({
		privateRoute: {
			async resolve({ getCurrentUser }) {
				return {
					currentUser: await getCurrentUser(),
				}
			},
		},
	})
