import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, getProfile, login, logout, register } from './user.actions'
import { IInitialStateUser } from './user.interface'

const initialState: IInitialStateUser = {
	user: null,
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getProfile.pending, state => {
				state.isLoading = true
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.user = payload
				state.isLoading = false
			})
			.addCase(getProfile.rejected, state => {
				state.user = null
				state.isLoading = false
			})
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.user = payload
				state.isLoading = false
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.rejected, state => {
				state.isLoading = false
				state.user = null
			})
	}
})
