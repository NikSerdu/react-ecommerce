export interface IProduct {
	id: number
	name: string
	images: string[]
	price: number
	description: string
	count: number
	sale: boolean
	salePrice: number
	bitrixId: number
	categoryId: string
	createdAt: string
	updatedAt: string
}

export interface IProductsWithFilters {
	categoryId?: string | null
	orderBy?: 'asc' | 'desc'
	minPrice?: string | null
	maxPrice?: string | null
	perPage?: string | null
	searchTerm?: string | null
	onlySale?: boolean | null
	page: string
}

export interface IProductCreate {
	id: number
	name: string
	price: number
	description: string
	categoryId: string
	sale?: boolean
	salePrice?: number
	count: number
}

export interface IProductUpdate {
	id?: number
	name: string
	description?: string
	categoryId: string
	images?: string[]
	price?: number
	salePrice?: number
	sale?: boolean
	count?: number
}
