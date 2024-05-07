import { FC } from 'react'
import { IoCart } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IProduct } from '../../types/product.interface'
import Button from '../ui/button/Button'

type TypeData = {
	products: IProduct[]
}

const ProductList: FC<TypeData> = ({ products }) => {
	const cart = useTypedSelector(state => state.cart.products)
	const { addProduct, deleteProduct } = useActions()
	return (
		<div>
			{products && (
				<div className='flex flex-wrap gap-4 justify-between max-[692px]:justify-center max-[692px]:gap-12 max-[507px]:mt-5'>
					{products.map(item => {
						return (
							<div className='w-[200px] max-[507px]:scale-125' key={item.id}>
								<div className=''>
									<Link to={`/product/${item.id}`} className='relative'>
										{item.sale && (
											<span className='bg-secondary2 text-white rounded-md px-2 py-1 text-xs absolute right-0 top-0'>
												sale
											</span>
										)}
										<img
											src={`${import.meta.env.VITE_SERVER_URL}${
												item.images[0]
											}`}
											alt=''
											className='w-[200px] h-[200px] rounded-t-md'
										/>
									</Link>

									<div className=''>
										{cart.some(cartItem => cartItem.productId === item.id) ? (
											<Button
												text='Уже в корзине'
												icon={<IoCart size={20} />}
												className='h-full w-full bg-primary border-primary'
												onClick={() => {
													deleteProduct(item.id)
												}}
											/>
										) : (
											<Button
												text='В корзину'
												icon={<IoCart size={20} />}
												className='h-full w-full bg-primary border-primary'
												onClick={() => {
													addProduct({
														productId: item.id,
														count: 1,
														maxCount: item.count,
														image: item.images[0],
														price: item.price,
														name: item.name
													})
												}}
											/>
										)}
									</div>
								</div>
								<div className='text-sm p-2'>
									<p className='font-medium mt-1'>{item.name}</p>
									<p className='text-secondary2 mt-1'>
										{item.sale ? (
											<div className='flex gap-2 items-center'>
												<span>₽ {item.salePrice}</span>
												<span className='line-through text-xs text-primary/50'>
													{item.price}
												</span>
											</div>
										) : (
											<span>₽ {item.price}</span>
										)}
									</p>
								</div>
							</div>
						)
					})}
					{products.length % 4 !== 0 &&
						Array(products.length % 4)
							.fill(0)
							.map((item, index) => (
								<div className='w-[200px]' key={index}></div>
							))}
				</div>
			)}
		</div>
	)
}

export default ProductList
