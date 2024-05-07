import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ProductsWithFilters } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getWithFilters(@Query('') dto: ProductsWithFilters) {
		return this.productService.getWithFilters(dto)
	}

	@Get('recently-created')
	async getRecentlyCreated() {
		return this.productService.getRecentlyCreated()
	}

	@Get('recently-sales')
	async getRecentlySales() {
		return this.productService.getRecentlySales()
	}

	@UsePipes(new ValidationPipe())
	@Get('by-id')
	async getById(@Query('id') id: string) {
		return this.productService.getById(+id)
	}

	@UsePipes(new ValidationPipe())
	@Get('by-category')
	async getByCategoryId(@Query('categoryId') categoryId: string) {
		return this.productService.getByCategoryId(categoryId)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Post()
	@UseInterceptors(FilesInterceptor('images'))
	async create(
		@Body('data') dto: string,
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder: string
	) {
		return this.productService.create(JSON.parse(dto), files, folder)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Put(':id')
	@UseInterceptors(FilesInterceptor('images'))
	async update(
		@Param('id') id: string,
		@Body('data') dto: string,
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder: string
	) {
		return this.productService.update(+id, JSON.parse(dto), files, folder)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}

	@Auth('admin')
	@Patch('decrease/:productId/:decreaseCount')
	async decreaseCount(
		@Param() params: { productId: string; decreaseCount: number }
	) {
		return this.productService.decreaseCount(
			+params.productId,
			params.decreaseCount
		)
	}

	@Auth('admin')
	@Patch('increase/:productId/:increaseCount')
	async increaseCount(
		@Param() params: { productId: string; increaseCount: number }
	) {
		return this.productService.increaseCount(
			+params.productId,
			+params.increaseCount
		)
	}
}
