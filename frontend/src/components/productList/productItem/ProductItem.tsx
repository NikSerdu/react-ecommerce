import { FC } from 'react'
import { IoCart, IoHeart } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { IProduct } from '../../../types/product.interface'
import Button from '../../ui/button/Button'

type TypeData = {
	product: IProduct
	inCart: boolean
	addToCart: (data: any) => void
	deleteFromCart: (id: number) => void
	showFavouriteButton?: boolean
	deleteFromFavourite?: (id: number) => void
}

const ProductItem: FC<TypeData> = ({
	product,
	inCart,
	addToCart,
	deleteFromCart,
	showFavouriteButton = false,
	deleteFromFavourite = () => {}
}) => {
	const { count, id, images, name, price, sale, salePrice } = product
	return (
		<div className='w-[200px] px-10' key={id} style={{ width: '203px' }}>
			<div className='w-[200px]  relative'>
				{showFavouriteButton && (
					<IoHeart
						className='text-secondary2  absolute left-0 top-0 z-10 hover:cursor-pointer'
						size={20}
						onClick={() => deleteFromFavourite(id)}
					/>
				)}
				<Link to={`/product/${id}`} className=''>
					{sale && (
						<span className='bg-secondary2 text-white rounded-md px-2 py-1 text-xs absolute right-0 top-0'>
							sale
						</span>
					)}
					<img
						src={`${images[0]}`}
						alt=''
						className='w-[200px] h-[200px] rounded-t-md'
					/>
				</Link>

				<div className='-mt-1'>
					{inCart ? (
						<Button
							text='Уже в корзине'
							icon={<IoCart size={20} />}
							className='h-full w-[200px] bg-primary border-primary'
							onClick={() => {
								deleteFromCart(id)
							}}
						/>
					) : (
						<Button
							text='В корзину'
							icon={<IoCart size={20} />}
							className='h-full w-[200px] bg-primary border-primary'
							onClick={() => {
								addToCart({
									productId: id,
									count: 1,
									maxCount: count,
									image: images[0],
									price: price,
									name: name
								})
							}}
						/>
					)}
				</div>
			</div>
			<div className='text-sm p-2'>
				<p className='font-medium mt-1'>{name}</p>
				<div className='text-secondary2 mt-1'>
					{sale ? (
						<div className='flex gap-2 items-center'>
							<span>₽ {salePrice}</span>
							<span className='line-through text-xs text-primary/50'>
								{price}
							</span>
						</div>
					) : (
						<span>₽ {price}</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductItem
