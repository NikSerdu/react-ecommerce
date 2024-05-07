import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AuthService } from '../../services/auth.service'
import { ILogin, IRegister, IUser } from '../../types/auth.interface'
import { ITokensResponse } from '../../types/response.interface'

export const register = createAsyncThunk<IUser, IRegister>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.register(data)

			return response.user
		} catch (error) {
			if (error.response?.status === 409) {
				toast('Пользователь с таким email уже существует!', {
					type: 'error'
				})
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IUser, ILogin>(
	'auth/login',
	//@ts-ignore
	async (data, thunkApi) => {
		try {
			const response = await AuthService.login(data)
			return response.user
		} catch (error) {
			if (error.response?.status === 401) {
				toast('Неверный логин или пароль!', {
					type: 'error'
				})
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<ITokensResponse>(
	'auth/access-token',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			//@ts-ignore
			return response.data
		} catch (error) {
			console.log(error)
			thunkApi.dispatch(logout())
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const getProfile = createAsyncThunk<IUser>(
	'auth/get-profile',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getProfile()

			//@ts-ignore
			return response.data
		} catch (error) {
			console.log(error)
			thunkApi.dispatch(logout())
			return thunkApi.rejectWithValue(error)
		}
	}
)
