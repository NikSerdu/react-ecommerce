import { FC } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IProduct } from '../../types/product.interface'
import ProductItem from './productItem/ProductItem'

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
							<ProductItem
								key={item.id}
								product={item}
								inCart={cart.some(cartItem => cartItem.productId === item.id)}
								addToCart={addProduct}
								deleteFromCart={deleteProduct}
							/>
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
