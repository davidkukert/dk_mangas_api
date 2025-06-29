import Elysia from 'elysia'
import { httpError, httpErrorDecorator } from 'elysia-http-error'

export default new Elysia({
	name: 'App.Setup',
})
	.use(httpError())
	.use(httpErrorDecorator)
