import Cookies from 'js-cookie'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAccessToken } from '../api/api.helper'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { user } = useAuth()
	const { logout, getProfile, checkAuth } = useActions()
	const location = useLocation()
	useEffect(() => {
		const accessToken = getAccessToken()

		if (accessToken) {
			checkAuth().then(() => {
				getProfile()
			})
		}
	}, [])
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) {
			logout()
		}
	}, [location.pathname])

	return <div className=''>{children}</div>
}

export default AuthProvider
