export interface IInitialStateCart {
	products:
		| {
				name: string
				productId: number
				count: number
				image: string
				maxCount: number
				price: number
		  }[]
}
