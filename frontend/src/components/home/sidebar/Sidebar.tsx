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
				'max-[768px]:flex max-[768px]:gap-3 max-[768px]:w-full max-[768px]:justify-center max-[768px]:text-center max-[768px]:px-5 max-[768px]:items-center flex-wrap'
			)}
		>
			{!isLoading &&
				categories &&
				categories.map(item => {
					return (
						<li
							className='hover:cursor-pointer mt-1  max-[768px]:p-3 max-[768px]:border max-[768px]:rounded-md'
							key={item.id}
						>
							<Link
								to={`products/${item.name}/${item.id}`}
								className='p-1 max-[768px]:w-full'
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
