import { FC, useState } from 'react'
import Button from '../ui/button/Button'
import Input from '../ui/input/Input'

type TypeData = {
	filters: any
	setFilters: any
}

const Filters: FC<TypeData> = ({ filters, setFilters }) => {
	const [minPrice, setMinPrice] = useState<string>(
		filters.get('minPrice') || ''
	)
	const [maxPrice, setMaxPrice] = useState<string>(
		filters.get('maxPrice') || ''
	)
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [onlySale, setOnlySale] = useState<boolean>(
		filters.get('onlySale') || false
	)
	const handleSubmit = (e: any) => {
		e.preventDefault()

		filters.set('minPrice', minPrice)
		filters.set('maxPrice', maxPrice)
		filters.set('onlySale', onlySale)
		filters.set('page', '1')
		setFilters(filters)
	}

	const reset = () => {
		setMinPrice('')
		setMaxPrice('')
		setOnlySale(false)
		setFilters({})
	}
	return (
		<div className=''>
			<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<h2 className='font-bold'>Фильтры</h2>
				<div className='text-sm'>
					<h3>Цена</h3>
					<div className='flex gap-1 mt-2'>
						<Input
							placeholder='Мин'
							className='w-1/2'
							name='minPrice'
							value={minPrice}
							onChange={e => setMinPrice(e.target.value)}
						/>
						<Input
							placeholder='Макс'
							className='w-1/2'
							name='maxPrice'
							value={maxPrice}
							onChange={e => setMaxPrice(e.target.value)}
						/>
					</div>
				</div>
				<div className='text-sm'>
					<div className='flex gap-3 mt-2'>
						<label htmlFor='onlySale'>Распродажа</label>
						<Input
							id='onlySale'
							className=''
							type='checkbox'
							name='onlySale'
							checked={onlySale}
							onChange={e => setOnlySale(e.target.checked)}
						/>
					</div>
				</div>
				<div className=''>
					<Button
						type='submit'
						text='Применить'
						className='bg-secondary2 border-secondary2 w-full'
					/>
				</div>
			</form>
			<div className=''>
				<Button
					text='Сбросить'
					variant='outline'
					textColor='text-primary'
					className='border-secondary2  w-full mt-5'
					onClick={reset}
				/>
			</div>
		</div>
	)
}

export default Filters
