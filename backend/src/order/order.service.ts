import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PrismaService } from 'src/prisma.service'
import { OrderDTOCreate, OrderDTOUpdate, OrderStatus } from './dto/order.dto'
@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.order.findMany()
	}

	async getByUserId(userId: string) {
		return await this.prisma.order.findMany({
			where: {
				userId: userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async getById(orderId: string) {
		return await this.prisma.order.findUnique({
			where: {
				id: orderId
			},

			select: {
				id: true,
				userId: true,
				status: true,
				comment: true,
				address: true,
				fullName: true,
				phone: true,
				totalPrice: true,
				products: {
					select: {
						id: true,
						count: true,
						price: true,
						product: {
							select: {
								salePrice: true,
								images: true,
								name: true
							}
						}
					}
				}
			}
		})
	}

	async create(userId: string, dto: OrderDTOCreate) {
		const { address, comment, fullName, phone, products, totalPrice } = dto
		const order = await this.prisma.order.create({
			data: {
				address,
				comment,
				fullName,
				phone,
				totalPrice,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		for (const item of products) {
			await this.prisma.counter.create({
				data: {
					count: item.count,
					price: item.price,
					product: {
						connect: {
							id: item.productId
						}
					},
					Order: {
						connect: {
							id: order.id
						}
					}
				}
			})
		}

		const orderFull = await this.prisma.order.findUnique({
			where: {
				id: order.id
			},
			select: {
				id: true,
				status: true,
				phone: true,
				address: true,
				comment: true,
				fullName: true,
				totalPrice: true,
				products: {
					select: {
						product: {
							select: {
								id: true,
								name: true,
								price: true,
								bitrixId: true
							}
						},
						count: true,
						price: true
					}
				}
			}
		})

		const name = orderFull.fullName.split(' ')
		let contactId = 0

		const contact = await axios(`${process.env.BITRIX_HOOK}/crm.contact.list`, {
			params: {
				filter: { PHONE: orderFull.phone },
				select: ['ID', 'NAME', 'LAST_NAME']
			}
		}).then(req => {
			if (req.data.result.length !== 0) {
				contactId = req.data.result[0].ID
			}
			return req.data
		})
		if (contact.total === 0) {
			const addContact = await axios(
				`${process.env.BITRIX_HOOK}/crm.contact.add`,
				{
					params: {
						fields: {
							NAME: name[1],
							SECOND_NAME: name[2],
							LAST_NAME: name[0],
							TYPE_ID: 'CLIENT',
							PHONE: [{ VALUE: orderFull.phone }]
						}
					}
				}
			).then(req => {
				contactId = req.data.result
				return req.data.result
			})
		}

		const createDeal = await axios(`${process.env.BITRIX_HOOK}/crm.deal.add`, {
			params: {
				fields: {
					TITLE: orderFull.id,
					CONTACT_ID: contactId,
					OPENED: 'Y',
					CURRENCY_ID: 'RUB',
					UF_CRM_1712248957: orderFull.id,
					UF_CRM_1712249017: orderFull.address,
					COMMENTS: orderFull.comment
				}
			}
		})
			.then(res => {
				return res.data.result
			})
			.catch(e => {
				console.log(e)
			})

		const setProducts = new Promise(async (resolve, reject) => {
			try {
				const productRows = await Promise.all(
					orderFull.products.map(async item => {
						return {
							PRODUCT_ID: item.product.bitrixId,
							QUANTITY: item.count,
							PRICE: item.price
						}
					})
				)

				resolve(productRows)
			} catch (error) {
				reject(error)
			}
		})

		setProducts.then(async productRows => {
			try {
				const addProductsToDeal = await axios(
					`${process.env.BITRIX_HOOK}/crm.deal.productrows.set`,
					{
						params: {
							id: createDeal,
							rows: productRows
						}
					}
				)
			} catch (error) {
				console.log(error)
			}
		})

		return orderFull
	}

	async update(orderId: string, dto: OrderDTOUpdate) {
		const { products, ...rest } = dto
		if (products) {
			const order = await this.prisma.order.findUnique({
				where: {
					id: orderId
				},
				select: {
					products: {
						select: {
							id: true,
							orderId: true
						}
					}
				}
			})

			for (const item of order.products) {
				await this.prisma.counter.delete({
					where: {
						id: item.id
					}
				})
			}

			for (const item of dto.products) {
				await this.prisma.counter.create({
					data: {
						count: item.count,
						orderId: orderId,
						productId: item.productId,
						price: item.price
					}
				})
			}
		}

		await this.prisma.order.update({
			where: {
				id: orderId
			},
			data: rest
		})

		return await this.prisma.order.findUnique({
			where: {
				id: orderId
			},
			select: {
				id: true,
				status: true,
				phone: true,
				address: true,
				comment: true,
				fullName: true,
				totalPrice: true,
				products: {
					select: {
						product: {
							select: {
								id: true
							}
						},
						count: true,
						price: true
					}
				}
			}
		})
	}

	async delete(orderId: string) {
		return this.prisma.order.delete({
			where: {
				id: orderId
			}
		})
	}

	async updateStatus(orderId: string, status: OrderStatus) {
		return this.prisma.order.update({
			where: {
				id: orderId
			},
			data: {
				status: status
			}
		})
	}
}
