export class CounterDTOCreate {
	products: ProductCounter[]
}

interface ProductCounter {
	productId: number
	count: number
	orderId: string
	price: number
}
