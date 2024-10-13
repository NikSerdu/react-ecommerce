import { Scanner } from '@yudiel/react-qr-scanner'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'
const Orders: FC = () => {
	const [order_id, setOrderId] = useState<string>('')
	const navigate = useNavigate()
	const handleSubmit = e => {
		e.preventDefault()
		navigate(`/orders/${order_id}`)
	}
	return (
		<div>
			<h1 className='font-bold text-3xl'>Поиск заказа</h1>
			<form action='' className='flex gap-5 mt-5' onSubmit={handleSubmit}>
				<Input
					placeholder='Номер заказа'
					className='w-full'
					name='order_id'
					value={order_id}
					onChange={e => setOrderId(e.target.value)}
				/>
				<Button text='Найти' className='bg-secondary2 border-secondary2' />
			</form>
			<div className='w-[300px] mt-10 mx-auto'>
				<Scanner
					onResult={(text, result) => navigate(`/orders/${text}`)}
					onError={error => console.log(error?.message)}
				/>
			</div>
		</div>
	)
}

export default Orders
