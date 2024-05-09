import { FC } from 'react'
import { useActions } from '../../hooks/useActions'
import { useFavourites } from '../../hooks/useFavourites'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IProduct } from '../../types/product.interface'
import ProductItem from '../productList/productItem/ProductItem'
import Container from '../ui/container/Container'

const FavouritesPage: FC = () => {
	const { deleteFavourite, favourites } = useFavourites()
	const cart = useTypedSelector(state => state.cart.products)
	const { addProduct, deleteProduct } = useActions()
	return (
		<Container>
			<h1 className='font-bold text-lg my-10'>Избранное</h1>
			{!favourites.length && <>Здесь пока пусто :(</>}
			<div className='flex flex-wrap gap-4 justify-between max-[692px]:justify-center max-[692px]:gap-12 max-[507px]:mt-5'>
				{favourites.map(item => {
					return (
						<ProductItem
							key={item.id}
							product={item as IProduct}
							inCart={cart.some(cartItem => cartItem.productId === item.id)}
							addToCart={addProduct}
							deleteFromCart={deleteProduct}
							showFavouriteButton={true}
							deleteFromFavourite={deleteFavourite}
						/>
					)
				})}
			</div>
		</Container>
	)
}

export default FavouritesPage
