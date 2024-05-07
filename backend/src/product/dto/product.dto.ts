import {
	ArrayMinSize,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class ProductDTOCreate {
	@IsNumber()
	id: number
	@IsString()
	name: string
	@IsNumber()
	price: number
	@IsString()
	categoryId: string
	@IsString()
	description: string
	@IsNumber()
	count: number
	@IsOptional()
	@IsNumber()
	salePrice: number
	@IsOptional()
	@IsBoolean()
	sale: boolean
}

export class ProductDTOUpdate {
	@IsOptional()
	@IsNumber()
	id: number
	@IsString()
	name: string
	@IsOptional()
	@IsString()
	description: string
	@IsString()
	categoryId: string
	@IsOptional()
	@IsString({ each: true })
	@ArrayMinSize(1)
	@IsOptional()
	images: string[]
	@IsNumber()
	@IsOptional()
	price: number
	@IsNumber()
	@IsOptional()
	salePrice: number
	@IsBoolean()
	@IsOptional()
	sale: boolean
	@IsOptional()
	@IsNumber()
	count: number
}

export class ProductsWithFilters {
	categoryId: string
	orderBy: 'asc' | 'desc'
	minPrice: string
	maxPrice: string
	perPage: string
	onlySale: string
	page: string
	searchTerm: string
}
