import { Body, Controller, Get, Put } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Auth('user')
	@Get('profile')
	async getProfile(@CurrentUser('id') userId: string) {
		return this.usersService.byId(userId)
	}

	@Get('all')
	async getAll() {
		return this.usersService.all()
	}

	@Auth('admin')
	@Put('addRole')
	async addRole(@Body() data: { id: string; role: Role }) {
		return this.usersService.addRole(data.id, data.role)
	}

	@Auth('admin')
	@Put('removeRole')
	async removeRole(@Body() data: { id: string; role: Role }) {
		return this.usersService.removeRole(data.id, data.role)
	}
}
