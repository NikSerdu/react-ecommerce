import { authInstance } from '../api/api.interceptor'
import { IOrder, IOrderCreate, IOrderFull } from '../types/order.interface'

export const OrderService = {
	async create(data: IOrderCreate) {
		const response = await authInstance<{ id: number }>({
			url: '/order',
			method: 'POST',
			data
		})
		return response.data
	},
	async getMyOrders() {
		const response = await authInstance<IOrder[]>({
			url: '/order/my-orders',
			method: 'GET'
		})
		return response.data
	},

	async getByOrderId(orderId: string) {
		const response = await authInstance<IOrderFull>({
			url: `/order/${orderId}`,
			method: 'GET'
		})
		return response.data
	}
}
