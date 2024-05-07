import { FC } from 'react'
import { FaTelegram, FaVk, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import Container from '../../ui/container/Container'
const Footer: FC = () => {
	const { logout } = useActions()
	return (
		<div className=' bg-black text-white  text-sm py-8'>
			<Container className='max-[1077px]:justify-center flex flex-wrap gap-20 justify-between px-5 max-[768px]:pb-[44px] max-[768px]:flex-col max-[768px]:text-center'>
				<Link to={'/'} className='font-bold text-lg my-auto'>
					Exclusive
				</Link>
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-base'>Поддержка</p>
					<p>г.Москва, ул.Пушкина, 15</p>
					<a href='mailto:support@exlusive.com'>support@exlusive.com</a>
					<a href='tel:+79781231212'>+7(978)-123-12-12</a>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-base'>Аккаунт</p>
					<Link to={'/my-orders'}>Мои заказы</Link>
					<Link to={'/'} onClick={logout}>
						Выйти
					</Link>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-base'>Быстрые ссылки</p>
					<Link to={'/rivacy-policy'}>Политики конфиденциальности</Link>
					<Link to={'/terms-of-use'}>Условия использования</Link>
					<Link to={'/faq'}>FAQ</Link>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-base'>Мы в соц.сетях</p>
					<div className='flex gap-2 justify-between'>
						<Link to={'/'}>
							<FaTelegram size={30} />
						</Link>
						<Link to={'/'}>
							<FaVk size={30} />
						</Link>
						<Link to={'/'}>
							<FaYoutube size={30} />
						</Link>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Footer
