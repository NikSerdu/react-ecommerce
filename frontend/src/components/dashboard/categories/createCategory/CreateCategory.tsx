import { FC } from 'react'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

type TypeData = {
	categoryName: string
	setCategoryName: (name: string) => void
	handleSubmit: (e: any, name: string) => void
}

const CreateCategory: FC<TypeData> = ({
	handleSubmit,
	categoryName,
	setCategoryName
}) => {
	return (
		<div>
			<h1 className='font-bold text-3xl'>Создать категорию</h1>
			<form
				className='mt-5 flex items-center gap-3'
				onSubmit={e => handleSubmit(e, categoryName)}
			>
				<Input
					placeholder='Название категории'
					value={categoryName}
					onChange={e => setCategoryName(e.target.value)}
				/>
				<Button
					text='Создать'
					type='submit'
					className='bg-primary border-primary'
				/>
			</form>
		</div>
	)
}

export default CreateCategory
