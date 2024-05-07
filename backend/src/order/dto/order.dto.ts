import { IsNumber, IsOptional, IsString } from 'class-validator'

export class OrderDTOCreate {
	products: ProductCounter[]
	@IsString()
	phone: string
	@IsString()
	comment: string
	@IsString()
	address: string
	@IsString()
	fullName: string
	@IsNumber()
	totalPrice: number
}

export class OrderDTOUpdate {
	products: ProductCounter[]
	@IsOptional()
	status: OrderStatus
	@IsOptional()
	@IsString()
	phone: string
	@IsOptional()
	@IsString()
	comment: string
	@IsOptional()
	@IsString()
	address: string
	@IsOptional()
	@IsString()
	fullName: string
	@IsOptional()
	@IsNumber()
	totalPrice: number
}

export enum OrderStatus {
	PROCESSING = 'PROCESSING',
	READY = 'READY',
	RECEIVED = 'RECEIVED',
	CANCELLED = 'CANCELLED'
}

interface ProductCounter {
	productId: number
	count: number
	price: number
}
