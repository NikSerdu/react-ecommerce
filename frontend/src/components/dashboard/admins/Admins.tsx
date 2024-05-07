import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthService } from '../../../services/auth.service'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'
import AdminList from './adminList/AdminList'

const Admins: FC = () => {
	const {
		data: admins,
		refetch,
		isLoading
	} = useQuery({
		queryKey: ['get admins'],
		queryFn: () => AuthService.getAdmins()
	})

	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const { mutateAsync: registerAdmin } = useMutation({
		mutationFn: () => AuthService.registerAdmin({ email, name, password }),
		onSuccess() {
			toast(`${name} успешно зарегистрирован`, { type: 'success' })
			setName('')
			setPassword('')
			setEmail('')
		}
	})

	const { mutateAsync: deleteAdmin } = useMutation({
		mutationFn: (id: string) => AuthService.deleteAdmin(id),
		onSuccess(data) {
			toast(`${data.name} успешно удалён`, { type: 'success' })
			refetch()
		}
	})
	const handleSubmit = e => {
		e.preventDefault()
		registerAdmin()
	}
	return (
		<div>
			<div className=''>
				<h1 className='font-bold text-3xl'>Администраторы</h1>
			</div>
			<form
				action=''
				className='flex flex-col w-1/3 gap-3 mt-3'
				onSubmit={handleSubmit}
			>
				<div className=''>
					<Input
						className='w-full'
						placeholder='Имя'
						onChange={e => setName(e.target.value)}
						value={name}
						autoComplete='off'
					/>
				</div>
				<div className=''>
					<Input
						className='w-full'
						placeholder='Email'
						onChange={e => setEmail(e.target.value)}
						value={email}
						autoComplete='off'
					/>
				</div>
				<div className=''>
					<Input
						className='w-full'
						placeholder='Пароль'
						onChange={e => setPassword(e.target.value)}
						value={password}
						type='password'
						autoComplete='off'
					/>
				</div>
				<Button
					text='Зарегистрировать'
					variant='fill'
					className='bg-primary border-primary w-full'
				/>
			</form>
			<div className='mt-10'>
				{admins && <AdminList admins={admins} deleteAdmin={deleteAdmin} />}
			</div>
		</div>
	)
}

export default Admins
