import cn from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { useClickOutside } from '../../hooks/useClickOutside'

const User: FC = () => {
	const navigate = useNavigate()
	const { user, isLoading } = useAuth()
	const { logout } = useActions()
	const [open, setOpen] = useState<boolean>(false)
	const menuRef = useRef()
	useClickOutside(menuRef, () => {
		if (open) setTimeout(() => setOpen(false), 50)
	})
	return (
		<div className='relative w-auto hover:cursor-pointer z-10'>
			<div
				ref={menuRef}
				className={cn(
					'px-2 py-2 rounded-tr-xl rounded-tl-xl  flex justify-center text-xl'
				)}
				onClick={() => {
					if (!user) {
						navigate('/auth')
					} else {
						setOpen(prev => !prev)
					}
				}}
			>
				<FaUserCircle />
			</div>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cn(
							' text-sm rounded-xl bg-secondary flex flex-col items-center absolute top-9  -left-10 text-center max-[1250px]:-left-20',
							{
								'w-28': open
							}
						)}
					>
						<Link
							to={'orders'}
							className='hover:bg-slate-100 px-2 py-2 hover:rounded-tr-xl hover:rounded-tl-xl'
						>
							Мои заказы
						</Link>
						{!isLoading &&
							user &&
							(user.roles.includes('ADMIN') ||
								user.roles.includes('MANAGER')) && (
								<Link
									to={'dashboard'}
									className='hover:bg-slate-100 hover:rounded-tr-xl hover:rounded-tl-xl p-2'
								>
									Админ панель
								</Link>
							)}
						<Link to={'settings'} className='hover:bg-slate-100 px-2 py-2'>
							Настройки
						</Link>

						<Link
							to={'/'}
							className='hover:bg-slate-100 px-2 py-2 hover:rounded-br-xl hover:rounded-bl-xl'
							onClick={logout}
						>
							Выйти
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default User
