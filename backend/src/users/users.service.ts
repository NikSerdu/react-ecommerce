import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async byId(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				email: true,
				roles: true,
				name: true
			}
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}

	async all() {
		const users = await this.prisma.user.findMany()

		return users
	}

	async addRole(userId: string, role: Role) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})
		if (user.roles.includes(role)) {
			return user
		}
		const userUpdated = await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				roles: [...user.roles, role]
			}
		})
		return userUpdated
	}

	async removeRole(userId: string, role: Role) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})
		if (!user.roles.includes(role)) {
			return user
		}
		const userUpdated = await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				roles: user.roles.filter(userRole => userRole !== role)
			}
		})
		return userUpdated
	}
}
