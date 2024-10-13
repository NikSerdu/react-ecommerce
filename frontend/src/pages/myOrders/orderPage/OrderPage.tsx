import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import QRCode from 'react-qr-code'
import { useParams } from 'react-router-dom'
import { OrderService } from '../../../services/order.service'
import { OrderStatus } from '../../../types/order.interface'
import ToBack from '../../toBack/ToBack'
import Container from '../../ui/container/Container'
const OrderPage: FC = () => {
	const { orderId } = useParams()
	if (!orderId) return
	const { data: order } = useQuery({
		queryKey: ['get order by id'],
		queryFn: () => OrderService.getByOrderId(orderId)
	})
	return (
		<Container>
			<div className='mt-5 relative'>
				<ToBack className='absolute -left-10 top-1' />
				<h1 className='text-xl font-bold'>Заказ № {orderId}</h1>
				<table className={'table'}>
					<thead>
						<tr>
							<th>Продукт</th>
							<th>Цена</th>
							<th>Кол-во</th>
							<th>Общая цена</th>
						</tr>
					</thead>
					<tbody className=''>
						{order &&
							order.products.map(item => {
								return (
									<tr key={item.id}>
										<td>
											<div className='flex items-center gap-2 justify-center'>
												<img
													src={`${item.product.images[0]}`}
													alt=''
													className='h-20 max-[560px]:hidden'
												/>
												{item.product.name}
											</div>
										</td>
										<td>₽ {item.price}</td>
										<td>{item.count}</td>
										<td>₽ {item.count * item.price}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
			{order && (
				<div className='w-1/2'>
					<p>
						<b>Получатель:</b> {order.fullName}
					</p>
					<p>
						<b>Телефон получателя:</b> {order.phone}
					</p>
					<p>
						<b>Общая сумма:</b> ₽ {order.totalPrice}
					</p>
					<p>
						<b>Адрес доставки:</b> {order.address}
					</p>
					<p>
						<b>Статус:</b> {OrderStatus[order.status]}
					</p>
					<p>
						<b>Комментарий:</b> {order.comment}
					</p>
					<p>
						<b>Код для получения заказа:</b>
						<QRCode
							size={256}
							className='h-[40%] w-[40%] max-[550px]:h-[70%] max-[550px]:w-[70%] mt-5 '
							value={order.id}
							viewBox={`0 0 256 256`}
						/>
					</p>
				</div>
			)}
		</Container>
	)
}

export default OrderPage
