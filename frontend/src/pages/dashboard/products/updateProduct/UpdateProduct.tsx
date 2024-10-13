import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaCircleXmark } from 'react-icons/fa6'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CategoryService } from '../../../../services/category.service'
import { ProductService } from '../../../../services/product.service'
import { IProduct } from '../../../../types/product.interface'
import Button from '../../../ui/button/Button'
import Container from '../../../ui/container/Container'
import Input from '../../../ui/input/Input'

interface IFormInput {
	id: string
	name: string
	price: string
	categoryId: string
	count: string
	description: string
	sale: boolean
	salePrice: string
}

const UpdateProduct: FC = () => {
	const [files, setFiles] = useState<File[]>([])
	const { productId } = useParams()
	const navigate = useNavigate()
	if (!productId) return
	const [showSalePrice, setShowSalePrice] = useState<boolean>(false)

	const { data: product } = useQuery({
		queryKey: ['get product'],
		queryFn: () => ProductService.getById(+productId)
	})

	const { data: categories } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll()
	})

	const { mutateAsync: UpdateProduct } = useMutation({
		mutationFn: (data: { form: FormData; productId: number }) => {
			return ProductService.update(data)
		},
		onSuccess(data) {
			toast('Продукт успешно обновлен!', {
				type: 'success'
			})
			reset()
			setShowSalePrice(data.sale)
			setDefaultValues(data)
			navigate(`/dashboard/product/update/${data.id}`)
		},
		onError(error: AxiosError) {
			console.log(error)

			if (error.response?.status === 409) {
				toast('Продукт с таким артикулом уже существует!', {
					type: 'error'
				})
			} else {
				toast('Что-то пошло не так...', {
					type: 'error'
				})
			}
		}
	})

	const {
		handleSubmit,
		reset,
		control,
		register,
		formState: { errors },
		setValue
	} = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			categoryId: '',
			count: '',
			description: '',
			id: '',
			name: '',
			price: '',
			salePrice: ''
		}
	})

	const onSubmit: SubmitHandler<IFormInput> = data => {
		const formData = new FormData()
		addDataToFormData(formData, data)
		UpdateProduct({ form: formData, productId: +productId })
	}

	const addDataToFormData = (formData: FormData, data: IFormInput) => {
		files.forEach(file => {
			formData.append('images', file)
		})
		formData.append('data', JSON.stringify(data))
	}

	useEffect(() => {
		if (product) {
			setDefaultValues(product)
		}
	}, [product])

	const setDefaultValues = (product: IProduct) => {
		setValue('categoryId', product.categoryId)
		setValue('count', String(product.count))
		setValue('description', product.description)
		setValue('name', product.name)
		setValue('price', String(product.price))
		setValue('sale', product.sale)
		setValue('salePrice', String(product.salePrice))
		setValue('id', String(product.id))
		setShowSalePrice(product.sale)
	}

	useEffect(() => {
		if (product && product.images) {
			const fetchData = async () => {
				for (const url of product.images) {
					const response = await fetch(
						`${import.meta.env.VITE_SERVER_URL}${url}`
					)

					const name = url.split('/').at(-1)

					const blob = await response.blob()
					let metadata = {
						type: 'image/jpeg'
					}
					let file = new File([blob], name, metadata)

					setFiles(data => [...data, file])
				}
			}
			fetchData()
		}
	}, [product])

	const handleDeleteFile = (name: string) => {
		if (files.length > 1) {
			setFiles(data => data.filter(item => item.name !== name))
		} else {
			toast('Должна быть хотя бы одна картинка!', {
				type: 'error'
			})
		}
	}
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files

		if (files) {
			const newFiles = Array.from(files)
			setFiles(prevFiles => [...prevFiles, ...newFiles])
		}
	}
	return (
		<Container>
			{product ? (
				<form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
					<div className=''>
						<h1 className='font-bold text-3xl'>Обновить продукт</h1>
					</div>
					<div className=''>
						<div className='mt-10 '>
							{
								<div className='flex gap-4 flex-wrap items-center max-[670px]:justify-center'>
									{product &&
										files.map((file, index) => (
											<div key={index} className='relative'>
												<div
													className='absolute -right-3 -top-3'
													onClick={() => handleDeleteFile(file.name)}
												>
													<FaCircleXmark
														size={25}
														color='red'
														className='bg-black rounded-full '
													/>
												</div>
												<img
													src={
														index <= product.images.length - 1
															? `/uploads/products/product_${productId}/${file.name}`
															: URL.createObjectURL(file)
													}
													alt={`Uploaded Preview ${index + 1}`}
													className='w-[200px] h-[200px] rounded-xl'
												/>
											</div>
										))}
									<label
										htmlFor='input_file'
										className='w-[200px] h-[200px] bg-secondary2 rounded-md flex items-center justify-center text-secondary flex-col'
									>
										<div className=''>
											<MdOutlineCloudUpload size={60} />
										</div>
										<p>Загрузить картинки</p>
									</label>

									<Input
										onChange={handleFileUpload}
										type='file'
										id='input_file'
										className='hidden'
										multiple
									/>
								</div>
							}
						</div>
					</div>

					<div className='mt-10 flex gap-4 flex-wrap gap-y-8 max-[500px]:flex-col'>
						<div className='flex flex-col '>
							<Controller
								name='id'
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<Input placeholder='Артикул' {...field} />
								)}
							/>

							{errors.id && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
						<div className='flex flex-col '>
							<Controller
								name='name'
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<Input placeholder='Название' {...field} />
								)}
							/>

							{errors.name && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
						<div className='flex flex-col '>
							<Controller
								name='price'
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => <Input placeholder='Цена' {...field} />}
							/>

							{errors.price && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
						<div className='flex flex-col '>
							<Controller
								name='count'
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<Input placeholder='Количество' {...field} />
								)}
							/>

							{errors.count && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
						<div className='flex flex-col '>
							<Controller
								name='description'
								control={control}
								rules={{
									required: true
								}}
								render={({ field }) => (
									<Input placeholder='Описание' {...field} />
								)}
							/>

							{errors.description && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
						<select
							{...register('categoryId', { required: true })}
							className='border-b border-primary outline-none text-xs'
						>
							{categories &&
								categories.map(item => {
									return (
										<option value={item.id} className='' key={item.id}>
											{item.name}
										</option>
									)
								})}
						</select>
						<Controller
							name='sale'
							control={control}
							render={({ field: { onChange, value, ...rest } }) => (
								<div className='flex items-center text-xs gap-3'>
									<label htmlFor='saleCheckbox'>Распродажа</label>
									<Input
										id='saleCheckbox'
										type='checkbox'
										checked={value}
										onChange={e => {
											onChange(e.target.checked)
											setShowSalePrice(e.target.checked)
										}}
										{...rest}
									/>
								</div>
							)}
						/>
						<div className='flex flex-col '>
							{showSalePrice && (
								<Controller
									name='salePrice'
									control={control}
									rules={{
										required: true
									}}
									render={({ field }) => (
										<Input placeholder='Цена со скидкой' {...field} />
									)}
								/>
							)}

							{errors.salePrice && (
								<p className='text-secondary2 text-xs mt-3'>
									Некорректно заполненое поле!
								</p>
							)}
						</div>
					</div>
					<div className='mt-5'>
						<Button text='Обновить' className='bg-red border-red ' />
					</div>
				</form>
			) : (
				<>Такого продукта нет!</>
			)}
		</Container>
	)
}

export default UpdateProduct
