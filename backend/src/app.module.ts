import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { CounterModule } from './counter/counter.module'
import { FileModule } from './file/file.module'
import { OrderModule } from './order/order.module'
import { PrismaService } from './prisma.service'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UsersModule,
		ProductModule,
		CategoryModule,
		OrderModule,
		CounterModule,
		FileModule,
		ReviewModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
