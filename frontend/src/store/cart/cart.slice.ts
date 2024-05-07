import { createSlice } from '@reduxjs/toolkit'
import { IInitialStateCart } from './cart.interface'

const initialState: IInitialStateCart = {
	products: JSON.parse(localStorage.getItem('cart') as string) || []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, { payload }) {
			const product = state.products.filter(
				item => item.productId === payload.productId
			)
			if (product.length === 1) {
				if (product[0].count !== payload.count) {
					state.products = state.products.filter(
						item => item.productId !== payload.productId
					)
					state.products.push(payload)
				}
			} else {
				state.products.push(payload)
			}
			localStorage.setItem('cart', JSON.stringify(state.products))
		},
		deleteProduct(state, { payload }) {
			state.products = state.products.filter(item => item.productId !== payload)
			localStorage.setItem('cart', JSON.stringify(state.products))
		},
		clearCart(state) {
			state.products = []
			localStorage.setItem('cart', JSON.stringify([]))
		},
		changeCount(state, { payload }) {
			const productIndex = state.products.findIndex(
				item => item.productId === payload.productId
			)
			if (productIndex !== -1) {
				state.products[productIndex].count = payload.count
			}
			localStorage.setItem('cart', JSON.stringify(state.products))
		}
	}
})
