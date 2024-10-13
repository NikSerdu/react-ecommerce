import { Tab, Tabs } from '@nextui-org/tabs'
import { FC, ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Container from '../ui/container/Container'
import Admins from './admins/Admins'
import Categories from './categories/Categories'
import Orders from './orders/Orders'
import Products from './products/Products'

const Dashboard: FC = () => {
	const { user } = useAuth()

	const tabs:
		| {
				id: number
				title: string
				content: ReactNode
		  }[] = [
		{
			id: 1,
			title: 'Продукты',
			content: <Products />
		},
		{
			id: 2,
			title: 'Категории',
			content: <Categories />
		},
		{
			id: 3,
			title: 'Заказы',
			content: <Orders />
		}
	]

	if (user && user.roles.includes('ADMIN')) {
		tabs.push({
			id: 4,
			title: 'Аккаунты',
			content: <Admins />
		})
	}

	return (
		<Container>
			<div className='mt-5'>
				<Tabs variant='solid' color='primary' fullWidth={true}>
					{tabs.map(tab => (
						<Tab title={tab.title} key={tab.id}>
							<div className='mt-5'>{tab.content}</div>
						</Tab>
					))}
				</Tabs>
			</div>
		</Container>
	)
}

export default Dashboard
