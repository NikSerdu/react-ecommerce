import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDTOCreate, CategoryDTOUpdate } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get(':categoryId')
	async getByNumber(@Param('categoryId') categoryId: string) {
		return this.categoryService.getById(categoryId)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Post()
	async create(@Body() dto: CategoryDTOCreate) {
		return this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Put(':categoryId')
	async update(
		@Param('categoryId') categoryId: string,
		@Body() dto: CategoryDTOUpdate
	) {
		return this.categoryService.update(categoryId, dto)
	}

	@Auth('admin')
	@Delete(':categoryId')
	async delete(@Param('categoryId') categoryId: string) {
		return this.categoryService.delete(categoryId)
	}
}
