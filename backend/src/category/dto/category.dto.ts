import { IsOptional, IsString } from 'class-validator'

export class CategoryDTOCreate {
	@IsString()
	name: string
}

export class CategoryDTOUpdate {
	@IsOptional()
	@IsString()
	name: string
}
