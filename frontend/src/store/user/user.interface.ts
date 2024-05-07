import { IUser } from '../../types/auth.interface'

export interface IInitialStateUser {
	user: IUser | null
	isLoading: boolean
}
