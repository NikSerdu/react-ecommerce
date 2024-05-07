export interface IReviewCreate {
	rating: number
	text: string
}

export interface IReview {
	createdAt: string
	text: string
	rating: number
	User: {
		name: string
	}
}
