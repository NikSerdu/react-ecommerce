import { useMutation, useQuery } from '@tanstack/react-query'
import { ReviewService } from '../services/review.service'

export const useReviews = (productId: number) => {
	const { data: reviews, refetch: refetchReviews } = useQuery({
		queryKey: ['get reviews by productId'],
		queryFn: () => ReviewService.getByProductId(productId)
	})

	const { data: averageRating, refetch: refetchAverageRating } = useQuery({
		queryKey: ['get average rating by productId'],
		queryFn: () => ReviewService.getAverageValueByProductId(productId)
	})

	const { mutateAsync: leaveReview } = useMutation({
		mutationFn: ({
			productId,
			text,
			rating
		}: {
			productId: number
			text: string
			rating: number
		}) => ReviewService.create(productId, { text, rating }),
		onSuccess() {
			refetchAverageRating()
			refetchReviews()
		}
	})

	return {
		reviews,
		refetchReviews,
		averageRating,
		leaveReview,
		refetchAverageRating
	}
}
