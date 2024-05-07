export class UserDto {
	email: string
	password: string
	name: string
	roles: Role[]
}

export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
