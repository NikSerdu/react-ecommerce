import { Controller } from '@nestjs/common'
import {
	Body,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes
} from '@nestjs/common/decorators'

import { ValidationPipe } from '@nestjs/common/pipes'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register-admin')
	async registerAdmin(@Body() dto: AuthDto) {
		return this.authService.registerAdmin(dto)
	}

	@Auth('admin')
	@HttpCode(200)
	@Get('admins')
	async getAdmins() {
		return this.authService.getAdmins()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: Omit<AuthDto, 'name'>) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.authService.deleteUser(id)
	}
}
