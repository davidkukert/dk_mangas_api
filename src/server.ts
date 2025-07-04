import Elysia from 'elysia'
import { BunAdapter } from 'elysia/adapter/bun'
import { envVars } from '@/env'
import { auth } from '@/modules/auth'
import { users } from '@/modules/users'
import setup from '@/setup'

new Elysia({
	normalize: 'typebox',
	adapter: BunAdapter,
	aot: true,
})
	.use(setup)
	.use(users)
	.use(auth)
	.listen(
		{
			port: envVars.PORT,
		},
		(server) => {
			console.log(`🦊 Elysia is running at ${server.url}`)
		},
	)
