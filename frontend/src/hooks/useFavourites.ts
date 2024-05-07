import { useState } from 'react'

interface IFavourite {
	id: number
	name: string
	images: string[]
	price: number

	sale: boolean
	salePrice: number
}

export const useFavourites = () => {
	const [favourites, setFavourites] = useState<IFavourite[]>(
		localStorage.getItem('favourites')
			? JSON.parse(localStorage.getItem('favourites'))
			: []
	)

	const addFavourite = (data: IFavourite) => {
		const newF = [...favourites, data]
		setFavourites(newF)
		localStorage.setItem('favourites', JSON.stringify(newF))
	}

	const deleteFavourite = (productId: number) => {
		const flteredF = favourites.filter(item => item.id !== productId)
		setFavourites(flteredF)
		localStorage.setItem('favourites', JSON.stringify(flteredF))
	}

	return { favourites, addFavourite, deleteFavourite }
}
