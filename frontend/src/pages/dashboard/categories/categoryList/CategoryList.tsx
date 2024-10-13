import { FC } from 'react'
import { MdDelete } from 'react-icons/md'
import { ICategory } from '../../../../types/category.interface'
type TypeData = {
	categories: ICategory[]
	deleteCategory: (id: string) => void
}
const CategoryList: FC<TypeData> = ({ categories, deleteCategory }) => {
	return (
		<div>
			<h2 className='font-bold text-xl mt-5'>Список категорий</h2>
			<div className='mt-5 flex flex-col gap-5'>
				{categories &&
					categories.map(item => {
						return (
							<div
								className='p-4 flex items-center justify-between gap-5 border border-primary rounded-md'
								key={item.id}
							>
								<div className=''>{item.name}</div>
								<div
									className='hover:cursor-pointer p-2'
									onClick={() => {
										const ok = confirm(
											'При удалении категории, все товары в ней также будут удалены. Вы согласны?'
										)
										if (ok) {
											deleteCategory(item.id)
										}
									}}
								>
									<MdDelete className='text-secondary2' />
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default CategoryList
