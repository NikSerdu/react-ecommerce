import { FC } from 'react'
import { MdDelete } from 'react-icons/md'
import 'react-responsive-pagination/themes/classic.css'
import { useAuth } from '../../../../hooks/useAuth'
import { IUser } from '../../../../types/auth.interface'

type TypeData = {
	admins: IUser[]
	deleteAdmin: (id: string) => void
}

const AdminList: FC<TypeData> = ({ admins, deleteAdmin }) => {
	const { user } = useAuth()
	return (
		<div className='mt-5'>
			<h1 className='text-xl font-bold'>Все администраторы/менеджеры</h1>
			<table className={'table'}>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Email</th>
						<th>Роль</th>
						<th className=''>Действия</th>
					</tr>
				</thead>
				<tbody>
					{admins &&
						admins.map(item => {
							return (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.roles.join(' ')}</td>
									<td>
										{user && user.email !== item.email ? (
											<MdDelete
												className='hover:cursor-pointer p-2 text-center inline'
												onClick={() => {
													const ok = confirm(
														'Вы действительно хотите удалить этого пользователя?'
													)
													if (ok) {
														deleteAdmin(item.id)
													}
												}}
												color='red'
												size={35}
												title='Удалить'
											/>
										) : (
											'Это вы'
										)}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default AdminList
