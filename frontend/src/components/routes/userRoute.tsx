import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const UserRoute: FC = () => {
	const { user } = useAuth()
	return <div>{user ? <Outlet /> : 'Авторизуйтесь!'}</div>
}

export default UserRoute
