import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { ProductService } from '../../../services/product.service'
import CreateProduct from './createProduct/CreateProduct'
import ProductList from './productList/ProductList'

const Products: FC = () => {
	const [page, setPage] = useState<number>(1)
	const { data: products, refetch } = useQuery({
		queryKey: ['get product dashboard'],
		queryFn: () => ProductService.getWithFilters({ page: String(page) })
	})

	const { mutateAsync: deleteProduct } = useMutation({
		mutationFn: (productId: number) => {
			return ProductService.delete(productId)
		},
		onSuccess() {
			refetch()
		}
	})

	useEffect(() => {
		refetch()
	}, [page])
	return (
		<div>
			<CreateProduct refetchProducts={refetch} />
			<div className='mt-5'>
				{products && (
					<ProductList
						deleteProduct={deleteProduct}
						products={products.products}
					/>
				)}
			</div>
			{products && products.length > 20 && (
				<div className='py-10'>
					<ResponsivePagination
						current={page}
						total={Math.floor(products.length / 20) + 1}
						onPageChange={setPage}
						pageLinkClassName='page-link'
					/>
				</div>
			)}
		</div>
	)
}

export default Products
