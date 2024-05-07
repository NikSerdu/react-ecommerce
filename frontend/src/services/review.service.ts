import { authInstance, instance } from '../api/api.interceptor'
import { IReview, IReviewCreate } from '../types/review.interface'

export const ReviewService = {
	async getByProductId(productId: number) {
		const response = await instance<IReview[]>({
			url: `/reviews/${productId}`,
			method: 'GET'
		})
		return response.data
	},

	async create(productId: number, data: IReviewCreate) {
		const response = await authInstance<IReview>({
			url: `/reviews/leave/${productId}`,
			method: 'POST',
			data
		})
		return response.data
	},

	async getAverageValueByProductId(productId: number) {
		const response = await instance<IReview[]>({
			url: `/reviews/average/${productId}`,
			method: 'GET'
		})
		return response.data
	}
}
