import Cookies from 'js-cookie'
import { getRefreshToken } from '../api/api.helper'
import { authInstance, instance } from '../api/api.interceptor'
import { ILogin, IRegister, IUser } from '../types/auth.interface'
import { IAuthResponse, ITokensResponse } from '../types/response.interface'

export const AuthService = {
	async register(data: IRegister) {
		const response = await instance<IAuthResponse>({
			url: `/auth/register`,
			method: 'POST',
			data
		})
		if (response.data.user.id) {
			Cookies.set('accessToken', response.data.accessToken)
			Cookies.set('refreshToken', response.data.refreshToken)
		}
		return response.data
	},
	async login(data: ILogin) {
		const response = await instance<IAuthResponse>({
			url: `/auth/login`,
			method: 'POST',
			data
		})
		if (response.data.user.id) {
			Cookies.set('accessToken', response.data.accessToken)
			Cookies.set('refreshToken', response.data.refreshToken)
		}
		const { accessToken, refreshToken, ...rest } = response.data
		return rest
	},
	async logout() {
		Cookies.remove('accessToken')
		Cookies.remove('refreshToken')
	},

	async getNewTokens() {
		const refreshToken = getRefreshToken()

		const data = {
			refreshToken: refreshToken
		}
		const response = await instance<ITokensResponse>({
			url: `/auth/login/access-token`,
			method: 'POST',
			data
		})
		if (response.data.accessToken && response.data.refreshToken) {
			Cookies.set('accessToken', response.data.accessToken)
			Cookies.set('refreshToken', response.data.refreshToken)
			return response
		}
	},

	async getProfile() {
		const response = await authInstance<IUser>({
			url: `/users/profile`,
			method: 'GET'
		})
		if (response.data.id) return response
	},
	async registerAdmin(data: IRegister) {
		const response = await authInstance<IUser>({
			url: '/auth/register-admin',
			method: 'POST',
			data
		})
		return response.data
	},
	async getAdmins() {
		const response = await authInstance<IUser[]>({
			url: '/auth/admins',
			method: 'GET'
		})
		return response.data
	},

	async deleteAdmin(id: string) {
		const response = await authInstance<IUser>({
			url: `/auth/${id}`,
			method: 'DELETE'
		})
		return response.data
	}
}
