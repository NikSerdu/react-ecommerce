import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { PrismaService } from 'src/prisma.service'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(
		private readonly fileService: FileService,
		private prisma: PrismaService
	) {}

	@Post()
	@HttpCode(200)
	@Auth('manager')
	@UseInterceptors(FilesInterceptor('images'))
	async uploadFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFiles(files, folder)
	}
}
