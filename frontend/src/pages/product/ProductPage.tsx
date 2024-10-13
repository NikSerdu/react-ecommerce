import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { IoCart, IoHeart, IoHeartOutline } from 'react-icons/io5'
import ReactImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { useParams } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useFavourites } from '../../hooks/useFavourites'
import { useReviews } from '../../hooks/useReviews'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ProductService } from '../../services/product.service'
import Reviews from '../reviews/Reviews'
import ToBack from '../toBack/ToBack'
import Button from '../ui/button/Button'
import Container from '../ui/container/Container'
const ProductPage: FC = () => {
	const { productId } = useParams()
	if (!productId) return
	const { averageRating } = useReviews(+productId)
	const { data: product, isLoading } = useQuery({
		queryKey: ['get product by id'],
		queryFn: () => ProductService.getById(+productId)
	})
	const [show, setShow] = useState(false)
	const [count, setCount] = useState<number>(1)

	const increaseCount = () => {
		if (product && count < product.count) {
			setCount(count => count + 1)
		}
	}

	const decreaseCount = () => {
		if (count > 1) {
			setCount(count => count - 1)
		}
	}

	const { addProduct, deleteProduct } = useActions()
	const cart = useTypedSelector(state => state.cart.products)

	const { addFavourite, deleteFavourite, favourites } = useFavourites()
	return (
		<Container>
			<div className='mt-5'>
				<ToBack />
			</div>
			{!isLoading && product && (
				<>
					<div className='flex max-[650px]:flex-col mt-10'>
						<div className='w-3/5 max-[1125px]:w-1/2  max-[650px]:w-full'>
							<ReactImageGallery
								items={product.images.map(item => {
									return {
										original: `${item}`,
										thumbnail: `${item}`
									}
								})}
								showPlayButton={false}
							/>
						</div>
						<div className='flex flex-col gap-3 w-2/5 max-[650px]:w-full'>
							<h1 className='font-bold text-lg'>{product.name}</h1>
							<p>Цена: ₽ {product.salePrice}</p>
							<p>Артикул: {product.id}</p>
							<p>
								Рейтинг:{' '}
								{averageRating && averageRating.rating
									? String(averageRating.rating)
									: 0}
							</p>

							<div className='flex gap-5 h-10 flex-wrap items-center ju'>
								<div className='flex items-center  rounded-md  justify-center text-2xl h-full'>
									<div
										onClick={decreaseCount}
										className='flex items-center h-full border rounded-tl-md rounded-bl-md px-3 border-primary hover:bg-secondary2 transition-all hover:text-secondary hover:border-secondary2 hover:cursor-pointer'
									>
										-
									</div>
									<div className='flex items-center h-full border-t border-b border-primary w-14 justify-center'>
										{count}
									</div>
									<div
										onClick={increaseCount}
										className='flex items-center h-full border rounded-tr-md rounded-br-md px-3 border-primary hover:bg-secondary2 transition-all hover:text-secondary hover:border-secondary2 hover:cursor-pointer'
									>
										+
									</div>
								</div>
								<div className=''>
									{cart.some(item => item.productId === +productId) ? (
										<Button
											text='Уже в корзине'
											icon={<IoCart size={20} />}
											className='h-full bg-secondary2 border-secondary2 '
											onClick={() => {
												deleteProduct(+productId)
											}}
										/>
									) : (
										<Button
											text='В корзину'
											icon={<IoCart size={20} />}
											className='h-full bg-secondary2 border-secondary2 '
											onClick={() => {
												addProduct({
													productId: product.id,
													count,
													maxCount: product.count,
													image: product.images[0],
													price: product.salePrice,
													name: product.name
												})
											}}
										/>
									)}
								</div>
								<div className=''>
									<Button
										text=''
										icon={
											favourites.some(item => item.id === +productId) ? (
												<IoHeart size={20} className='text-secondary2 ' />
											) : (
												<IoHeartOutline
													size={20}
													className='text-secondary2 '
												/>
											)
										}
										variant='outline'
										className='h-full border-secondary2 '
										onClick={() => {
											favourites.some(item => item.id === +productId)
												? deleteFavourite(+productId)
												: addFavourite({
														id: product.id,
														images: product.images,
														price: product.salePrice,
														name: product.name,
														sale: product.sale,
														salePrice: product.salePrice
												  })
										}}
									/>
								</div>
							</div>
							<div className=''></div>
						</div>
					</div>

					<div className='w-1/2 mt-20'>
						<p className='font-bold'>Описание</p>
						{product.description.length > 300 && !show
							? `${product.description.slice(0, 250)}...`
							: product.description}
						{product.description.length > 300 ? (
							<span
								className='text-gray-500 hover:cursor-pointer'
								onClick={() => setShow(!show)}
							>
								{show ? 'Скрыть' : 'Показать полностью'}
							</span>
						) : null}
					</div>
				</>
			)}
			<div className='mt-20'>
				<h2 className='font-bold text-lg mb-10'>Отзывы</h2>
				<Reviews productId={+productId} />
			</div>
		</Container>
	)
}

export default ProductPage
