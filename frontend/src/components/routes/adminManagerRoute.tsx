import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NotFoundPage from '../notFound/NotFoundPage'

const AdminManagerRoute: FC = () => {
	const { user } = useAuth()
	return (
		<div>
			{user &&
			(user.roles.includes('ADMIN') || user.roles.includes('MANAGER')) ? (
				<Outlet />
			) : (
				<NotFoundPage />
			)}
		</div>
	)
}

export default AdminManagerRoute
