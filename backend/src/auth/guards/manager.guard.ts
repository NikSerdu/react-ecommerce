import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PrismaService } from 'src/prisma.service'

export class OnlyManagerGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		prisma: PrismaService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const user = request.user
		const isManager = user.roles.includes('MANAGER')

		if (!isManager) throw new ForbiddenException("You don't have rights!")

		return isManager
	}
}
