import { Module } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService, CategoryService, FileService]
})
export class ProductModule {}
