import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useSearchParams } from 'react-router-dom'
import { ProductService } from '../../services/product.service'
import Filters from '../filters/Filters'
import ProductList from '../productList/ProductList'
import Button from '../ui/button/Button'
import Container from '../ui/container/Container'
import Input from '../ui/input/Input'

const Catalog: FC = () => {
	const [filters, setFilters] = useSearchParams()

	const [searchTerm, setSearchTerm] = useState<string>(
		filters.get('searchTerm') || ''
	)
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')

	const { data, refetch, isLoading } = useQuery({
		queryKey: ['get products by category'],
		queryFn: () =>
			ProductService.getWithFilters({
				page: filters.get('page') || '1',
				minPrice: filters.get('minPrice'),
				maxPrice: filters.get('maxPrice'),
				onlySale: filters.get('onlySale') === 'true' ? true : false,
				searchTerm,
				orderBy: order
			})
	})

	useEffect(() => {
		const page = filters.get('page')
		if (!page) {
			filters.set('page', '1')
		}
	}, [])

	useEffect(() => {
		refetch()
	}, [filters, order])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		filters.set('searchTerm', searchTerm)
		refetch()
	}

	return (
		<Container className='max-[1200px]:px-5 '>
			<div className='mt-5 text-xl font-bold max-[769px]:mt-20'>Каталог</div>
			<div className='flex mt-10 max-[850px]:flex-col'>
				<div className='w-1/5 pr-1 max-[850px]:w-full max-[850px]:mb-5'>
					<Filters filters={filters} setFilters={setFilters} />
				</div>
				<div className='flex flex-col h-full w-4/5 ml-5 max-[850px]:w-full max-[850px]:pr-5'>
					<form className='flex gap-5' onSubmit={handleSubmit}>
						<Input
							placeholder='Артикул, название'
							className='w-full'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<Button
							text='Поиск'
							type='submit'
							icon={<CiSearch size={20} />}
							className='bg-secondary2 border-secondary2 h-[45px]'
						/>
					</form>
					<div className='text-sm mt-5'>
						<span>Сортировка: </span>
						<select
							className='border-b border-primary outline-none text-xs'
							onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
						>
							<option value={'asc'} className='' selected>
								Цена по возрастанию
							</option>
							<option value={'desc'} className=''>
								Цена по убыванию
							</option>
						</select>
					</div>
					<div className='mt-10'>
						{!isLoading && data?.products && (
							<ProductList products={data?.products} />
						)}
					</div>
					{data && data.length > 20 && (
						<div className='py-10'>
							<ResponsivePagination
								current={+(filters.get('page') || 1)}
								total={Math.floor(data.length / 20) + 1}
								onPageChange={number => {
									filters.set('page', number.toString())
									setFilters(filters)
								}}
								pageLinkClassName='page-link'
							/>
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}

export default Catalog
