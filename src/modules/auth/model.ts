import Elysia, { t } from 'elysia'
import { UserModel } from '@/modules/users/model'

export const AuthModel = new Elysia({
	name: 'Model.Auth',
})
	.use(UserModel)
	.model({
		'auth.login': t.Object(
			{
				username: t.String(),
				password: t.String(),
			},
			{
				additionalProperties: false,
			},
		),
	})
