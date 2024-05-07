import { FC, useRef } from 'react'
import { IoCart } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IProduct } from '../../../types/product.interface'
import Button from '../../ui/button/Button'

import Slider from 'react-slick'
type TypeData = {
	title: string
	products: IProduct[]
}
const HomeSlider: FC<TypeData> = ({ products, title }) => {
	const slider = useRef(null)
	const { addProduct, deleteProduct } = useActions()
	const cart = useTypedSelector(state => state.cart.products)
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1290,
				settings: {
					slidesToShow: 4,
					arrows: false
				}
			},
			{
				breakpoint: 940,
				settings: {
					slidesToShow: 3,
					arrows: false
				}
			},
			{
				breakpoint: 730,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	}
	return (
		<div className='mt-20'>
			<div className='flex gap-3 items-center px-5'>
				<div className='w-6 h-12 bg-secondary2 rounded-md'></div>
				<h2 className='font-bold text-lg'>{title}</h2>
			</div>
			<div className='mt-10 relative'>
				<div
					onClick={() => slider?.current?.slickPrev()}
					className='max-[1290px]  absolute top-[30%]  border-t border-l border-primary -rotate-45 p-3 hover:cursor-pointer  h-3 w-3 -ml-10 z-20'
				></div>
				<Slider className='' {...settings} ref={slider}>
					{products &&
						products.slice(0, 10).map(item => {
							return (
								<div
									className='w-[200px] px-10'
									key={item.id}
									style={{ width: '203px' }}
								>
									<div className='w-[200px]  relative'>
										<Link to={`/product/${item.id}`} className=''>
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

										<div className='-mt-1'>
											{cart.some(cartItem => cartItem.productId === item.id) ? (
												<Button
													text='Уже в корзине'
													icon={<IoCart size={20} />}
													className='h-full w-[200px] bg-primary border-primary'
													onClick={() => {
														deleteProduct(item.id)
													}}
												/>
											) : (
												<Button
													text='В корзину'
													icon={<IoCart size={20} />}
													className='h-full w-[200px] bg-primary border-primary'
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
				</Slider>
				<div
					onClick={() => slider?.current?.slickNext()}
					className='max-[1290px]:hidden absolute top-[30%] right-0 border-t border-r border-primary rotate-45 p-3 hover:cursor-pointer  h-3 w-3 -mr-10 z-20'
				></div>
			</div>
		</div>
	)
}

export default HomeSlider
