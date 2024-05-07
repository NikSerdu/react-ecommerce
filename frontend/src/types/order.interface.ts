export interface IOrderCreate {
	products: {
		productId: number
		count: number
		price: number
	}[]
	phone: string
	comment: string
	fullName: string
	totalPrice: number
	address: string
}

export interface IOrder {
	id: string
	status: OrderStatus
	userId: string
	phone: string
	comment: string
	address: string
	fullName: string
	totalPrice: number
}

export enum OrderStatus {
	PROCESSING = 'В обработке',
	READY = 'Готов к получению',
	RECEIVED = 'Получен',
	CANCELLED = 'Отменен'
}

export interface IOrderFull {
	id: string
	status: OrderStatus
	userId: string
	phone: string
	comment: string
	address: string
	fullName: string
	totalPrice: number
	products: {
		id: string
		count: number
		price: number
		product: {
			images: string[]
			name: string
		}
	}[]
}
