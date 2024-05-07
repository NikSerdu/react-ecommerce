import cn from 'clsx'
import { FC, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoCart, IoHeart } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Container from '../../ui/container/Container'
import User from '../../user/User'
const menuItems: { id: number; title: string; href: string }[] = [
	{
		id: 1,
		title: 'Главная',
		href: '/'
	},
	{
		id: 2,
		title: 'Контакты',
		href: '/contact'
	},
	{
		id: 3,
		title: 'О нас',
		href: '/about'
	}
]
const Header: FC = () => {
	const { user } = useAuth()
	const location = useLocation()
	const cart = useTypedSelector(state => state.cart.products)
	const [search, setSearch] = useState<string>('')
	const navigate = useNavigate()
	const handleSubmit = e => {
		e.preventDefault()
		navigate(`/catalog?searchTerm=${search}`)
	}
	return (
		<Container>
			<div className='flex  items-center min-[768px]:mt-4 text-primary mb-4 max-[1170px]:px-3 max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0 max-[768px]:right-0 z-10 max-[768px]:bg-white max-[768px]:py-4 max-[768px]:border-b max-[768px]:shadow'>
				<Link to={'/'} className='font-bold'>
					Exclusive
				</Link>
				<nav className='mx-auto max-[768px]:fixed max-[768px]:left-0 max-[768px]:right-0 max-[768px]:bottom-0  z-10 max-[768px]:bg-white max-[768px]:text-black max-[768px]:pb-2 max-[768px]:shadow-3xl'>
					<ul className='flex justify-center items-center gap-5 text-sm'>
						{menuItems.map(item => (
							<Link
								key={item.title}
								to={item.href}
								className={cn(
									'hover:cursor-pointer min-[768px]:hover:text-green-900 transition-all p-3 relative text-center'
								)}
							>
								<span
									className={cn('relative transition-all', {
										'before:absolute before:w-full before:h-0.5 before:-bottom-1 before:left-0 before:bg-primary ':
											location.pathname
												.toLowerCase()
												.split('/')
												.splice(1)
												.includes(item.href.slice(1).toLowerCase())
									})}
								>
									{item.title}
								</span>
							</Link>
						))}
					</ul>
				</nav>
				<div className='flex items-center relative justify-end max-[768px]:ml-auto'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							className='bg-secondary rounded-md outline-none pl-3 pr-8 py-1 text-xs'
							placeholder='Что вы ищите?'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<button className=''>
							<CiSearch className='absolute right-3 top-1/2 -translate-y-1/2' />
						</button>
					</form>
				</div>
				<div className='p-2 hover:cursor-pointer relative max-[400px]:px-1'>
					<Link to={'/cart'} className=''>
						<div className=''>
							<IoCart size={20} />
							{cart.length > 0 && (
								<div className='bg-secondary2 absolute right-0 top-0 rounded-full  w-4 h-4 text-white text-xs text-center'>
									{cart.length}
								</div>
							)}
						</div>
					</Link>
				</div>
				<div className='p-2 hover:cursor-pointer relative max-[400px]:px-1'>
					<Link to={'/favourites'} className=''>
						<div className=''>
							<IoHeart size={20} className='text-secondary2 ' />
						</div>
					</Link>
				</div>
				<div className=''>
					<User />
				</div>
			</div>
		</Container>
	)
}

export default Header
