import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { OrderService } from '../../services/order.service'
import { OrderStatus } from '../../types/order.interface'
import Container from '../ui/container/Container'
const MyOrders: FC = () => {
	const { data: myOrders } = useQuery({
		queryKey: ['get my orders'],
		queryFn: () => OrderService.getMyOrders()
	})
	return (
		<Container>
			<table className={'table'}>
				<thead>
					<tr>
						<th>№ заказа</th>
						<th>Сумма</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{myOrders &&
						myOrders.map(item => {
							return (
								<tr key={item.id} className='w-full'>
									<td>
										<Link
											to={item.id}
											className='flex items-center gap-2 justify-center'
										>
											{item.id}
										</Link>
									</td>
									<td>₽ {item.totalPrice} </td>
									<td>{OrderStatus[item.status as typeof OrderStatus]}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</Container>
	)
}

export default MyOrders
