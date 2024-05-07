import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { useReviews } from '../../hooks/useReviews'
import Button from '../ui/button/Button'

const Reviews: FC<{ productId: number }> = ({ productId }) => {
	const [rating, setRating] = useState<number>(0)
	const [text, setText] = useState<string>('')
	const { user } = useAuth()
	const { leaveReview, reviews } = useReviews(productId)

	const validateRating = () => {
		return rating !== 0 || 'Rating is required!'
	}

	const handleRating = (rate: number) => {
		setRating(rate)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (rating === 0) {
			toast('Выберите рейтинг!', {
				type: 'warning'
			})

			return
		}

		if (text.length === 0) {
			toast('Введите текст!', {
				type: 'warning'
			})

			return
		}

		leaveReview({ productId, text, rating }).then(() => {
			toast('Спасибо за отзыв!', {
				type: 'success'
			})
			setText('')
			setRating(0)
		})
	}
	return (
		<div>
			{user ? (
				<form className='flex items-baseline ' onSubmit={handleSubmit}>
					<div className='w-3/5 flex flex-col max-[650px]:w-full max-[960px]:w-4/5 pr-5'>
						<div className='flex max-[650px]:flex-col max-[650px]:items-start'>
							<textarea
								value={text}
								onChange={e => setText(e.target.value)}
								placeholder='Оставьте свой отзыв'
								className='rounded-3xl bg-grey bg-opacity-50 p-4 resize-none h-28 text-primary w-full border border-primary'
							></textarea>
							<div className='flex flex-col items-center '>
								<Rating
									className='min-[650px]:ml-6 max-[650px]:mt-5'
									onClick={handleRating}
									transition={true}
									titleSeparator='из'
									initialValue={rating}
								/>
							</div>
						</div>
						<Button
							className='bg-primary border-primary ml-auto mt-4'
							text='Оставить отзыв'
							variant='fill'
							type='submit'
						/>
					</div>
				</form>
			) : (
				'Войдите, чтобы оставить отзыв!'
			)}
			<div className=' text-lg w-1/2 mt-18 flex flex-col-reverse gap-20'>
				{reviews &&
					reviews.map(review => {
						return (
							<div className='' key={review.createdAt}>
								<div className='flex'>
									<h3 className='h3 pt-0.5'>{review.User.name}</h3>
									<div className='ml-2'>
										<Rating
											initialValue={+review.rating}
											titleSeparator='из'
											readonly={true}
											size={23}
										/>
									</div>
								</div>
								<div className='mt-4'>{review.text}</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Reviews
