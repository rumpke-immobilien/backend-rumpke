import { Module } from '@nestjs/common';
import { RumpkeaiController } from './rumpkeai.controller';
import { RumpkeaiService } from './rumpkeai.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RumpkeaiController],
  providers: [RumpkeaiService],
})
export class RumpkeaiModule {}
