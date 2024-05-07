import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PrismaService } from 'src/prisma.service'

export class OnlyAdminGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		prisma: PrismaService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const user = request.user
		const isAdmin = user.roles.includes('ADMIN')

		if (!isAdmin) throw new ForbiddenException("You don't have rights!")

		return isAdmin
	}
}
