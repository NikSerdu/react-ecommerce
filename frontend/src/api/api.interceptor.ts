import axios from 'axios'
import { AuthService } from '../services/auth.service'
import { getAccessToken } from './api.helper'

export const instance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const instanceUploadFiles = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})

export const authInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
})

authInstance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instanceUploadFiles.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

authInstance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			try {
				await AuthService.getNewTokens()
				return authInstance.request(originalRequest)
			} catch (e) {
				console.log(e)
			}
		}
		throw error
	}
)
