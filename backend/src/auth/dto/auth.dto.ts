import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string

	@IsString()
	name: string

	@IsOptional()
	roles: Role[]
}

export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
