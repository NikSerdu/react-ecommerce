import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaCircleXmark } from 'react-icons/fa6'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CategoryService } from '../../../../services/category.service'
import { ProductService } from '../../../../services/product.service'
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

type TypeData = {
	refetchProducts: () => void
}

const CreateProduct: FC<TypeData> = ({ refetchProducts }) => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
	const [showSalePrice, setShowSalePrice] = useState<boolean>(false)

	const handleDeleteFile = (name: string) => {
		setUploadedFiles(data => data.filter(item => item.name !== name))
	}

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files

		if (files) {
			const newFiles = Array.from(files)
			setUploadedFiles(prevFiles => [...prevFiles, ...newFiles])
		}
	}

	const { data: categories } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll()
	})

	const { mutateAsync: createProduct } = useMutation({
		mutationFn: (data: FormData) => {
			console.log(uploadedFiles[0])

			return ProductService.create(data)
		},
		onSuccess() {
			toast('Продукт успешно создан!', {
				type: 'success'
			})
			reset()
			setUploadedFiles([])
			setShowSalePrice(false)
			refetchProducts()
		},
		onError(error: AxiosError) {
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
		formState: { errors }
	} = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			categoryId: '',
			count: '',
			description: '',
			id: '',
			name: '',
			price: '',
			sale: false,
			salePrice: ''
		}
	})

	const onSubmit: SubmitHandler<IFormInput> = data => {
		const formData = new FormData()
		addDataToFormData(formData, data)
		if (uploadedFiles.length > 0) {
			createProduct(formData)
		} else {
			toast('Загрузите хотя бы одну картинку!', {
				type: 'error'
			})
		}
	}

	const addDataToFormData = (formData: FormData, data: IFormInput) => {
		uploadedFiles.forEach(file => {
			formData.append('images', file)
		})
		formData.append('data', JSON.stringify(data))
	}

	return (
		<Container>
			<form className='' onSubmit={handleSubmit(onSubmit)}>
				<div className=''>
					<h1 className='font-bold text-3xl'>Создать продукт</h1>
				</div>
				<div className=''>
					<div className='mt-3 '>
						{
							<div className='flex gap-4 flex-wrap items-center'>
								{uploadedFiles.map((file, index) => (
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
											src={URL.createObjectURL(file)}
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
				<div className='mt-10 flex gap-4 flex-wrap gap-y-8'>
					<div className='flex flex-col '>
						<Controller
							name='id'
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => <Input placeholder='Артикул' {...field} />}
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
						<option value={''} className='' disabled defaultValue={''}>
							Выберите категорию
						</option>
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
					<Button text='Создать' className='bg-red border-red ' />
				</div>
			</form>
		</Container>
	)
}

export default CreateProduct
