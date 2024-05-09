import { applyDecorators, UseGuards } from '@nestjs/common'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { TypeRole } from '../guards/auth.interface'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { OnlyManagerGuard } from '../guards/manager.guard'

export const Auth = (role: TypeRole = 'user') => {
	return applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard, OnlyManagerGuard)
			: role === 'manager'
				? UseGuards(JwtAuthGuard, OnlyManagerGuard)
				: UseGuards(JwtAuthGuard)
	)
}
