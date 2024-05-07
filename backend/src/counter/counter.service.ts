import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CounterDTOCreate } from './dto/counter.dto'

@Injectable()
export class CounterService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CounterDTOCreate) {
		return await this.prisma.counter.createMany({
			data: dto.products
		})
	}
}
