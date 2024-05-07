import { FC } from 'react'
import { MdDelete } from 'react-icons/md'
import 'react-responsive-pagination/themes/classic.css'
import { IUser } from '../../../../types/auth.interface'

type TypeData = {
	admins: IUser[]
	deleteAdmin: (id: string) => void
}

const AdminList: FC<TypeData> = ({ admins, deleteAdmin }) => {
	return (
		<div className='mt-5'>
			<h1 className='text-xl font-bold'>Все администраторы</h1>
			<table className={'table'}>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Email</th>
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
									<td>
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
