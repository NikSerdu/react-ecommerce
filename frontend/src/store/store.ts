import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { cartSlice } from './cart/cart.slice'
import { userSlice } from './user/user.slice'

const rootReducer = combineReducers({
	user: userSlice.reducer,
	cart: cartSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type TypeRootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
