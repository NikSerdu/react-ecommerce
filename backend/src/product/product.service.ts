import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import axios from 'axios'
import { CategoryService } from 'src/category/category.service'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma.service'
import {
	ProductDTOCreate,
	ProductDTOUpdate,
	ProductsWithFilters
} from './dto/product.dto'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService,
		private fileService: FileService
	) {}

	async getRecentlyCreated() {
		return await this.prisma.product.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			take: 10
		})
	}

	async getRecentlySales() {
		return await this.prisma.product.findMany({
			where: {
				sale: true
			},
			orderBy: {
				updatedAt: 'desc'
			},
			take: 10
		})
	}

	async getWithFilters(dto: ProductsWithFilters) {
		const filters: any = {}

		if (dto.onlySale === 'true') {
			filters.sale = true
		}

		if (dto.minPrice || dto.maxPrice) {
			filters.salePrice = {}
		}
		if (dto.minPrice) {
			filters.salePrice.gte = +dto.minPrice
		}
		if (dto.maxPrice) {
			filters.salePrice.lte = +dto.maxPrice
		}
		if (dto.categoryId) {
			filters.categoryId = dto.categoryId
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = dto.searchTerm
			? {
					OR: [
						{
							name: {
								contains: dto.searchTerm,
								mode: 'insensitive'
							}
						},
						{
							description: {
								contains: dto.searchTerm,
								mode: 'insensitive'
							}
						},
						{
							id: {
								equals: Number.isInteger(dto.searchTerm) ? +dto.searchTerm : 0
							}
						}
					]
				}
			: {}

		const length = await this.prisma.product.count({
			where: {
				...filters,
				...prismaSearchTermFilter
			}
		})

		const products = await this.prisma.product.findMany({
			where: {
				...filters,
				...prismaSearchTermFilter
			},

			orderBy: {
				salePrice: dto.orderBy || 'asc'
			},
			skip: +dto.perPage * (+dto.page - 1),
			take: +dto.perPage
		})
		return {
			products,
			length
		}
	}

	async getAll() {
		return await this.prisma.product.findMany()
	}

	async getById(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			}
		})
		if (!product) throw new NotFoundException('Product not found')
		return product
	}

	async getByCategoryId(categoryId: string) {
		const products = await this.prisma.product.findMany({
			where: {
				categoryId: categoryId
			}
		})
		return products
	}

	async create(
		dto: ProductDTOCreate,
		files: Express.Multer.File[],
		folder: string
	) {
		const { categoryId, count, description, id, name, price, sale, salePrice } =
			dto
		const existsProduct = await this.prisma.product.findUnique({
			where: {
				id: +dto.id
			}
		})
		if (existsProduct) throw new HttpException('Product already exists', 409)

		const category = await this.categoryService.getById(categoryId)
		const addToBitrix = await axios(
			`${process.env.BITRIX_HOOK}/crm.product.add`,
			{
				params: {
					fields: {
						NAME: dto.name,
						CURRENCY_ID: 'RUB',
						PRICE: sale ? +salePrice : +price,
						SECTION_ID: category.bitrixId
						// PREVIEW_PICTURE: files[0],
						// DETAIL_PICTURE: files[0]
					}
				}
			}
		)
		const images = await this.fileService.saveFiles(files, folder)
		if (images.length === 0) throw new HttpException('Images not found', 404)
		const product = await this.prisma.product.create({
			data: {
				id: +id,
				count: +count,
				description,
				name,
				sale,
				price: +price,
				images: images.map(item => {
					return item.url
				}),
				bitrixId: addToBitrix.data.result,
				salePrice: sale ? +salePrice : +price,
				category: {
					connect: {
						id: categoryId
					}
				}
			},
			select: {
				id: true
			}
		})

		return product
	}

	async update(
		id: number,
		dto: ProductDTOUpdate,
		files: Express.Multer.File[],
		folder: string
	) {
		const { categoryId, ...rest } = dto
		const images = await this.fileService.saveFiles(files, folder)
		if (images.length === 0) throw new HttpException('Images not found', 404)
		const result = await this.prisma.product.update({
			where: {
				id
			},
			data: {
				...rest,
				id: +dto.id,
				count: +dto.count,
				salePrice: +dto.salePrice,
				price: +dto.price,
				images: images.map(item => {
					return item.url
				}),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})

		const category = await this.prisma.category.findUnique({
			where: {
				id: result.categoryId
			}
		})

		const productUpdateBitrixId = await axios(
			`${process.env.BITRIX_HOOK}/crm.product.update`,
			{
				params: {
					id: result.bitrixId,
					fields: {
						CURRENCY_ID: 'RUB',
						PRICE: dto.sale ? +dto.salePrice : +dto.price,
						SECTION_ID: category.bitrixId
					}
				}
			}
		)

		return result
	}

	async delete(id: number) {
		const deleteInDB = await this.prisma.product.delete({
			where: {
				id
			}
		})

		const deleteInBitrix = await axios(
			`${process.env.BITRIX_HOOK}/crm.product.delete`,
			{
				params: {
					id: deleteInDB.bitrixId
				}
			}
		)
		return deleteInDB
	}

	async decreaseCount(productId: number, decreaseCount: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: productId
			}
		})
		return await this.prisma.product.update({
			where: {
				id: productId
			},
			data: {
				count: product.count - decreaseCount
			}
		})
	}

	async increaseCount(productId: number, increaseCount: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: productId
			}
		})
		return await this.prisma.product.update({
			where: {
				id: productId
			},
			data: {
				count: product.count + increaseCount
			}
		})
	}
}
