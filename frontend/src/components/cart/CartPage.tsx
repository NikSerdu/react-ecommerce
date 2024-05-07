import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useCart } from '../../hooks/useCart'
import { OrderService } from '../../services/order.service'
import Button from '../ui/button/Button'
import Container from '../ui/container/Container'
import Input from '../ui/input/Input'
interface IFormInput {
	fullName: string
	address: string
	comment: string
	phone: string
}

import { useAuth } from '../../hooks/useAuth'
import styles from './Cart.module.css'
const CartPage: FC = () => {
	const { user } = useAuth()
	const { products } = useCart()
	const { deleteProduct, clearCart } = useActions()
	const navigate = useNavigate()
	const { mutateAsync: createOrder } = useMutation({
		mutationFn: ({
			address,
			comment,
			fullName,
			phone
		}: {
			address: string
			comment: string
			fullName: string
			phone: string
		}) =>
			OrderService.create({
				address,
				comment,
				fullName,
				phone,
				products: products.map(item => {
					return {
						productId: item.productId,
						count: item.count,
						price: item.price
					}
				}),
				totalPrice: products.reduce(
					(summ, item) => (summ += item.count * item.price),
					0
				)
			}),
		onSuccess() {
			clearCart()
			reset()
			navigate('/thanks')
		}
	})

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<IFormInput>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IFormInput> = data => {
		createOrder(data)
	}

	return (
		<Container>
			<div className='mt-5'>
				<h1 className='text-xl font-bold'>Корзина</h1>
				{!products.length && <p className='mt-5'>Здесь пока пусто :(</p>}
				{products.length > 0 && (
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Продукт</th>
								<th>Цена</th>
								<th>Кол-во</th>
								<th>Общая цена</th>
								<th className=''>Действия</th>
							</tr>
						</thead>
						<tbody>
							{products.map(item => {
								return (
									<tr key={item.productId}>
										<td>
											<Link to={`/product/${item.productId}`}>
												<div className='flex items-center gap-2 justify-center'>
													<img
														src={`${import.meta.env.VITE_SERVER_URL}${
															item.image
														}`}
														alt=''
														className='h-20 max-[560px]:hidden'
													/>
													{item.name}
												</div>
											</Link>
										</td>
										<td>{item.price}</td>
										<td>{item.count}</td>
										<td>₽ {item.count * item.price}</td>
										<td className='max-[560px]:-px-20'>
											<MdDelete
												className='hover:cursor-pointer p-2  text-center inline'
												onClick={() => deleteProduct(item.productId)}
												color='red'
												size={35}
												title='Удалить'
											/>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
				<div className='mt-5 pb-20'>
					<h1 className='font-bold'>Оформить заказ</h1>
					<form className='  mt-5' onSubmit={handleSubmit(onSubmit)}>
						<div className='flex flex-wrap  gap-5'>
							<div className='w-[23%] max-[790px]:w-[30%] max-[500px]:w-full'>
								<Controller
									name='fullName'
									control={control}
									rules={{
										required: true,
										pattern:
											/(^[А-я]{3,16})([ ]{0,1})([А-я]{3,16})([ ]{0,1})([А-я]{3,16})?([ ]{0,1})?([А-я]{3,16})/
									}}
									render={({ field }) => (
										<Input placeholder='ФИО' {...field} className='w-full' />
									)}
								/>

								{errors.fullName && (
									<p className='text-secondary2 text-xs mt-3'>
										Некорректно заполненое поле!
									</p>
								)}
							</div>
							<div className='w-[23%] max-[790px]:w-[30%] max-[500px]:w-full'>
								<Controller
									name='phone'
									control={control}
									rules={{
										required: true,
										pattern:
											/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm
									}}
									render={({ field }) => (
										<Input
											placeholder='Номер телефона'
											{...field}
											className='w-full'
										/>
									)}
								/>
								{errors.phone && (
									<p className='text-secondary2 text-xs mt-3'>
										Некорректный номер телефона!
									</p>
								)}
							</div>

							<div className='w-[23%] max-[790px]:w-[30%] max-[500px]:w-full'>
								<Controller
									name='address'
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											placeholder='Адрес доставки'
											{...field}
											className='w-full'
										/>
									)}
								/>
								{errors.address && (
									<p className='text-secondary2 text-xs mt-3'>
										Поле обязательно для заполнения!
									</p>
								)}
							</div>

							<div className='w-[23%] max-[790px]:w-[30%] max-[500px]:w-full'>
								<Controller
									name='comment'
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											placeholder='Комментарий'
											{...field}
											className='w-full'
										/>
									)}
								/>
								{errors.comment && (
									<p className='text-secondary2 text-xs mt-3'>
										Поле обязательно для заполнения!
									</p>
								)}
							</div>
						</div>
						<div className='mt-10 gap-5'>
							<p className='mb-2'>
								Общая сумма: ₽{' '}
								{products.reduce(
									(summ, item) => (summ += item.count * item.price),
									0
								)}
							</p>
							{user && (
								<Button
									text='Оформить заказ'
									className={cn('bg-secondary2 border-secondary2', {
										'cursor-not-allowed': products.length <= 0
									})}
									disabled={products.length <= 0}
								/>
							)}
							{!user && (
								<p>
									Для оформления заказа{' '}
									<Link to={'/auth'} className='text-blue-500'>
										авторизуйтесь
									</Link>
									!
								</p>
							)}
						</div>
					</form>
				</div>
			</div>
		</Container>
	)
}

export default CartPage
