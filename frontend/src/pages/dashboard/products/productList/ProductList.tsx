import { FC } from 'react'
import { MdDelete } from 'react-icons/md'
import 'react-responsive-pagination/themes/classic.css'
import { Link } from 'react-router-dom'
import { IProduct } from '../../../../types/product.interface'

type TypeData = {
	products: IProduct[]
	deleteProduct: (id: number) => void
}

const ProductList: FC<TypeData> = ({ products, deleteProduct }) => {
	return (
		<div className='mt-5'>
			<h1 className='text-xl font-bold'>Все товары</h1>
			<table className={'table'}>
				<thead>
					<tr>
						<th>Артикул</th>
						<th>Название</th>
						<th>Кол-во</th>
						<th>Цена</th>
						<th className=''>Действия</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map(item => {
							return (
								<tr key={item.id}>
									<td>
										<Link to={`product/update/${item.id}`}>{item.id}</Link>
									</td>
									<td>{item.name}</td>
									<td>{item.count}</td>
									<td>₽ {item.price}</td>
									<td>
										<MdDelete
											className='hover:cursor-pointer p-2 text-center inline'
											onClick={() => {
												const ok = confirm(
													'Вы действительно хотите удалить этот товар?'
												)
												if (ok) {
													deleteProduct(item.id)
												}
											}}
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
		</div>
	)
}

export default ProductList
