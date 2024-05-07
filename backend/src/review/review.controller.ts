import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}
	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	@Get('average/:productId')
	async getAverageValueByProductId(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueByProductId(+productId)
	}

	@Get(':productId')
	async getByProductId(@Param('productId') productId: string) {
		return this.reviewService.getByProductId(+productId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:productId')
	@Auth('user')
	async leaveReview(
		@CurrentUser('id') id: string,
		@Body() dto: ReviewDto,
		@Param('productId') productId: string
	) {
		return this.reviewService.create(id, dto, +productId)
	}
}
