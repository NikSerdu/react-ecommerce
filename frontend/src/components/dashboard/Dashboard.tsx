import { FC, ReactNode } from 'react'
import Container from '../ui/container/Container'
import Tabs from '../ui/tabs/Tabs'
import Admins from './admins/Admins'
import Categories from './categories/Categories'
import Orders from './orders/Orders'
import Products from './products/Products'

const items: {
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
	},
	{
		id: 4,
		title: 'Аккаунты',
		content: <Admins />
	}
]

const Dashboard: FC = () => {
	return (
		<Container>
			<div className='mt-5'>
				<Tabs
					items={items}
					orientation='vertical'
					className='text-sm'
					showButtons={false}
				/>
			</div>
		</Container>
	)
}

export default Dashboard
