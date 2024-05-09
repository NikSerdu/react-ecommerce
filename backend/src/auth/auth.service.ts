import {
	HttpException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async login(dto: Omit<AuthDto, 'name'>) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')
		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})
		const tokens = await this.issueToken(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) {
			throw new HttpException('User already exists', 409)
		}

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueToken(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async registerAdmin(dto: AuthDto, role: string) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) {
			throw new HttpException('User already exists', 409)
		}

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: await hash(dto.password),
				roles:
					role === 'ADMIN' ? ['ADMIN', 'MANAGER', 'USER'] : ['MANAGER', 'USER']
			}
		})

		const tokens = await this.issueToken(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueToken(userId: string) {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			roles: user.roles
		}
	}

	private async validateUser(dto: Omit<AuthDto, 'name'>) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid login or password')
		return user
	}

	async deleteUser(id: string) {
		return await this.prisma.user.delete({
			where: {
				id
			}
		})
	}

	async getAdmins() {
		return await this.prisma.user.findMany({
			where: {
				OR: [
					{
						roles: {
							has: 'ADMIN'
						}
					},
					{
						roles: {
							has: 'MANAGER'
						}
					}
				]
			},
			select: {
				id: true,
				name: true,
				email: true,
				roles: true
			}
		})
	}
}
