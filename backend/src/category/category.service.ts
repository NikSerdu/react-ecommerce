import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import axios from 'axios'
import { PrismaService } from 'src/prisma.service'
import { CategoryDTOCreate, CategoryDTOUpdate } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany()
	}

	async getById(categoryId: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id: categoryId
			}
		})
		if (!category) throw new NotFoundException('Category not found!')
		return category
	}

	async create(dto: CategoryDTOCreate) {
		const existsCategory = await this.prisma.category.findUnique({
			where: {
				name: dto.name
			}
		})
		if (existsCategory) throw new HttpException('Category already exists', 409)

		const addToBitrix = await axios(
			`${process.env.BITRIX_HOOK}/crm.productsection.add`,
			{
				params: {
					fields: {
						NAME: dto.name
					}
				}
			}
		)
		return await this.prisma.category.create({
			data: {
				...dto,
				bitrixId: addToBitrix.data.result
			}
		})
	}

	async update(categoryId: string, dto: CategoryDTOUpdate) {
		const updateInDB = await this.prisma.category.update({
			where: {
				id: categoryId
			},
			data: dto
		})

		const updateInBitrix = await axios(
			`${process.env.BITRIX_HOOK}/crm.productsection.update`,
			{
				params: {
					id: updateInDB.bitrixId,
					fields: {
						NAME: dto.name
					}
				}
			}
		)
		return updateInDB
	}

	async delete(categoryId: string) {
		const deleteInDB = await this.prisma.category.delete({
			where: {
				id: categoryId
			}
		})
		const deleteInBitrix = await axios(
			`${process.env.BITRIX_HOOK}/crm.productsection.delete`,
			{
				params: {
					id: deleteInDB.bitrixId
				}
			}
		)
		return deleteInDB
	}
}
