import Elysia from 'elysia'
import { BunAdapter } from 'elysia/adapter/bun'
import { envVars } from '@/env'
import usersRouter from './routers/users'

new Elysia({
	normalize: 'typebox',
	adapter: BunAdapter,
	aot: true,
})
	.use(usersRouter)
	.listen(
		{
			port: envVars.PORT,
		},
		(server) => {
			console.log(`🦊 Elysia is running at ${server.url}`)
		},
	)
