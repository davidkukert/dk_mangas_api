import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from '@casl/ability'
import { z } from 'zod'
import type { UserSelectOutput } from '@/modules/users/model'
import { permissions } from './permissions'
import { authorSubject } from './subjects/author'
import { chapterSubject } from './subjects/chapter'
import { mangaSubject } from './subjects/manga'
import { tagSubject } from './subjects/tag'
import { userSubject } from './subjects/user'

const appAbilitiesSchema = z.union([
	authorSubject,
	chapterSubject,
	mangaSubject,
	tagSubject,
	userSubject,
	z.tuple([
		z.literal('manage'),
		z.literal('all'),
	]),
])

export type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: UserSelectOutput) {
	const builder = new AbilityBuilder(createAppAbility)
	const userPermissions = permissions[user.role] ?? permissions.guess
	if (typeof userPermissions !== 'function') {
		throw new Error(`Permissions for role ${user.role} not found. `)
	}

	userPermissions(user, builder)
	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	ability.can = ability.can.bind(ability)
	ability.cannot = ability.cannot.bind(ability)

	return ability
}
