import { FC, useRef } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IProduct } from '../../../types/product.interface'

import Slider from 'react-slick'
import ProductItem from '../../productList/productItem/ProductItem'
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
								<ProductItem
									key={item.id}
									product={item}
									inCart={cart.some(cartItem => cartItem.productId === item.id)}
									addToCart={addProduct}
									deleteFromCart={deleteProduct}
								/>
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
