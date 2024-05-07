import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NotFoundPage from '../notFound/NotFoundPage'

const AdminRoute: FC = () => {
	const { user } = useAuth()
	return (
		<div>
			{user && user.roles.includes('ADMIN') ? <Outlet /> : <NotFoundPage />}
		</div>
	)
}

export default AdminRoute
