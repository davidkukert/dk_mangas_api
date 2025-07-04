import type { AbilityBuilder } from '@casl/ability'
import type { UserSelectOutput } from '@/modules/users/model'
import type { Role } from '@/utils/permissions/roles'
import type { AppAbility } from '.'

type permissionsByRole = (user: UserSelectOutput, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, permissionsByRole> = {
	admin(_user, { can, cannot }) {
		can('manage', 'all')
		cannot(
			[
				'update',
				'delete',
			],
			'User',
			{
				role: {
					$eq: 'admin',
				},
			},
		)
	},
	manager(user, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Tag',
			'Chapter',
		])
		can('manage', [
			'Manga',
			'Chapter',
		])
		can(
			[
				'delete',
				'update',
				'read',
			],
			'User',
			{
				id: {
					$eq: user.id,
				},
			},
		)
	},
	moderator(user, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Tag',
			'Chapter',
		])
		can(
			[
				'delete',
				'update',
				'read',
			],
			'User',
			{
				id: {
					$eq: user.id,
				},
			},
		)
	},
	author(user, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Tag',
			'Chapter',
		])
		can(
			[
				'delete',
				'update',
				'read',
			],
			'User',
			{
				id: {
					$eq: user.id,
				},
			},
		)
	},
	uploader(user, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Chapter',
			'Tag',
		])
		can(
			[
				'upload_pages',
				'create',
				'update',
			],
			'Chapter',
		)
		can(
			[
				'delete',
				'update',
				'read',
			],
			'User',
			{
				id: {
					$eq: user.id,
				},
			},
		)
	},
	reader(user, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Tag',
			'Chapter',
		])
		can(
			[
				'delete',
				'update',
				'read',
			],
			'User',
			{
				id: {
					$eq: user.id,
				},
			},
		)
	},
	guess(_, { can, cannot }) {
		can('read', [
			'Manga',
			'Author',
			'Tag',
			'Chapter',
		])
		can('create', 'User')
	},
}
