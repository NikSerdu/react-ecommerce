import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CounterController } from './counter.controller'
import { CounterService } from './counter.service'

@Module({
	controllers: [CounterController],
	providers: [CounterService, PrismaService]
})
export class CounterModule {}
