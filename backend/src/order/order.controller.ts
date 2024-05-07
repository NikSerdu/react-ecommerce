import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderDTOCreate, OrderDTOUpdate, OrderStatus } from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('updateStatus')
	async updateStatus(
		@Query('orderId') orderId: string,
		@Query('status') status: OrderStatus
	) {
		return this.orderService.updateStatus(orderId, status)
	}

	@Auth('admin')
	@Get()
	async getAll() {
		return this.orderService.getAll()
	}

	@Auth('user')
	@Get('my-orders')
	async getByUserId(@CurrentUser('id') userId: string) {
		return this.orderService.getByUserId(userId)
	}

	@Auth('user')
	@Get(':orderId')
	async getById(@Param('orderId') orderId: string) {
		return this.orderService.getById(orderId)
	}

	@Auth('user')
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@CurrentUser('id') userId: string, @Body() dto: OrderDTOCreate) {
		return this.orderService.create(userId, dto)
	}

	@Auth('admin')
	@Put(':orderId')
	async update(@Param('orderId') orderId: string, @Body() dto: OrderDTOUpdate) {
		return this.orderService.update(orderId, dto)
	}

	@Auth('admin')
	@Delete(':orderId')
	async delete(@Param('orderId') orderId: string) {
		return this.orderService.delete(orderId)
	}
}
