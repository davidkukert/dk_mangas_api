import Elysia from 'elysia'
import { httpError, httpErrorDecorator } from 'elysia-http-error'
import { dbErrors } from '@/db'
import { AuthService } from '@/modules/auth/service'

export default new Elysia({
	name: 'App.Setup',
})
	.use(httpError())
	.use(httpErrorDecorator)
	.use(dbErrors)
	.use(AuthService)
