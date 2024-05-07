import {
	authInstance,
	instance,
	instanceUploadFiles
} from '../api/api.interceptor'
import { IProduct, IProductsWithFilters } from '../types/product.interface'

export const ProductService = {
	async getWithFilters(data: IProductsWithFilters) {
		const response = await instance<{ products: IProduct[]; length: number }>({
			url: '/product',
			params: {
				...data,
				perPage: 20
			}
		})
		return response.data
	},

	async create(data: FormData) {
		const response = await instanceUploadFiles<{ id: number }>({
			url: '/product',
			method: 'POST',
			data,
			params: {
				folder: `products/product_${JSON.parse(data.get('data')).id}`
			}
		})
		return response.data
	},

	async update(data: { form: FormData; productId: number }) {
		const response = await instanceUploadFiles<IProduct>({
			url: `/product/${data.productId}`,
			method: 'PUT',
			data: data.form,
			params: {
				folder: `products/product_${data.productId}`
			}
		})
		console.log(response.data)

		return response.data
	},

	async getById(id: number) {
		const response = await instance<IProduct>({
			url: `/product/by-id`,
			method: 'GET',
			params: {
				id
			}
		})
		return response.data
	},

	async getRecentlyCreated() {
		const response = await instance<IProduct[]>({
			url: `/product/recently-created`,
			method: 'GET'
		})
		return response.data
	},

	async getRecentlySales() {
		const response = await instance<IProduct[]>({
			url: `/product/recently-sales`,
			method: 'GET'
		})
		return response.data
	},

	async delete(productId: number) {
		const response = await authInstance<IProduct>({
			url: `/product/${productId}`,
			method: 'DELETE'
		})
		return response.data
	}
}
