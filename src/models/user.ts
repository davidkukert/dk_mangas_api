import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox'
import Elysia, { type Static, t } from 'elysia'
import { usersTable } from '@/db/schema'

const userInsertSchema = createInsertSchema(usersTable)
const userUpdateSchema = createUpdateSchema(usersTable)
const userSelectSchema = createSelectSchema(usersTable)

export type UserInsertInput = Static<typeof userInsertSchema>
export type UserUpdateInput = Static<typeof userUpdateSchema>
export type UserSelectOutput = Static<typeof userSelectSchema>

export default new Elysia({
	name: 'Model.User',
}).model({
	'user.create': t.Omit(userInsertSchema, [
		'id',
		'createdAt',
		'updatedAt',
	]),
	'user.update': t.Omit(userUpdateSchema, [
		'id',
		'createdAt',
		'updatedAt',
	]),
	'user.index': t.Object({
		data: t.Array(
			t.Omit(userSelectSchema, [
				'password',
			]),
		),
	}),
	'user.show': t.Object({
		data: t.Omit(userSelectSchema, [
			'password',
		]),
	}),
})
