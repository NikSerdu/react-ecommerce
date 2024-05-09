import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CategoryService } from '../../../services/category.service'

type TypeData = {
	className?: string
}

const Sidebar: FC<TypeData> = ({ className = '' }) => {
	const { data: categories, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll()
	})
	return (
		<ul
			className={cn(
				'text-sm',
				className,
				'max-[906px]:flex max-[906px]:gap-3 max-[906px]:w-full max-[906px]:justify-center max-[906px]:text-center max-[906px]:px-5 max-[906px]:items-center flex-wrap'
			)}
		>
			{!isLoading &&
				categories &&
				categories.map(item => {
					return (
						<li
							className='hover:cursor-pointer mt-1  max-[906px]:p-3 max-[906px]:border max-[906px]:rounded-md'
							key={item.id}
						>
							<Link
								to={`products/${item.name}/${item.id}`}
								className='p-1 max-[906px]:w-full'
							>
								{item.name}
							</Link>
						</li>
					)
				})}
		</ul>
	)
}

export default Sidebar
