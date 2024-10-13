import { FC, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/button/Button'
import Input from '../ui/input/Input'

type TypeData = {
	variant?: 'login' | 'sign-up'
}

const Auth: FC<TypeData> = ({ variant = 'login' }) => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (user) {
			navigate(-1)
		}
	}, [user])
	const [type, setType] = useState<'login' | 'sign-up'>(variant)
	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const { register, login } = useActions()
	const handleRegister = () => {
		if (name.length < 2 || !validateName(name)) {
			toast('Имя должны содержать только буквы (не менее 2)!', {
				type: 'error'
			})
		}
		if (validateEmail(email)) {
			register({ email, name, password })
			setEmail('')
			setPassword('')
			setName('')
		} else {
			toast('Email некорректен!', { type: 'error' })
		}
	}
	const handleLogin = () => {
		if (validateEmail(email)) {
			login({ email, password })
			setPassword('')
			setEmail('')
		} else {
			toast('Email некорректен!', { type: 'error' })
		}
	}

	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	}
	const validateName = (name: string) => {
		return String(name)
			.toLowerCase()
			.match(/^[a-zA-Zа-яА-Я]+$/)
	}
	return (
		<>
			<div className='mt-10 flex min-[1000px]:gap-10 items-center'>
				<div className=''>
					<img
						src='images/auth.png'
						alt=''
						className='min-[1250px]:w-[80%] max-[1000px]:hidden'
					/>
				</div>
				{type === 'login' && (
					<div className='w-2/5 pr-5 max-[1000px]:w-[90vw] max-[1000px]:mx-auto'>
						<div className=''>
							<h1 className='font-bold text-xl'>Войти</h1>
							<p className='text-sm pt-2'>Введите Ваши данные ниже</p>
							<div className='flex flex-col gap-7 mt-10'>
								<Input
									placeholder='Email'
									type='email'
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
								<Input
									placeholder='Пароль'
									type='password'
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
							</div>
							<div className='mt-10'>
								<Button
									text='Войти'
									className='w-full bg-secondary2 border-secondary2'
									onClick={handleLogin}
								/>
							</div>
						</div>
						<div className='text-center text-sm mt-3'>
							Нет аккаунта?{' '}
							<span
								className='text-primary hover:cursor-pointer'
								onClick={() => setType('sign-up')}
							>
								Зарегистрироваться
							</span>
						</div>
					</div>
				)}
				{type === 'sign-up' && (
					<div className='w-2/5 pr-5 max-[1000px]:w-[90vw] max-[1000px]:mx-auto'>
						<h1 className='font-bold text-xl'>Создать аккаунт</h1>
						<p className='text-sm pt-2'>Введите Ваши данные ниже</p>
						<div className='flex flex-col gap-7 mt-10'>
							<Input
								placeholder='Имя'
								onChange={e => setName(e.target.value)}
								value={name}
							/>
							<Input
								placeholder='Email'
								type='email'
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
							<Input
								placeholder='Пароль'
								type='password'
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>
						</div>
						<div className='mt-10'>
							<Button
								text='Зарегистрироваться'
								className='w-full bg-secondary2 border-secondary2'
								onClick={handleRegister}
							/>
						</div>
						<div className='text-center text-sm mt-3'>
							Уже есть аккаунт?{' '}
							<span
								className='text-primary hover:cursor-pointer'
								onClick={() => setType('login')}
							>
								Войти
							</span>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Auth
