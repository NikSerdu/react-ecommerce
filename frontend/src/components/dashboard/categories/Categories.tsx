import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { CategoryService } from '../../../services/category.service'
import CategoryList from './categoryList/CategoryList'
import CreateCategory from './createCategory/CreateCategory'

const Categories: FC = () => {
	const [categoryName, setCategoryName] = useState<string>('')
	const { data: categories, refetch } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll()
	})

	const { mutateAsync: deleteCategory } = useMutation({
		mutationFn: (id: string) => CategoryService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const { mutateAsync: createCategory } = useMutation({
		mutationFn: (name: string) => CategoryService.create({ name }),
		onSuccess() {
			refetch()
			toast('Категория успешно создана!', {
				type: 'success'
			})
			setCategoryName('')
		},
		onError(e: AxiosError) {
			if (e.response?.status === 409) {
				toast('Такая категория уже существует!', {
					type: 'error'
				})
			}
		}
	})
	const handleSubmit = (e: any, name: string) => {
		e.preventDefault()
		createCategory(name)
	}
	return (
		<div>
			<CreateCategory
				handleSubmit={handleSubmit}
				categoryName={categoryName}
				setCategoryName={setCategoryName}
			/>
			{categories && (
				<CategoryList categories={categories} deleteCategory={deleteCategory} />
			)}
		</div>
	)
}

export default Categories
