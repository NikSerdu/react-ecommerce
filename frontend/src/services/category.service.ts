import { authInstance, instance } from '../api/api.interceptor'
import { ICategory } from '../types/category.interface'

export const CategoryService = {
	async getAll() {
		const response = await instance<ICategory[]>({
			url: `/category`,
			method: 'GET'
		})
		return response.data
	},

	async create(data: { name: string }) {
		const response = await authInstance<ICategory>({
			url: `/category`,
			method: 'POST',
			data
		})
		return response.data
	},

	async delete(categoryId: string) {
		const response = await authInstance<ICategory>({
			url: `/category/${categoryId}`,
			method: 'DELETE'
		})
		return response.data
	}
}
