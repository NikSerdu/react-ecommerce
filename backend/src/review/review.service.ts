import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				createdAt: true,
				text: true,
				rating: true,
				User: {
					select: {
						name: true
					}
				}
			}
		})
	}

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}
	async create(userId: string, dto: ReviewDto, productId: number) {
		return this.prisma.review.create({
			data: {
				...dto,
				Product: {
					connect: {
						id: productId
					}
				},
				User: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
	async getByProductId(productId: number) {
		return this.prisma.review.findMany({
			where: {
				productId
			},
			select: {
				createdAt: true,
				text: true,
				rating: true,
				User: {
					select: {
						name: true
					}
				}
			}
		})
	}
}
